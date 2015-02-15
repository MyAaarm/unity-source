var speed : float = 6f;            // The speed that the player will move at.
var playerNumber : int;
var currentGameController : String;

private var movement : Vector3;                   // The vector to store the direction of the player's movement.
private var anim : Animator;                      // Reference to the animator component.
private var playerRigidbody : Rigidbody;          // Reference to the player's rigidbody.
private var floorMask : int;                      // A layer mask so that a ray can be cast just at gameobjects on the floor layer.
private var camRayLength : float = 100f;          // The length of the ray from the camera into the scene.

private var isOSX : boolean = Application.platform == RuntimePlatform.OSXEditor || Application.platform == RuntimePlatform.OSXPlayer || Application.platform == RuntimePlatform.OSXWebPlayer;

function Awake ()
{
    // Create a layer mask for the floor layer.
    floorMask = LayerMask.GetMask ("Floor");

    // Set up references.
    anim = GetComponent (Animator);
    playerRigidbody = GetComponent (Rigidbody);
}


function FixedUpdate ()
{
    // Store the input axes.
    var h : float;
    var v : float;
    var hV : float;
    var vV : float;

	UpdateGameController (); //Check if controller should be changed
	
	if(currentGameController == "Keyboard"){

		h = Input.GetAxisRaw ("Horizontal");
		v = Input.GetAxisRaw ("Vertical");

		hV = Input.GetAxisRaw ("Horizontal2");
		vV = Input.GetAxisRaw ("Vertical2");
		
	
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
    }

    // Move the player around the scene.
    Move (h, v);

    // Turn the player to face the mouse cursor.

    if(hV != 0 || vV != 0) {
        Turning (hV, vV);
    }

    // Animate the player.
    Animating (h, v);
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


function Move (h : float, v : float)
{
    // Set the movement vector based on the axis input.
    movement.Set(h, 0f, v);

    // Normalise the movement vector and make it proportional to the speed per second.
    movement = movement.normalized * speed * Time.deltaTime;

    // Move the player to it's current position plus the movement.
    playerRigidbody.MovePosition (transform.position + movement);
}


function Turning (hV : float, vV : float)
{

     // Set the movement vector based on the axis input.
    movement.Set (hV, 0f, vV);

    // Normalise the movement vector and make it proportional to the speed per second.
    movement = movement.normalized * 0.01 * Time.deltaTime;

	var newRotation : Quaternion = Quaternion.LookRotation (movement);

    // Move the player to it's current position plus the movement.
    playerRigidbody.MoveRotation (newRotation);

}


function Animating (h : float, v : float)
{
    // Create a boolean that is true if either of the input axes is non-zero.
    var walking : boolean = h != 0f || v != 0f;

    // Tell the animator whether or not the player is walking.
    anim.SetBool ("IsWalking", walking);
}