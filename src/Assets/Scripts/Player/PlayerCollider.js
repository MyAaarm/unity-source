#pragma strict

var isHit : boolean;

private var playerHealth : PlayerHealth;
private var thingToPull : Transform;
private var D : Vector3;
private var dist : float;
private var pullDir : Vector3;
private var pullForDist : float;
private var pullF : float;
private var handCollision : boolean;
private var otherBody : Rigidbody;
private var bloodObject : GameObject;

private var playerRigidbody : Rigidbody;          // Reference to the player's rigidbody.
public var occupied : boolean;
public var onGround : boolean;


function Awake (){
	playerHealth = GetComponentInParent(PlayerHealth);
  playerRigidbody = this.transform.GetComponent(Rigidbody);
  bloodObject = gameObject.transform.parent.Find('Blood').gameObject;

	occupied = false;
}

function OnCollisionEnter( col : Collision ){

	isHit = false;

	if(col.collider.transform.parent != null && (col.collider.transform.name == "leftArm" || col.collider.transform.name == "rightArm")) {

    Debug.Log(col.relativeVelocity.magnitude);
		if(col.collider.transform.root.name != gameObject.name){

			if(col.relativeVelocity.magnitude>3){
				playerHealth.TakeDamage(col.relativeVelocity.magnitude*0.25);


				if(col.relativeVelocity.magnitude > 40){
					bloodObject.particleSystem.transform.position = col.transform.position;
					bloodObject.particleSystem.transform.rotation = col.transform.rotation;
					bloodObject.particleSystem.enableEmission = true;
					bloodObject.particleSystem.Simulate(0.005f, true);
					bloodObject.particleSystem.Play();
				}

				playerRigidbody.constraints = RigidbodyConstraints.None;

				playerRigidbody.constraints =  RigidbodyConstraints.FreezeAll;
  			playerRigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
				playerRigidbody.constraints &= ~RigidbodyConstraints.FreezePositionZ;
				playerRigidbody.constraints &= ~RigidbodyConstraints.FreezePositionX;
				isHit = true;


				var forceDirection = col.rigidbody.velocity.normalized;
        var forceMagnitude = Mathf.Min(col.relativeVelocity.magnitude*10, 50f);

				playerRigidbody.AddForce(forceDirection*forceMagnitude, ForceMode.Impulse);


			}

			handCollision = true;




		}

	}

	if(col.collider.name=="DespawnPlane"){
    playerHealth.Death();
		GameController.PlayerDied(this.transform.parent);
	}
	
	if(col.collider.transform.root.name=="SpawnedChunks" || col.collider.transform.root.name=="Floor"){
		
		if(this.transform.parent.gameObject.GetComponent(PlayerMovement).isJumping){
			
			
			var ums = GameObject.Find( "CraterController" );	
			ums.BroadcastMessage( "handleOuterImpacts", col.contacts[0].point );
			
			
			
		}		

		onGround = true;
	}

}

function OnCollisionExit( col : Collision ){
  isHit = false;
  if(col.collider.transform.parent != null && (col.collider.transform.parent.name == "Arms" || col.collider.transform.parent.name == "Hands")) {

      if(col.collider.transform.root.name != gameObject.name){

          handCollision = false;

          //hingeJoint.connectedBody = null;

          }
  }

  if(col.collider.transform.root.name=="SpawnedChunks" || col.collider.transform.root.name=="Floor"){
	onGround = false;
	}
}

/*
function FixedUpdate(){

    if((GameObject.Find("Player1").transform.position - GameObject.Find("Player2").transform.position).magnitude <20){

        if(Input.GetButton("X360AButtonPC")||Input.GetButton("X360AButtonOSX")||Input.GetKey(KeyCode.E)){

        		//GameObject.Find("Player2").rigidbody.constraints =  RigidbodyConstraints.None;
      			GameObject.Find("Player2").rigidbody.constraints &=  ~RigidbodyConstraints.FreezePositionX;
      			GameObject.Find("Player2").rigidbody.constraints &=  ~RigidbodyConstraints.FreezePositionZ;
      			 D = GameObject.Find("Player1").transform.position - GameObject.Find("Player2").transform.position; // line from crate to player
                dist = D.magnitude;
                pullDir = D.normalized;

               if(dist>50) thingToPull=null;
               else if(dist>3) {

                 pullF = 10;

                 // (so, random, optional junk):
                 pullForDist = (dist-3)/2.0f;
                 if(pullForDist>20) pullForDist=20;
                 pullF += pullForDist;

                // Debug.Log(pullDir*(pullF * Time.deltaTime));
                 GameObject.Find("Player2").rigidbody.AddForce (pullDir*(pullF * Time.deltaTime)*300f, ForceMode.Acceleration);
                 //GameObject.Find("Player 2").rigidbody.velocity += pullDir*(pullF * Time.deltaTime);
               }
            }
        }
    }   */

