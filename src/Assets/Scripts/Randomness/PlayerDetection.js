#pragma strict

//private var player : GameObject;                                // Reference to the player.
public static var playerDetected : boolean = false;

function Awake ()
{
    // Setting up the references.
    //var targets = GameObject.FindGameObjectsWithTag("Player");
    //lastPlayerSighting = GameObject.FindGameObjectWithTag(Tags.gameController).GetComponent(LastPlayerSighting);
}

function Update(){

}

function OnTriggerExit(collisionInfo : Collider) {
	playerDetected = false;
}

function OnTriggerStay (other : Collider)
{	if (other.gameObject.tag == "Player"){
	var targets = GameObject.FindGameObjectsWithTag("Player");
    // If the colliding gameobject is the player...
    // ... raycast from the camera towards the player.
    	for (var players : GameObject in targets){
       		var relPlayerPos : Vector3 = players.transform.position - transform.position;
       		var hit : RaycastHit;
        
       		// If the raycast hits the player...
       		if(Physics.Raycast(transform.position, relPlayerPos, hit)){
       		
       			if(hit.collider.gameObject.tag == "Player" && JudgeScript.theTarget == hit.collider.gameObject){
       				playerDetected = true;
       			}
       		}
    	}
    }
}