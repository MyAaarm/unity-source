var speed : float = 6f;            // The speed that the player will move at.

private var movement : Vector3;                   // The vector to store the direction of the player's movement.
private var anim : Animator;                      // Reference to the animator component.
private var playerRigidbody : Rigidbody;          // Reference to the player's rigidbody.
private var floorMask : int;                      // A layer mask so that a ray can be cast just at gameobjects on the floor layer.
private var camRayLength : float = 100f;          // The length of the ray from the camera into the scene.


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
    var h : float = Input.GetAxisRaw ("Horizontal");
    var v : float = Input.GetAxisRaw ("Vertical");
	
	var hV : float = Input.GetAxisRaw ("Horizontal2");
    var vV : float = Input.GetAxisRaw ("Vertical2");
	
    // Move the player around the scene.
    Move (h, v);

    // Turn the player to face the mouse cursor.    
    Turning (hV, vV);    

    // Animate the player.
    Animating (h, v);
}


function Move (h : float, v : float)
{
    // Set the movement vector based on the axis input.
    movement.Set (h, 0f, v);
    
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
    movement = movement.normalized * speed * Time.deltaTime;
	
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