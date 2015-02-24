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
    thingToPull = null;
    //hingeJoint.connectedBody = null;
}   
     
function OnCollisionEnter( col : Collision ){
 
    if(col.collider.transform.parent != null && (col.collider.transform.parent.name == "Arms" || col.collider.transform.parent.name == "Hands")) {
         
        if(col.collider.transform.root.name != gameObject.name){        
             
            if(col.relativeVelocity.magnitude>6){
                playerHealth.TakeDamage(col.relativeVelocity.magnitude*.5);
            }
            
            handCollision = true;
            //hingeJoint.connectedBody = col.collider.rigidbody;
            
        //if(col.transform.name == "Player 2" ){
            thingToPull = col.transform;
         
              // }  
            }
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
    
    if((GameObject.Find("Player 1").transform.position - GameObject.Find("Player 2").transform.position).magnitude <20){
    Debug.Log("gralf");
        if(Input.GetKey(KeyCode.E)){
                D = GameObject.Find("Player 1").transform.position - GameObject.Find("Player 2").transform.position; // line from crate to player
                dist = D.magnitude;
                pullDir = D.normalized; 
              
               if(dist>50) thingToPull=null; 
               else if(dist>3) { 
              
                 pullF = 10;
              
                 // (so, random, optional junk):
                 pullForDist = (dist-3)/2.0f;
                 if(pullForDist>20) pullForDist=20;
                 pullF += pullForDist;
              
                 Debug.Log(pullDir*(pullF * Time.deltaTime));
                 GameObject.Find("Player 2").rigidbody.AddForce (pullDir*(pullF * Time.deltaTime)*300f, ForceMode.Acceleration);
                 //GameObject.Find("Player 2").rigidbody.velocity += pullDir*(pullF * Time.deltaTime);
               }
            }
        }
    }   
     
   