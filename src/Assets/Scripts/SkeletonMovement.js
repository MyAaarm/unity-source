#pragma strict

public var explosion : GameObject;
private var player : Transform;               // Reference to the player's position.
//private var playerHealth : PlayerHealth;      // Reference to the player's health.
//private var enemyHealth : EnemyHealth;        // Reference to this enemy's health.
private var anim : Animator;                      // Reference to the animator component.
private var timer: float = 30; 			// set duration time in seconds in the Inspector
public var force : float = 10.0f;
public var currentWaypoint : int;
private var seeker : Seeker;
public var nextWaypointDistance : float;
//The calculated pat
private var path : Path;
//Speed
public var speed : float;
//The current target
public var myTarget : Vector3;

function Awake ()
{
    // Set up the references.
//    playerHealth = player.GetComponent (PlayerHealth);
//    enemyHealth = GetComponent (EnemyHealth);
	currentWaypoint = 0;
    seeker = GetComponent(Seeker);
   	anim = GetComponent (Animator);
   	nextWaypointDistance = 0;
   	speed = 10f;
}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player" && timer <= 28){
		SkeletonDeath();
     	var direction : Vector3 = other.transform.position - transform.position;
     	other.rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
     	direction.y += 0.75;
     	other.rigidbody.AddForce(direction * 60,ForceMode.Impulse);	
     	//other.rigidbody.constraints = RigidbodyConstraints.FreezeRotationZ | RigidbodyConstraints.FreezeRotationX;
	}
}

function Update ()
{
	var targets = gameObject.FindGameObjectsWithTag("Player");
	var minDist = Number.MaxValue;
	
	var myTarget : GameObject;
 
	for (var enemy : GameObject in targets)
	{
    	var distance = Vector3.Distance(enemy.transform.position, transform.position);
     	if (distance < minDist){
			minDist = distance;
     		myTarget = enemy;
     	}      
	}
	
    seeker.BroadcastMessage("IsDoneMod2");
    
    if(timer <= 28 && path != null && currentWaypoint < path.vectorPath.Count){
    	anim.SetTrigger("Run");
    	var dir : Vector3 = (path.vectorPath[currentWaypoint]-transform.position).normalized;
        	dir *= speed * Time.smoothDeltaTime;
        	transform.position += dir;
        	
        	//transform.rigidbody.MovePosition(Vector3.Lerp(transform.position, path.vectorPath[currentWaypoint], frac));
        	//transform.position = Vector3.Lerp(transform.position, path.vectorPath[currentWaypoint], frac);
        	//transform.rigidbody.MovePosition(Vector3.Lerp(startPos, path.vectorPath[currentWaypoint], frac));
      			
        if (Vector3.Distance(transform.position, myTarget.transform.position) > nextWaypointDistance){
           	currentWaypoint++;
        }
    }
	   
  	EnemyTimer();
}

function EnemyTimer (){
    timer -= Time.deltaTime;
  if (timer <= 0){
         SkeletonDeath();
  }
}
function setTarget(){
	Debug.Log("DETFUNKAR5");
	var vectors = [transform.position, Vector3(myTarget.x, myTarget.y, myTarget.z)];
	seeker.BroadcastMessage("StartPath", vectors);
}

function OnPathComplete (p : Path) {
	//Debug.Log ("Yay, we got a path back. Did it have an error? "+p.error);
	if (!p.error) {
    	path = p;
        //Reset the waypoint counter
        currentWaypoint = 0;
 	}
 }
function SkeletonDeath (){
	Instantiate (explosion, Vector3(transform.position.x, (transform.position.y)+0.5,transform.position.z), Quaternion.identity);
	Destroy(this.gameObject);
}