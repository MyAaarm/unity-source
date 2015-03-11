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

private var dragTimer : float;
private var dragCooldown : float;
public var isDragging : boolean;


function Awake (){
	playerHealth = GetComponent (PlayerHealth);
	handCollision = false;
	collisionTimer = 0;
}

function OnCollisionEnter( col : Collision ){

		if(col.collider.gameObject.transform.root.Find("body")!=null&&col.collider.gameObject.transform.root.Find("body").tag=="body"){
			cld = col;
			handCollision = true;
			collisionTimer = 100;

		}
}

function FixedUpdate(){
    var hingeJoints : Component[];
    if(!this.transform.root.GetComponent(PlayerMovement).dragButton||dragTimer>5) {

		hingeJoints = this.gameObject.GetComponentsInChildren(HingeJoint);
		for (var joint : HingeJoint in hingeJoints) {
			Destroy(joint);
		}
		isDragging = false;
		this.transform.root.GetComponent(PlayerMovement).isDragging = false;
	}

	hingeJoints = this.gameObject.GetComponentsInChildren(HingeJoint);
	if(hingeJoints.Length==0&&cld!=null){

    	cld.collider.gameObject.transform.root.Find("body").GetComponent(PlayerCollider).occupied = false;
    }

	if(dragCooldown>0){
		dragCooldown -= Time.deltaTime;
	}
	if(isDragging){
		dragTimer += Time.deltaTime;
	}

    if(collisionTimer > 0  && handCollision&&dragCooldown<=0){

    	collisionTimer = collisionTimer-1;

    	if(cld.collider.gameObject.transform.root.name != this.transform.root.name){
        	if(this.transform.root.GetComponent(PlayerMovement).dragButton){

        		var hJ : Component[];
				hJ = this.gameObject.GetComponentsInChildren(HingeJoint);
				if(hJ.Length == 0){
        		this.gameObject.AddComponent(HingeJoint);
        		var otherBody = cld.collider.gameObject.transform.root.Find("body").rigidbody;
        		if(otherBody==null){
        			otherBody = cld.collider.transform.root.gameObject.rigidbody;
        		}
        		hingeJoint.breakForce = 15;
        		hingeJoint.breakTorque = 15;
        		hingeJoint.connectedBody = otherBody;}
        		cld.collider.gameObject.transform.root.Find("body").GetComponent(PlayerCollider).occupied = true;
      			cld.collider.gameObject.transform.root.Find("body").rigidbody.constraints =  RigidbodyConstraints.None;
        		D = this.transform.root.transform.position - cld.collider.gameObject.transform.root.transform.position; // line from crate to player
                pullF = 10;
                dist = D.magnitude;
                pullDir = D.normalized;

				isDragging = true;
				this.transform.root.GetComponent(PlayerMovement).isDragging = true;
				if(dragTimer>5){
					dragTimer = 0;
					dragCooldown = 5f;
					isDragging=false;
					this.transform.root.GetComponent(PlayerMovement).isDragging = false;
					hingeJoints = this.gameObject.GetComponentsInChildren(HingeJoint);
					for (var joint : HingeJoint in hingeJoints) {
						Destroy(joint);
					}
					cld.collider.gameObject.transform.root.Find("body").GetComponent(PlayerCollider).occupied = false;

				}

            }
        }

        if(collisionTimer == 0){
    	handCollision = false;
    	cld = null;
    	}

	}
}
