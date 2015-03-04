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




private var isMoving : boolean = false;
private var isFighting : boolean = false;
private var shouldMove : boolean = false;
private var shouldInvert : boolean = false;

public var leftArm : GameObject;
public var rightArm : GameObject;


public var leftHand : GameObject;
public var rightHand : GameObject;
private var leftLeg : GameObject;
private var rightLeg : GameObject;
private var legs : GameObject;

private var scaleLeftArm : Vector3;
private var scaleRightArm  : Vector3;

public var dragButton : boolean;
public var jumpForce : float;
public var numberOfJumps : int = 0;
private var newRotation : Quaternion;
private var old : int; 
private var isJumping : boolean;
public var isFallen : boolean;
private var riseButtonDown : boolean;


private var isOSX : boolean = Application.platform == RuntimePlatform.OSXEditor || Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXWebPlayer;


function Awake () {
    jumpForce = 200f;
}

function Start () {
   // Create a layer mask for the floor layer.
    floorMask = LayerMask.GetMask ("Floor");

    // Set up references.
    anim = GetComponent (Animator);
    playerRigidbody = GetComponent(Rigidbody);


    leftArm = this.transform.Find("Arms/left").gameObject;
    rightArm = this.transform.Find("Arms/right").gameObject;

    leftHand = this.transform.Find("Arms/Hands/left").gameObject;
    rightHand = this.transform.Find("Arms/Hands/right").gameObject;

    legs = this.transform.Find("Legs").gameObject;
    leftLeg = this.transform.Find("Legs/leftLeg").gameObject;
    rightLeg = this.transform.Find("Legs/rightLeg").gameObject;

    scaleLeftArm = leftArm.transform.localScale;
    scaleRightArm = rightArm.transform.localScale;

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
	riseButtonDown = Input.GetKey(KeyCode.R);


  }
  else {
    h = Input.GetAxisRaw ("LeftJoystickX"+playerNumber);
    v = Input.GetAxisRaw ("LeftJoystickY"+playerNumber);
  }

  if(currentGameController == "PS3OSX"){


		hV = Input.GetAxisRaw ("RightJoystickXOSX"+playerNumber);
    vV = Input.GetAxisRaw ("RightJoystickYOSX"+playerNumber);

    dragButton = Input.GetButton('PS3LeftBumperOSX'+playerNumber);
		jumpButtonPressed =  Input.GetButtonDown('PS3RightBumperOSX'+playerNumber);


  }
  else if (currentGameController == "X360OSX"){
		hV  = Input.GetAxisRaw ("RightJoystickXOSX"+playerNumber);
  	vV  = Input.GetAxisRaw ("RightJoystickYOSX"+playerNumber);

  	dragButton = Input.GetButton('360LeftBumperOSX'+playerNumber);
	  jumpButtonPressed =  Input.GetButtonDown('360RightBumperOSX'+playerNumber);


  } //Check if the game is running on PC with Xbox360 controller
  else if (currentGameController == "X360PC"){
    hV  = Input.GetAxisRaw ("360RightJoystickXPC"+playerNumber);
    vV  = Input.GetAxisRaw ("360RightJoystickYPC"+playerNumber);

  	dragButton = Input.GetButton('360LeftBumperPC'+playerNumber);
		jumpButtonPressed =  Input.GetButtonDown('360RightBumperPC'+playerNumber);
		
		riseButtonDown = Input.GetButtonUp('X360AButtonPC'+playerNumber);
						
    	//leftBumperPressed = Input.GetButtonDown('360LeftBumperPC'+playerNumber);
    	//rightBumperPressed = Input.GetButtonDown('360RightBumperPC'+playerNumber);   

  }


    // Move the player around the scene.
    var shouldMove = false;
  //  Debug.Log("left: " + leftHand.transform.position.x + " right:" + rightHand.transform.position.x);
