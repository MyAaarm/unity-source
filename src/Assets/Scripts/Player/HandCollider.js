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
private var collisionTimer : int;
private var cld : Collision;


function Awake (){
	playerHealth = GetComponent (PlayerHealth);
	handCollision = false;
	collisionTimer = 0;
}

function OnCollisionEnter( col : Collision ){
	
		/*for (var contact : ContactPoint in col.contacts) {
					print(contact.thisCollider.name + " hit " + contact.otherCollider.name);
		}*/
		cld = col;
		handCollision = true;
		collisionTimer = 20;
}
 
function FixedUpdate(){
    
    
    
    if(collisionTimer > 0  && handCollision){
    	
    	collisionTimer = collisionTimer-1;
    	
		/*
    	Debug.Log("Object name" + this.name + "object parent" + this.transform.parent.name+ " objects parents parent" + this.transform.parent.transform.parent.name + "objects parents parents parents" + this.transform.root.name);
    	Debug.Log("collider root = " + cld.collider.gameObject.transform.root.name);
    	Debug.Log(collisionTimer);*/
    	
    	//Debug.Log("THIS =====" + this.transform.root.name);
    	//Debug.Log("NOT THIS =====" + cld.collider.gameObject.transform.root.name);
    	
    	if((cld.collider.gameObject.transform.root.name != this.transform.root.name) && this.transform.root.GetComponent(PlayerCollider).occupied != true){
        	if(this.transform.root.GetComponent(PlayerMovement).dragButton){
        	//if(Input.GetButton("X360AButtonPC")||Input.GetButton("X360AButtonOSX")||Input.GetKey(KeyCode.E)){
        		
        		//Debug.Log("WIN " + collisionTimer);
        		cld.collider.gameObject.transform.root.GetComponent(PlayerCollider).occupied = true;
        		//cld.collider.gameObject.transform.root.rigidbody.constraints =  RigidbodyConstraints.None;
      			cld.collider.gameObject.transform.root.rigidbody.constraints &=  ~RigidbodyConstraints.FreezePositionX;
      			cld.collider.gameObject.transform.root.rigidbody.constraints &=  ~RigidbodyConstraints.FreezePositionZ;
      			D = this.transform.root.transform.position - cld.collider.gameObject.transform.root.transform.position; // line from crate to player
                this.gameObject.transform.rotation = Quaternion.LookRotation(D);
                dist = D.magnitude;
                pullDir = D.normalized; 
              
               if(dist>50) thingToPull=null; 
               else if(dist>3) { 
              
                 pullF = 10;
              
                 // (so, random, optional junk):
                 /*pullForDist = (dist-3)/2.0f;
                 if(pullForDist>20) pullForDist=20;
                 pullF += pullForDist;*/
                // Debug.Log("Player1 = " + this.gameObject.transform.root.GetComponent(PlayerCollider).occupied);
                 //Debug.Log("Player2 = " + cld.collider.gameObject.transform.root.GetComponent(PlayerCollider).occupied);
              	//Debug.Log(cld.collider.gameObject.transform.root.name);
                // Debug.Log(pullDir*(pullF * Time.deltaTime));
                	cld.collider.gameObject.transform.root.rigidbody.AddForce (pullDir*(pullF * Time.deltaTime)*50f, ForceMode.Impulse);
                 //GameObject.Find("Player 2").rigidbody.velocity += pullDir*(pullF * Time.deltaTime);
               }
            }
        }
        
        if(collisionTimer == 0){ 
    	handCollision = false; 
    	cld.collider.gameObject.transform.root.GetComponent(PlayerCollider).occupied = false;
    	cld = null;
    	}
    	
        }
    }   