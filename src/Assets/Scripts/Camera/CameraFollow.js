#pragma strict

var target1 : Transform;         
var target2 : Transform;            // The position that that camera will be following.
var cameraSpeed : float = 5f;        // The speed with which the camera will be following.
var height : float = 10f;
                  

function FixedUpdate ()
{	
	var centerPoint = (target1.position + target2.position)/2;
	
	var distance = Vector3.Distance(target1.position, target2.position);
	
	height = Mathf.Lerp(height,distance,Time.deltaTime*cameraSpeed);
	if(height <5f){
		height = 5f;
	}
	
	transform.position.x = centerPoint.x ;
 
	transform.position.z = centerPoint.z - distance;

	transform.position.y = height;
	
	
	
	transform.LookAt(centerPoint);	

}