#pragma strict

//private var player : GameObject;                                // Reference to the player.
public static var playerDetected : boolean;
private var player : GameObject;
private var timer : float;
private var nose : GameObject;
private var noseAttack : boolean;
public var missileNose : GameObject;
 
function Awake ()
{	
	noseAttack = false;
	timer = 5;
	playerDetected = false;
   	player = this.transform.root.gameObject.GetComponent(JudgeScript).theTarget;
}

function FixedUpdate(){
	player = this.transform.root.gameObject.GetComponent(JudgeScript).theTarget;
    // If the colliding gameobject is the player...
    // ... raycast from the camera towards the player.
    var relPlayerPos : Vector3 = player.transform.position - transform.position;
    var hit : RaycastHit;
    // If the raycast hits the player...
    if(Physics.Raycast(transform.position, relPlayerPos, hit) && Vector3.Distance(transform.position, player.transform.position) < 30){
    	if(player == hit.collider.gameObject){
    		playerDetected = true;
    	}
    }
    if (playerDetected && player.gameObject.GetComponentInParent(PlayerMovement).isFallen){
    	if(noseAttack == false){
    		timer -= Time.deltaTime;
    	}
    	if(timer <= 0){
    		noseAttack = true;
    		timer = 5;
    		nose = this.transform.Find("Nose").gameObject;
    		missileNose = Instantiate(missileNose, nose.transform.position, Quaternion.identity);
    		missileNose.transform.position = nose.transform.position;
    		missileNose.active = true;
    	}
    	if(noseAttack){
    		missileNose.transform.position = Vector3.Lerp(missileNose.transform.position, player.transform.position, Time.deltaTime * 4);
    		if (Vector3.Distance(missileNose.transform.position, player.transform.position) <= 1){
    			player.rigidbody.AddExplosionForce(10000, player.transform.position, 3, 3.0);
    			player.transform.root.gameObject.GetComponent(PlayerHealth).TakeDamage(30);
    			noseAttack = false;
    			missileNose.active = false;
    		}
    	}
    }
}
