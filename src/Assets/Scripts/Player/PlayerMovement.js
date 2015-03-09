var speed : float = 1f;            // The speed that the player will move at.
var playerNumber : int;
var currentGameController : String;

private var leftArmMovement : Vector3;                   // The vector to store the direction of the player's leftArmMovement.
private var rightArmMovement : Vector3;                   // The vector to store the direction of the player's leftArmMovement.

private var playerMaxVelocity : Vector3;
private var playerBody : GameObject;          // Reference to the player's rigidbody.\
private var playerRigidbody : Rigidbody;          // Reference to the player's rigidbody.\
private var playerCollider : PlayerCollider;          // Reference to the player's rigidbody.
private var floorMask : int;                      // A layer mask so that a ray can be cast just at gameobjects on the floor layer.
private var camRayLength : float = 100f;          // The length of the ray from the camera into the scene.

private var activeArm : String;

private var isMoving : boolean = false;
private var isFighting : boolean = false;

private var shouldMove : boolean = false;
private var shouldInvert : boolean = false;

private var leftArm : GameObject;
private var rightArm : GameObject;
private var leftArmOriginalScale : Vector3;
private var rightArmOriginalScale  : Vector3;

private var leftHand : GameObject;
private var rightHand : GameObject;
private var leftHandOriginalScale : Vector3;
private var rightHandOriginalScale : Vector3;

private var legs : GameObject;
private var leftLeg : GameObject;
private var rightLeg : GameObject;

private var leftSide = {};
private var rightSide = {};

public var dragButton : boolean;
public var jumpForce : float;
public var numberOfJumps : int = 0;
private var newRotation : Quaternion;
private var old : int; 
public var isJumping : boolean;
private var jumpButtonDown : boolean;
private var jumpFwdForce : float;
public var isFallen : boolean;
private var riseButtonDown : boolean;

private var bodySize : float;

private var isOSX : boolean = Application.platform == RuntimePlatform.OSXEditor || Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXWebPlayer;


function Awake () {
    jumpForce = 50f;
    playerMaxVelocity = new Vector3(20f,20f,20f);
    bodySize = this.transform.Find("body").gameObject.transform.localScale.y;
}

function Start () {
   // Create a layer mask for the floor layer.
    floorMask = LayerMask.GetMask ("Floor");

    // Set up references.
    playerBody = this.transform.Find("body").gameObject;
    playerRigidbody = this.transform.Find("body").GetComponent(Rigidbody);
    playerCollider = this.transform.Find("body").GetComponent(PlayerCollider);



    leftArm = this.transform.Find("leftArm").gameObject;
    rightArm = this.transform.Find("rightArm").gameObject;

    leftArmOriginalScale = leftArm.transform.localScale;
    rightArmOriginalScale = rightArm.transform.localScale;

    // leftHand = leftArm.transform.Find("Hand/left").gameObject;
    // rightHand = rightArm.transform.Find("Hand/right").gameObject;

    // leftHandOriginalScale = leftHand.transform.localScale;
    // rightHandOriginalScale = rightHand.transform.localScale;

    legs = this.transform.Find("body/Legs").gameObject;
    leftLeg = legs.transform.Find("leftLeg").gameObject;
    rightLeg = legs.transform.Find("rightLeg").gameObject;
}

