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

		if(col.collider.gameObject.transform.root.Find("body")!=null&&col.collider.gameObject.transform.root.Find("body").tag=="Player"){
			cld = col;
			handCollision = true;
			collisionTimer = 100;
		}
}

function FixedUpdate(){
    var hingeJoints : Component[];

    if(!this.transform.root.GetComponent(PlayerMovement).dragButton) {

		hingeJoints = this.gameObject.GetComponentsInChildren(HingeJoint);
		for (var joint : HingeJoint in hingeJoints) {
			Destroy(joint);
		}

	}

	hingeJoints = this.gameObject.GetComponentsInChildren(HingeJoint);
	if(hingeJoints.Length==0&&cld!=null){
    	cld.collider.gameObject.transform.root.Find("body").GetComponent(PlayerCollider).occupied = false;
    }

    if(collisionTimer > 0  && handCollision){

    	collisionTimer = collisionTimer-1;

		/*
    	Debug.Log("Object name" + this.name + "object parent" + this.transform.parent.name+ " objects parents parent" + this.transform.parent.transform.parent.name + "objects parents parents parents" + this.transform.root.name);
    	Debug.Log("collider root = " + cld.collider.gameObject.transform.root.name);
    	Debug.Log(collisionTimer);*/

    	//Debug.Log("THIS =====" + this.transform.root.name);
    	//Debug.Log("NOT THIS =====" + cld.collider.gameObject.transform.root.name);
    	// && this.transform.root.GetComponent(PlayerCollider).occupied != true
    	if(cld.collider.gameObject.transform.root.name != this.transform.root.name){
        	if(this.transform.root.GetComponent(PlayerMovement).dragButton){
        	//if(Input.GetButton("X360AButtonPC")||Input.GetButton("X360AButtonOSX")||Input.GetKey(KeyCode.E)){

        		//Debug.Log("Collided");
        		var hJ : Component[];
				hJ = this.gameObject.GetComponentsInChildren(HingeJoint);
				if(hJ.Length == 0){
        		this.gameObject.AddComponent(HingeJoint);
        		var otherBody = cld.collider.gameObject.transform.root.Find("body").rigidbody;
        		if(otherBody==null){
        			otherBody = cld.collider.transform.root.gameObject.rigidbody;
        		}
        		Debug.Log(otherBody.name);
        		hingeJoint.breakForce = 45;
        		hingeJoint.breakTorque = 45;
        		hingeJoint.connectedBody = otherBody;}
        		cld.collider.gameObject.transform.root.Find("body").GetComponent(PlayerCollider).occupied = true;
      			cld.collider.gameObject.transform.root.Find("body").rigidbody.constraints =  RigidbodyConstraints.None;
        		D = this.transform.root.transform.position - cld.collider.gameObject.transform.root.transform.position; // line from crate to player
                pullF = 10;
                dist = D.magnitude;
                pullDir = D.normalized;
                //Debug.Log(pullDir*(pullF * Time.deltaTime)*100f);
				//cld.collider.gameObject.transform.root.Find("body").rigidbody.AddForce (pullDir*(pullF * Time.deltaTime)*100f, ForceMode.Impulse);



        		/*//Debug.Log("WIN " + collisionTimer);
        		cld.collider.gameObject.transform.root.GetComponent(PlayerCollider).occupied = true;
        		cld.collider.gameObject.transform.root.rigidbody.constraints =  RigidbodyConstraints.None;
      			//cld.collider.gameObject.transform.root.rigidbody.constraints &=  ~RigidbodyConstraints.FreezePositionX;
      			//cld.collider.gameObject.transform.root.rigidbody.constraints &=  ~RigidbodyConstraints.FreezePositionZ;
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
                	//cld.collider.gameObject.transform.root.rigidbody.AddForce (pullDir*(pullF * Time.deltaTime)*20f, ForceMode.Impulse);
                 //GameObject.Find("Player 2").rigidbody.velocity += pullDir*(pullF * Time.deltaTime); */
               //}
            }
        }

        if(collisionTimer == 0){
    	handCollision = false;
    	cld = null;
    	}

	}
}
