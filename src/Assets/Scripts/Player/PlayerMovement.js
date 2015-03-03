var speed : float = 1f;            // The speed that the player will move at.
var playerNumber : int;
var currentGameController : String;

private var movement : Vector3;                   // The vector to store the direction of the player's movement.
private var movementLeftArm : Vector3;                   // The vector to store the direction of the player's movement.
private var movementRightArm : Vector3;                   // The vector to store the direction of the player's movement.

private var anim : Animator;                      // Reference to the animator component.
private var playerRigidbody : Rigidbody;          // Reference to the player's rigidbody.
private var floorMask : int;                      // A layer mask so that a ray can be cast just at gameobjects on the floor layer.
private var camRayLength : float = 100f;          // The length of the ray from the camera into the scene.

private var activeArm : String;



public var leftHand : GameObject;
public var rightHand : GameObject;
private var leftLeg : GameObject;
private var rightLeg : GameObject;
private var legs : GameObject;

public var dragButton : boolean;
public var jumpForce : float;
public var numberOfJumps : int = 0;
private var newRotation : Quaternion;
private var old : int; 


private var isOSX : boolean = Application.platform == RuntimePlatform.OSXEditor || Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXWebPlayer;

function Awake ()
{
	legs = this.transform.Find("Legs").gameObject;
    leftLeg = this.transform.Find("Legs/leftLeg").gameObject;
    rightLeg = this.transform.Find("Legs/rightLeg").gameObject; 
    jumpForce = 200f;  
}

function Start () {
   // Create a layer mask for the floor layer.
    floorMask = LayerMask.GetMask ("Floor");

    // Set up references.
    anim = GetComponent (Animator);
    playerRigidbody = GetComponent (Rigidbody);

    leftHand = this.transform.Find("Arms/Hands/left").gameObject;
    rightHand = this.transform.Find("Arms/Hands/right").gameObject;
}

function FixedUpdate ()
{
    // Store the input axes.
    var h : float;
    var v : float;
    var hV : float;
    var vV : float;
    var jumpButtonPressed : boolean;
    
	UpdateGameController (); //Check if controller should be changed

	if(currentGameController == "Keyboard"){
		h = Input.GetAxisRaw ("Horizontal");
		v = Input.GetAxisRaw ("Vertical");

		hV = Input.GetAxisRaw ("Horizontal2");
		vV = Input.GetAxisRaw ("Vertical2");
		
		dragButton = Input.GetKey(KeyCode.E);


	}else if(currentGameController == "Keyboard2"){

		h = Input.GetAxisRaw ("Horizontal3");
		v = Input.GetAxisRaw ("Vertical3");


	}else if(currentGameController == "PS3OSX"){

		h = Input.GetAxisRaw ("LeftJoystickX"+playerNumber);
		v = Input.GetAxisRaw ("LeftJoystickY"+playerNumber);

		hV = Input.GetAxisRaw ("RightJoystickXOSX"+playerNumber);
	    vV = Input.GetAxisRaw ("RightJoystickYOSX"+playerNumber);


	}else if (currentGameController == "X360OSX"){

		h = Input.GetAxisRaw ("LeftJoystickX"+playerNumber);
		v = Input.GetAxisRaw ("LeftJoystickY"+playerNumber);

		hV  = Input.GetAxisRaw ("RightJoystickXOSX"+playerNumber);
    	vV  = Input.GetAxisRaw ("RightJoystickYOSX"+playerNumber);
    	
    	dragButton = Input.GetButton('X360AButtonOSX'+playerNumber);

    }//Check if the game is running on PC with Xbox360 controller
	else if (currentGameController == "X360PC"){

		h = Input.GetAxisRaw ("LeftJoystickX"+playerNumber);
		v = Input.GetAxisRaw ("LeftJoystickY"+playerNumber);

		hV  = Input.GetAxisRaw ("360RightJoystickXPC"+playerNumber);
    	vV  = Input.GetAxisRaw ("360RightJoystickYPC"+playerNumber);
    	
    	dragButton = Input.GetButton('360LeftBumperPC'+playerNumber);
		
		jumpButtonPressed =  Input.GetButtonDown('360RightBumperPC'+playerNumber);
						
    	//leftBumperPressed = Input.GetButtonDown('360LeftBumperPC'+playerNumber);
    	//rightBumperPressed = Input.GetButtonDown('360RightBumperPC'+playerNumber);
    }


    // Move the player around the scene.
    var shouldMove = false;   

    if(h != 0 || v != 0) {
      shouldMove = true;
      LeftArm(h, v);
      MoveLegs(h, v, hV, vV);	
    } 
   
    if(hV != 0 || vV != 0) {
      shouldMove = true;
      RightArm(hV, vV);
      MoveLegs(h, v, hV, vV);	
    }

    if(shouldMove){
	playerRigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;
    }
    else {
    	if(!this.gameObject.GetComponent(PlayerCollider).occupied&&this.gameObject.GetComponent(PlayerCollider).onGround){
	      playerRigidbody.constraints =  RigidbodyConstraints.FreezeAll;
	      playerRigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
      }
    }
    
    if(jumpButtonPressed){
    	Jump();
    }
    
    if(playerRigidbody.velocity.y>jumpForce){
		playerRigidbody.velocity.y = jumpForce;
	}
    
    //Debug.Log(playerRigidbody.velocity.y);
    
    if (h == 0 && v == 0 && hV == 0 && vV == 0){
		leftLeg.transform.rotation = Quaternion.Euler(0, 0, 0);
		rightLeg.transform.rotation = Quaternion.Euler(0, 0, 0);	
	}
}

