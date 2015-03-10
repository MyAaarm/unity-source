#pragma strict

var cameraSpeed : float = 1f;        // The speed with which the camera will be following.
var height : float = 10f;
var zOffset : float = 20f;  

private var targets : GameObject[];
private var largestDistance : float;

function FixedUpdate ()
{	
	targets = GameObject.FindGameObjectsWithTag("body"); 
	
	if (!GameObject.FindWithTag("body")){ //If no Players are left on the battlefield
 		return;	//Maybe the camera should focus on something else here?
	}
	
	var sum = Vector3(0,0,0);

	for (var n = 0; n < targets.length ; n++){

		sum += targets[n].transform.position;

	}
	
	var avgDistance = sum / targets.length;
	
		
	var largestDifference = returnLargestDifference();
								
	var newHeight = largestDifference;
	
	if(newHeight <20f){
		newHeight = 20f;
 	}
	height = Mathf.Lerp(height,newHeight,Time.deltaTime*cameraSpeed);
	
	var newZOffset = Mathf.Log(largestDifference)*8;
	if(newZOffset<30f){
		newZOffset = 30f;
 	}
	zOffset = Mathf.Lerp(zOffset,newZOffset,Time.deltaTime*cameraSpeed);
	
	var newXpos : float = Mathf.Lerp(transform.position.x, avgDistance.x, Time.deltaTime*cameraSpeed);
	
	var newZpos : float = Mathf.Lerp(transform.position.z, avgDistance.z  - zOffset, Time.deltaTime*cameraSpeed);
				
	transform.position.x = newXpos;
 
	transform.position.z = newZpos;

	transform.position.y = height;
	
	var oldRot : Quaternion = transform.rotation ;
	var lookAtVector = avgDistance;
	lookAtVector.z *= 1f;
	transform.LookAt (lookAtVector) ;
	var newRot : Quaternion = transform.rotation ;
	transform.rotation = Quaternion.Lerp ( oldRot , newRot, Time.deltaTime*cameraSpeed ) ;
	
}

function returnLargestDifference(){
	
	var currentDistance = 0.0;

	largestDistance = 0.0;

	for(var i = 0; i < targets.length; i++){

		for(var j = 0; j <  targets.length; j++){

			currentDistance = Vector3.Distance(targets[i].transform.position,targets[j].transform.position);

			if(currentDistance > largestDistance){

				largestDistance = currentDistance;

			}

		}

	}

	return largestDistance;
	
}