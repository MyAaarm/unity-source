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

private var isOSX : boolean = Application.platform == RuntimePlatform.OSXEditor || Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXWebPlayer;

function Awake ()
{

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
    var leftBumperPressed;
    var rightBumperPressed;

	UpdateGameController (); //Check if controller should be changed

	if(currentGameController == "Keyboard"){
		h = Input.GetAxisRaw ("Horizontal");
		v = Input.GetAxisRaw ("Vertical");

		hV = Input.GetAxisRaw ("Horizontal2");
		vV = Input.GetAxisRaw ("Vertical2");


	}else if(currentGameController == "Keyboard2"){

		h = Input.GetAxisRaw ("Horizontal3");
		v = Input.GetAxisRaw ("Vertical3");


	}else if(currentGameController == "PS3OSX"){

		h = Input.GetAxisRaw ("PS3LeftJoystickXOSX"+playerNumber);
		v = Input.GetAxisRaw ("PS3LeftJoystickYOSX"+playerNumber);

		hV = Input.GetAxisRaw ("PS3RightJoystickXOSX"+playerNumber);
	    vV = Input.GetAxisRaw ("PS3RightJoystickYOSX"+playerNumber);


	}else if (currentGameController == "X360OSX"){

		h = Input.GetAxisRaw ("360LeftJoystickX"+playerNumber);
		v = Input.GetAxisRaw ("360LeftJoystickY"+playerNumber);

		hV  = Input.GetAxisRaw ("360RightJoystickXOSX"+playerNumber);
    	vV  = Input.GetAxisRaw ("360RightJoystickYOSX"+playerNumber);

    }//Check if the game is running on PC with Xbox360 controller
	else if (currentGameController == "X360PC"){

		h = Input.GetAxisRaw ("360LeftJoystickX"+playerNumber);
		v = Input.GetAxisRaw ("360LeftJoystickY"+playerNumber);

		hV  = Input.GetAxisRaw ("360RightJoystickXPC"+playerNumber);
    	vV  = Input.GetAxisRaw ("360RightJoystickYPC"+playerNumber);

    	//leftBumperPressed = Input.GetButtonDown('360LeftBumperPC'+playerNumber);
    	//rightBumperPressed = Input.GetButtonDown('360RightBumperPC'+playerNumber);
    }


    // Move the player around the scene.
    var shouldMove = false;

    if(h != 0 || v != 0) {
      shouldMove = true;
      LeftArm(h, v);
    } else {
      //leftHand.rigidbody.constraints = RigidbodyConstraints.FrezeeAll;
    }
    // Turn the player to face the mouse cursor.

    if(hV != 0 || vV != 0) {
      shouldMove = true;
      RightArm(hV, vV);
    } else {
      //rightHand.rigidbody.constraints = RigidbodyConstraints.FrezeeAll;
    }

    if(shouldMove){
      playerRigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ ;
      Move(h, v, hV, vV);
    }
    else {
    	if(!this.gameObject.GetComponent(PlayerCollider).isHit){	
     	playerRigidbody.constraints =  RigidbodyConstraints.FreezeAll;
      	playerRigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
      }
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
    leftHand.rigidbody.AddForce(movementLeftArm*1f, ForceMode.Impulse);
}


function RightArm (hV : float, vV : float) {

    movementRightArm.Set(hV, 0f, vV);
    //rightHand.rigidbody.constraints = RigidbodyConstraints.FreezePositionY;
    rightHand.rigidbody.AddForce (movementRightArm*1f, ForceMode.Impulse);
}


function Move (h : float, v : float, hV : float, vV : float) {
    // Set the movement vector based on the axis input.
    movement = new Vector3(h, 0f, v) + new Vector3(hV, 0f, vV);

    // Normalise the movement vector and make it proportional to the speed per second.
    movement = movement.normalized * speed * Time.deltaTime;
    var newRotation : Quaternion = Quaternion.LookRotation (movement);

    // Move the player to it's current position plus the movement.
    //playerRigidbody.MoveRotation (newRotation);
    //playerRigidbody.MovePosition (transform.position + movement);

}