function FixedUpdate ()
{

	if(playerNumber==0){
		return;
	}
	
	/*if( Time.frameCount%300==0){
	playerRigidbody.AddForce(new Vector3(100, 20, 20), ForceMode.Impulse);
	Debug.Log("jump");
	}
	return;
	*/
    // Store the input axes.
    var h : float;
    var v : float;
    var hV : float;
    var vV : float;
    var jumpButtonPressed : boolean;

    if(playerRigidbody.velocity.magnitude > playerMaxVelocity.magnitude&&!isJumping) {
		var yVel = playerRigidbody.velocity.y;     
    	playerRigidbody.velocity *= 0.5;
       playerRigidbody.velocity.y = yVel;
      
    }


    // Debug.Log('isJumping : ' + isJumping + 'PlayerNumber: ' + playerNumber);
    // Debug.Log('isFallen : ' + isFallen + 'PlayerNumber: ' + playerNumber);
    // Debug.Log('playerCollider.isHit : ' + playerCollider.isHit + 'PlayerNumber: ' + playerNumber);
    // Debug.Log('playerCollider.occupied: ' + playerCollider.occupied+ 'PlayerNumber: ' + playerNumber);

	UpdateGameController (); //Check if controller should be changed


  if(currentGameController == "Keyboard"){
    h = Input.GetAxisRaw ("Horizontal");
    v = Input.GetAxisRaw ("Vertical");

    hV = Input.GetAxisRaw ("Horizontal2");
    vV = Input.GetAxisRaw ("Vertical2");

	dragButton = Input.GetKey(KeyCode.E);
	riseButtonDown = Input.GetKey(KeyCode.R);
	jumpButtonDown = Input.GetKey(KeyCode.Q);

  }
  else {
    h = Input.GetAxisRaw ("LeftJoystickX"+playerNumber);
    v = Input.GetAxisRaw ("LeftJoystickY"+playerNumber);
  }

  if(currentGameController == "PS3OSX"){


		hV = Input.GetAxisRaw ("RightJoystickXOSX"+playerNumber);
    vV = Input.GetAxisRaw ("RightJoystickYOSX"+playerNumber);

    dragButton = Input.GetButton('PS3LeftBumperOSX'+playerNumber);
		riseButtonDown = Input.GetButtonUp('PS3AButtonOSX'+playerNumber);

		jumpButtonPressed =  Input.GetButtonUp('PS3RightBumperOSX'+playerNumber);
    jumpButtonDown = Input.GetButton('PS3RightBumperOSX'+playerNumber);


  }
  else if (currentGameController == "X360OSX"){
		hV  = Input.GetAxisRaw ("RightJoystickXOSX"+playerNumber);
  	vV  = Input.GetAxisRaw ("RightJoystickYOSX"+playerNumber);

  	dragButton = Input.GetButton('360LeftBumperOSX'+playerNumber);

	riseButtonDown = Input.GetButtonUp('X360AButtonOSX'+playerNumber);
	jumpButtonDown = Input.GetButton('360RightBumperOSX'+playerNumber);

  } //Check if the game is running on PC with Xbox360 controller
  else if (currentGameController == "X360PC"){
    hV  = Input.GetAxisRaw ("360RightJoystickXPC"+playerNumber);
    vV  = Input.GetAxisRaw ("360RightJoystickYPC"+playerNumber);

  	dragButton = Input.GetButton('360LeftBumperPC'+playerNumber);
		riseButtonDown = Input.GetButtonUp('X360AButtonPC'+playerNumber);
		jumpButtonDown = Input.GetButton('360RightBumperPC'+playerNumber);

    	//leftBumperPressed = Input.GetButtonDown('360LeftBumperPC'+playerNumber);
    	//rightBumperPressed = Input.GetButtonDown('360RightBumperPC'+playerNumber);

  }

    var shouldMove = false;

    if(!isMoving){

      if(leftArm.transform.position.x > rightArm.transform.position.x){
        shouldInvert = true;
      } else {
        shouldInvert = false;
      }

    }

    if(h != 0 || v != 0) {
        shouldMove = true;


        if(shouldInvert) {
          rightArmMovement.Set(h, 0f, v);
          AnimateArm(rightArmMovement, rightArm, rightArmOriginalScale);
          //AnimateHand(rightArmMovement, rightHand, rightHandOriginalScale);
        }
        else {
          leftArmMovement.Set(h, 0f, v);
          AnimateArm(leftArmMovement, leftArm, leftArmOriginalScale);
          //AnimateHand(leftArmMovement, leftHand, leftHandOriginalScale);
        }

    } else {
      if(shouldInvert) {
        rightArm.transform.localScale.y = rightArmOriginalScale.y;
        //rightHand.transform.localScale.x = rightHandOriginalScale.x;
      } else {
        leftArm.transform.localScale.y = leftArmOriginalScale.y;
        //leftHand.transform.localScale.x = leftHandOriginalScale.x;
      }

    }

    if(hV != 0 || vV != 0) {
        shouldMove = true;

        if(shouldInvert) {
          leftArmMovement.Set(hV, 0f, vV);
          AnimateArm(leftArmMovement, leftArm, leftArmOriginalScale);
          //AnimateHand(leftArmMovement, leftHand, leftHandOriginalScale);
        }
        else {
          rightArmMovement.Set(hV, 0f, vV);

          AnimateArm(rightArmMovement, rightArm, rightArmOriginalScale);
          //AnimateHand(rightArmMovement, rightHand, rightHandOriginalScale);
        }
    } else {
      if(shouldInvert) {
        leftArm.transform.localScale.y = rightArmOriginalScale.y;
        //leftHand.transform.localScale.x = leftHandOriginalScale.x;
      } else {
        rightArm.transform.localScale.y = rightArmOriginalScale.y;
        //rightHand.transform.localScale.x = rightHandOriginalScale.x;
      }
    }



    if(!shouldMove) {
      isMoving = false;
    }

    if(shouldMove && !playerCollider.isHit && !playerCollider.occupied){
      playerRigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;
      AnimateLegs(h, v, hV, vV);
    }
    else if(!playerCollider.isHit&&!playerCollider.occupied&&playerCollider.onGround&&!isJumping){
      playerRigidbody.constraints =  RigidbodyConstraints.FreezeAll;
	 } else {
      playerRigidbody.constraints = RigidbodyConstraints.None;
	 }

      playerRigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;

    if(playerCollider.onGround&&playerRigidbody.velocity.y<=0){
    	isJumping = false;
    	numberOfJumps = 0;
    }

    if(numberOfJumps>0&&!playerCollider.onGround){
    	isJumping = true;
    }



    if(isJumping || isFallen || playerCollider.isHit || playerCollider.occupied){
    	playerRigidbody.constraints =  RigidbodyConstraints.None;
    }
    else {
    	playerBody.transform.rotation.x = 0;
    	playerBody.transform.rotation.z = 0;
    }

    if(jumpButtonDown&&!isFallen){

    	jumpFwdForce += Time.deltaTime;
    	if(jumpFwdForce>1){
    		jumpFwdForce = 5;
    		//leftHand.transform.position = transform.forward;
    		//leftArm.transform.position  = transform.forward;
    		Debug.Log("Fully charged");
    		this.transform.Find("body").gameObject.transform.localScale.y = bodySize*0.8f;
    	}
    }


    if(!jumpButtonDown && jumpFwdForce>0 && !isFallen){
    	Jump();
    }

    if(playerRigidbody.velocity.y>jumpForce){
	  playerRigidbody.velocity.y = jumpForce;
    }


    if (h == 0 && v == 0 && hV == 0 && vV == 0){
  		leftLeg.transform.rotation = Quaternion.Euler(0, 0, 0);
  		rightLeg.transform.rotation = Quaternion.Euler(0, 0, 0);
  	}

	if(isFallen){
		if(riseButtonDown){
			if(Mathf.Abs(playerBody.transform.rotation.x) > Mathf.Abs(playerBody.transform.rotation.z)){
				if(playerBody.transform.rotation.x > 0) { playerBody.transform.rotation.x = playerBody.transform.rotation.x - 0.22; }
				else { playerBody.transform.rotation.x = playerBody.transform.rotation.x + 0.22;
				}
			} else {
				if(playerBody.transform.rotation.z > 0) { playerBody.transform.rotation.z = playerBody.transform.rotation.z - 0.22; }
				else { playerBody.transform.rotation.z = playerBody.transform.rotation.z + 0.22;
				}
			}
		}
		jumpFwdForce = 0;
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


function AnimateArm (movement : Vector3, armObject: GameObject, originalScale: Vector3) {
  
  
  isMoving = (movement.sqrMagnitude > 0.95);


  var forceVector = isFallen ? 2.5f : (isMoving ? 1.5f : 0.5f);
  
  if(isJumping){
  	forceVector = 0.25f;
  }
  
  armObject.rigidbody.AddForce(movement*forceVector, ForceMode.Impulse);

  movement.x = Mathf.Min(movement.x, 0.75f);
  movement.z = Mathf.Min(movement.z, 0.75f);

  //Om vi vill ha en ekvation mellan 0 - 1
  //http://www.wolframalpha.com/input/?i=-%28%282x+-1%29%5E2+%29+%2B+1

  armObject.transform.localScale.y = originalScale.y + originalScale.y * movement.magnitude*3;


}

function AnimateHand (movement : Vector3, handObject: GameObject, originalScale : Vector3) {
  handObject.transform.localScale.x = originalScale.x - originalScale.x * movement.magnitude*0.65;
}

function AnimateLegs(h : float, v : float, hV : float, vV : float) {
  //get rigidbody velocity vector
  movement = playerRigidbody.velocity;
  //remove velocity in y axis
  //leftArmMovement.y = 0f;

  //find the forward rotation based on this and rotate parent leg object towards this vector
  newRotation = Quaternion.LookRotation(movement);
  legs.transform.rotation=newRotation;

  //also use sin function to rotate legs and apply same rotation to them.
  leftLeg.transform.rotation = newRotation * Quaternion.Euler(-Mathf.Sin(Time.realtimeSinceStartup*10) * 50, 0, 0);
  rightLeg.transform.rotation = newRotation * Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup*10) * 50, 0, 0);
}

function Jump(){

  if(playerCollider.onGround){
    numberOfJumps = 0;
  }


  if(numberOfJumps<2){
    var jumpVector : Vector3 = new Vector3(0f, jumpForce*Mathf.Max(jumpFwdForce, 1), 0f);
    var jumpVectorFWD : Vector3 = playerBody.transform.forward*jumpFwdForce*7f;
	Debug.Log(jumpFwdForce);
    playerBody.transform.position.y+=1f;
   	playerRigidbody.AddForce(jumpVector+jumpVectorFWD, ForceMode.Impulse);
    //playerRigidbody.velocity = jumpVector+jumpVectorFWD;
    playerRigidbody.constraints = RigidbodyConstraints.None;

    numberOfJumps++;
    isJumping = true;
  }

  jumpFwdForce = 0;
  this.transform.Find("body").gameObject.transform.localScale.y = bodySize;
}