//    Debug.Log(leftHand.transform.position.x > rightHand.transform.position.x);

    if(!isMoving){
      if(leftHand.transform.position.x > rightHand.transform.position.x){
        shouldInvert = true;
      } else {
        shouldInvert = false;
      }
    }

    if(h != 0 || v != 0) {
        shouldMove = true;
        if(shouldInvert) {
            RightArm(h, v);
        }
        else {
            LeftArm(h, v);
        }

    } else {
      leftArm.transform.localScale.y = scaleLeftArm.y;
    }

    if(hV != 0 || vV != 0) {
        shouldMove = true;
        if(shouldInvert) {
            LeftArm(hV, vV);
        }
        else {
            RightArm(hV, vV);
        }
    } else {
      rightArm.transform.localScale.y = scaleRightArm.y;
    }

    if(shouldMove && !this.gameObject.GetComponent(PlayerCollider).isHit && !this.gameObject.GetComponent(PlayerCollider).occupied){
      playerRigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;
      MoveLegs(h, v, hV, vV);
    }else if(!this.gameObject.GetComponent(PlayerCollider).isHit&&!this.gameObject.GetComponent(PlayerCollider).isHit&&!this.gameObject.GetComponent(PlayerCollider).occupied&&this.gameObject.GetComponent(PlayerCollider).onGround){
	      playerRigidbody.constraints =  RigidbodyConstraints.FreezeAll;
	} else {
		playerRigidbody.constraints = RigidbodyConstraints.None;
	}

      playerRigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
      isMoving = false;
    
    if(this.gameObject.GetComponent(PlayerCollider).onGround){
    	//playerRigidbody.constraints =  RigidbodyConstraints.None;
    	isJumping = false;
    	numberOfJumps = 0;
    }
    
    if(numberOfJumps>0&&!this.gameObject.GetComponent(PlayerCollider).onGround){
    	isJumping = true;
    }
    
    if(isJumping || isFallen || this.gameObject.GetComponent(PlayerCollider).isHit || this.gameObject.GetComponent(PlayerCollider).occupied){
    	playerRigidbody.constraints =  RigidbodyConstraints.None;
    }else{
    	transform.rotation.x = 0;
    	transform.rotation.z = 0;
    }
    
    if(jumpButtonPressed && !isFallen){
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
	
	if(isFallen){
		if(riseButtonDown){
			if(Mathf.Abs(this.transform.rotation.x) > Mathf.Abs(this.transform.rotation.z)){
				if(this.transform.rotation.x > 0) { this.transform.rotation.x = this.transform.rotation.x - 0.22; }
				else { this.transform.rotation.x = this.transform.rotation.x + 0.22;
				}
			} else {
				if(this.transform.rotation.z > 0) { this.transform.rotation.z = this.transform.rotation.z - 0.22; }
				else { this.transform.rotation.z = this.transform.rotation.z + 0.22;
				}
			}
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
    movementLeftArm.Set(h, 0f, v);

    if(Mathf.Sqrt(h*h + v*v) > 0.95){
        isMoving = true;
        //playerRigidbody.rigidbody.AddForce(movementRightArm*10f, ForceMode.Impulse);
        leftHand.rigidbody.AddForce(movementLeftArm*1f, ForceMode.Impulse);
    } else {
      isFighting = true;
    }


     // Set the movement vector based on the axis input.
    movementLeftArm.Set(h, 0f, v);
    //leftHandRigidBody.constraints = RigidbodyConstraints.FreezePositionY;
    if(!isFallen){
    	leftHand.rigidbody.AddForce(movementLeftArm*2.5f, ForceMode.Impulse);
    } else {
    	leftHand.rigidbody.AddForce(movementLeftArm, ForceMode.Impulse);
    }
    //rightHand.rigidbody.AddForce(movementRightArm*2f, ForceMode.Impulse);

    movementLeftArm.x = Mathf.Min(movementLeftArm.x, 0.75f);
    movementLeftArm.z = Mathf.Min(movementLeftArm.z, 0.75f);

    leftHand.transform.position += movementLeftArm*Time.deltaTime*200;
    leftArm.transform.localScale.y = scaleLeftArm.y + scaleLeftArm.y * movementLeftArm.magnitude*1.4;

}


function RightArm (hV : float, vV : float) {
    movementRightArm.Set(hV, 0f, vV);
    
    if(Mathf.Sqrt(hV*hV + vV*vV) > 0.95){
        isMoving = true;
        //playerRigidbody.rigidbody.AddForce(movementLeftArm*10f, ForceMode.Impulse);
        rightHand.rigidbody.AddForce(movementRightArm*1f, ForceMode.Impulse);
    } else {
      isFighting = true;
    }



    movementRightArm.x = Mathf.Min(movementRightArm.x, 0.75f);
    movementRightArm.z = Mathf.Min(movementRightArm.z, 0.75f);


    rightHand.transform.position += movementRightArm*Time.deltaTime*200;
    rightArm.transform.localScale.y = scaleRightArm.y + scaleRightArm.y * movementRightArm.magnitude*1.4;

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
		isJumping = true;
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

  //also use sin function to rotate legs and apply same rotation to them.
  leftLeg.transform.rotation = newRotation * Quaternion.Euler(-Mathf.Sin(Time.realtimeSinceStartup*10) * 50, 0, 0);
  rightLeg.transform.rotation = newRotation * Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup*10) * 50, 0, 0);
}
