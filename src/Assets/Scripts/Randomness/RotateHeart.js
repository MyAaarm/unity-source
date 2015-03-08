import UnityEngine;
import System;

private var rotationAmount : float = 0.01;
public var burst : GameObject;
static var player : Collider;

function Awake(){
	transform.Rotate(Vector3(-90, 0, 0));
	//ADD SPEED HERE
}
function Update () { 
	transform.position = Vector3(player.gameObject.transform.position.x, player.gameObject.transform.position.y+7, player.gameObject.transform.position.z);
	//transform.position = Vector3(20, 20, 20));
	rotationAmount += 5;
	transform.Rotate(Vector3(0,0,rotationAmount*Time.deltaTime));
	if(rotationAmount >= 1000){
		Instantiate(burst, transform.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}