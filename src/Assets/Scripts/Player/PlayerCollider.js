#pragma strict


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
public var damageMultiplyer : float;

private var playerRigidbody : Rigidbody;          // Reference to the player's rigidbody.
public var occupied : boolean;
public var onGround : boolean;
public var isHit : boolean;
private var hitTimer : float;


function Awake (){
	playerHealth = GetComponentInParent(PlayerHealth);
  	playerRigidbody = this.transform.GetComponent(Rigidbody);
 	bloodObject = gameObject.transform.parent.Find('Blood').gameObject;
	damageMultiplyer = 1;
	occupied = false;
}


function OnCollisionEnter( col : Collision ){
	if((col.contacts[0].thisCollider.name == 'leftLeg' || col.contacts[0].thisCollider.name == 'rightLeg') && col.contacts[0].otherCollider.name == 'body'){

		playerHealth.TakeDamage(10);

		bloodObject.particleSystem.transform.position = col.transform.position;
		bloodObject.particleSystem.transform.rotation = col.transform.rotation;
		bloodObject.particleSystem.enableEmission = true;
		bloodObject.particleSystem.Simulate(0.005f, true);
		bloodObject.particleSystem.Play();

		var forceDirection1 = this.transform.forward;
		var forceMagnitude1 = 75f;

		col.contacts[0].otherCollider.attachedRigidbody.AddForce(forceDirection1*forceMagnitude1, ForceMode.Impulse);

	}
	//isHit = false;

	if(col.collider.transform.parent != null && (col.collider.transform.name == "leftArm" || col.collider.transform.name == "rightArm")&&!this.transform.root.GetComponent(PlayerMovement).dragButton) {


		if(col.collider.transform.root.name != gameObject.name){

			if(col.relativeVelocity.magnitude>3){
				playerHealth.TakeDamage(col.relativeVelocity.magnitude*0.25*damageMultiplyer);


				if(col.relativeVelocity.magnitude > 30){
					bloodObject.particleSystem.transform.position = col.transform.position;
					bloodObject.particleSystem.transform.rotation = col.transform.rotation;
					bloodObject.particleSystem.enableEmission = true;
					bloodObject.particleSystem.Simulate(0.005f, true);
					bloodObject.particleSystem.Play();
				}

				//playerRigidbody.constraints = RigidbodyConstraints.None;



				if(col.relativeVelocity.magnitude > 15){
					var forceDirection = col.rigidbody.velocity.normalized;
	       			var forceMagnitude = Mathf.Min(col.relativeVelocity.magnitude*50, 150f);
					isHit = true;
					playerRigidbody.AddForce(forceDirection*forceMagnitude, ForceMode.Impulse);
				}

			}

			handCollision = true;




		}

	}

	if(col.collider.name=="DespawnPlane"){
    playerHealth.Death();
	}

	if(col.collider.transform.root.name=="SpawnedChunks" || col.collider.transform.root.name=="Floor"){

		if(this.transform.parent.gameObject.GetComponent(PlayerMovement).isJumping&&col.relativeVelocity.magnitude>60){


			var ums = GameObject.Find( "CraterController" );
			ums.BroadcastMessage( "handleOuterImpacts", col.contacts[0].point );


		}

		onGround = true;
	}

}

function OnCollisionExit( col : Collision ){
 // isHit = false;
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

function FixedUpdate(){
	if(isHit){
		hitTimer += Time.deltaTime;
	}
	if(hitTimer>3){
		hitTimer = 0;
		isHit = false;
	}

}
