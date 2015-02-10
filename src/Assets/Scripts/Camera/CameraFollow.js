#pragma strict

var target1 : Transform;         
var target2 : Transform;            // The position that that camera will be following.
var cameraSpeed : float = 5f;        // The speed with which the camera will be following.
var height : float = 10f;
var zOffset : float = 20f;                 

function FixedUpdate ()
{	
	var centerPoint = (target1.position + target2.position)/2;
	
	var distance = Vector3.Distance(target1.position, target2.position);
	
	var newHeight = distance;
	if(newHeight <5f){
		newHeight = 5f;
 	}
	height = Mathf.Lerp(height,newHeight,Time.deltaTime*cameraSpeed);
	
	var newZOffset = Mathf.Log(distance)*6;
	if(newZOffset<8f){
		newZOffset = 8f;
 	}
	zOffset = Mathf.Lerp(zOffset,newZOffset,Time.deltaTime*cameraSpeed);
	
	transform.position.x = centerPoint.x ;
 
	transform.position.z = centerPoint.z - zOffset;

	transform.position.y = height;
	
	
	
	transform.LookAt(centerPoint);	

}