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


function Awake (){
	playerHealth = GetComponent (PlayerHealth);
}

function OnCollisionEnter( col : Collision ){
	isHit = false;
	if(col.collider.transform.parent != null && (col.collider.transform.parent.name == "Arms" || col.collider.transform.parent.name == "Hands")) {

		if(col.collider.transform.root.name != gameObject.name){

			if(col.relativeVelocity.magnitude>6){
				playerHealth.TakeDamage(col.relativeVelocity.magnitude*.5);
				gameObject.transform.Find("Nose").particleSystem.enableEmission = true;
				gameObject.transform.Find("Nose").particleSystem.Play();
				
				//this.rigidbody.constraints = RigidbodyConstraints.None;
				
				this.rigidbody.constraints =  RigidbodyConstraints.FreezeAll;
      			this.rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
				this.rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionZ;
				this.rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionX;
				isHit = true;
				//var forceDirection = col.gameObject.transform.position - this.transform.position;
				//forceDirection = forceDirection.normalized;
				var forceDirection = -col.rigidbody.velocity.normalized;
				this.rigidbody.AddForce(forceDirection*col.relativeVelocity.magnitude*2, ForceMode.Acceleration);
			}

			handCollision = true;


		}

	}

	if(col.collider.name=="DespawnPlane"){
		Destroy (this.gameObject);
		GameController.PlayerDied(this);
	}

}

function OnCollisionExit( col : Collision ){
	
    if(col.collider.transform.parent != null && (col.collider.transform.parent.name == "Arms" || col.collider.transform.parent.name == "Hands")) {

        if(col.collider.transform.root.name != gameObject.name){
			
            handCollision = false;

            //hingeJoint.connectedBody = null;

            }
    }
}

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
    }