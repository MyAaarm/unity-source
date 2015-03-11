#pragma strict

public var explosion : GameObject;
private var player : Transform;               // Reference to the player's position.
//private var playerHealth : PlayerHealth;      // Reference to the player's health.
//private var enemyHealth : EnemyHealth;        // Reference to this enemy's health.
private var nav : NavMeshAgent;               // Reference to the nav mesh agent.
private var anim : Animator;                      // Reference to the animator component.
private var timer: float = 30; 			// set duration time in seconds in the Inspector
public var force : float = 10.0f;
var ums : GameObject;


function Awake ()
{
    // Set up the references.
//    playerHealth = player.GetComponent (PlayerHealth);
//    enemyHealth = GetComponent (EnemyHealth);
    nav = GetComponent (NavMeshAgent);
   	anim = GetComponent (Animator);
}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player" && timer <= 28){
		SkeletonDeath();
     	var direction : Vector3 = other.transform.position - transform.position;
     	other.rigidbody.AddForce(direction * 1800,ForceMode.Acceleration);
		ums = GameObject.Find( "CraterController" );
		ums.BroadcastMessage( "handleOuterImpacts", transform.position );

   	other.rigidbody.useGravity = true;
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
    // If the enemy and the player have health left...
    //if(enemyHealth.currentHealth > 0 && playerHealth.currentHealth > 0)
   // {
        // ... set the destination of the nav mesh agent to the player.
      // }
    if(nav.enabled == true && timer <= 28){
    	nav.SetDestination (myTarget.transform.position);
    	anim.SetTrigger("Run");
    }
   // else
   // {
        // ... disable the nav mesh agent.
   //     nav.enabled = false;
   // }
  EnemyTimer();

}

function EnemyTimer (){
    timer -= Time.deltaTime;
  if (timer <= 0){
         SkeletonDeath();
  }
}
function SkeletonDeath (){
	Instantiate (explosion, Vector3(transform.position.x, (transform.position.y)+0.5,transform.position.z), Quaternion.identity);
	Destroy(this.gameObject);
	nav.enabled = false;
}