function UpdateGameController ()
{
	if (isOSX){
		if(Input.GetKey('joystick button 9')){
			currentGameController = "X360OSX";
		}else if(Input.GetKey('joystick button 0')){
			currentGameController = "PS3OSX";
		}
	}else{

		if(Input.GetKey('joystick button 7')){
			currentGameController = "X360PC";
			Debug.Log("stitched controller");
		}
	}
}

function LeftArm (h: float, v : float) {


     // Set the movement vector based on the axis input.
    movementLeftArm.Set(h, 0f, v);
    //leftHandRigidBody.constraints = RigidbodyConstraints.FreezePositionY;
    leftHand.rigidbody.AddForce(movementLeftArm*2.5f, ForceMode.Impulse);
}


function RightArm (hV : float, vV : float) {

    movementRightArm.Set(hV, 0f, vV);
    //rightHand.rigidbody.constraints = RigidbodyConstraints.FreezePositionY;
    rightHand.rigidbody.AddForce (movementRightArm*2.5f, ForceMode.Impulse);
}

function Jump(){
	
	if(this.gameObject.GetComponent(PlayerCollider).onGround){
		numberOfJumps = 0;
	}
	
	var jumpVector : Vector3 = new Vector3(0f, jumpForce, 0f);
	if(numberOfJumps<2){
		//playerRigidbody.AddForce(jumpVector, ForceMode.Impulse);
		playerRigidbody.velocity = jumpVector;
		Debug.Log(playerRigidbody.velocity.y);
		numberOfJumps++;
	}
}

function MoveLegs(h : float, v : float, hV : float, vV : float) {
	
	//get rigidbody velocity vector
	movement = rigidbody.velocity;
	//remove velocity in y axis
	movement.y = 0f;
    
    //find the forward rotation based on this and rotate parent leg object towards this vector
    newRotation = Quaternion.LookRotation(movement);
	legs.transform.rotation=newRotation;
	
	//also use sin function to rotate legs and apply same rotation to them. :)
	leftLeg.transform.rotation = newRotation * Quaternion.Euler(-Mathf.Sin(Time.realtimeSinceStartup*5) * 50, 0, 0);
	rightLeg.transform.rotation = newRotation * Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup*5) * 50, 0, 0);	
}