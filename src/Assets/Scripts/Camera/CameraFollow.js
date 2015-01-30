#pragma strict

var target1 : Transform;         
var target2 : Transform;            // The position that that camera will be following.
var smoothing : float = 5f;        // The speed with which the camera will be following.
var height : float = 10f;

private var offset : Vector3;                     // The initial offset from the target.

function Start ()
{
    // Calculate the initial offset.
    offset = transform.position - (target1.position + target2.position)/2;
}


function FixedUpdate ()
{	
	var centerPoint = (target1.position + target2.position)/2;
	
	var distance = Vector3.Distance(target1.position, target2.position);
	
	height = Mathf.Lerp(height,distance,Time.deltaTime);
	if(height <5f){
		height = 5f;
	}
	
	transform.position.x = centerPoint.x ;
 
	transform.position.z = centerPoint.z - distance;

	transform.position.y = height;
	
	
	
	transform.LookAt(centerPoint);
	
	
    // Create a postion the camera is aiming for based on the offset from the target.
   // var targetCamPos : Vector3 = (target1.position + target2.position)/2 + offset;

    // Smoothly interpolate between the camera's current position and it's target position.
   // transform.position = Vector3.Lerp (transform.position, targetCamPos, smoothing * Time.deltaTime);
}