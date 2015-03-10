import UnityEngine;
import System;

private var rotationAmount : float = 0.01;
public var burst : GameObject;
static var player : Collider;
private var tempPlayer : Collider;

function Awake(){
	transform.Rotate(Vector3(0, 0, 25));
	//ADD SPEED HERE
}
function Update () {
	if (player != null){
	transform.position = Vector3(player.gameObject.transform.position.x, player.gameObject.transform.position.y+5.5, player.gameObject.transform.position.z+0.5);
	tempPlayer = player;
	}
	else{
		transform.position = Vector3(tempPlayer.gameObject.transform.position.x, tempPlayer.gameObject.transform.position.y+5.5, tempPlayer.gameObject.transform.position.z+0.5);
	}
	rotationAmount += 5;
	transform.Rotate(Vector3(0,rotationAmount*Time.deltaTime,0));
	if(rotationAmount >= 1000){
		Instantiate(burst, transform.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}