import UnityEngine;
import System;

private var rotationAmount : float = 0.01;
public var burst : GameObject;
static var player : Collider;

function Awake(){
	transform.Rotate(Vector3(0, 0, 25));
	//ADD SPEED HERE
}
function Update () { 
	transform.position = Vector3(player.gameObject.transform.position.x, player.gameObject.transform.position.y+8.5, player.gameObject.transform.position.z+0.5);
	//transform.position = Vector3(20, 20, 20));
	rotationAmount += 5;
	transform.Rotate(Vector3(0,rotationAmount*Time.deltaTime,0));
	if(rotationAmount >= 1000){
		Instantiate(burst, transform.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}