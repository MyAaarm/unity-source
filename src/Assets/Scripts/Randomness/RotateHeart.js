import UnityEngine;
import System;

private var rotationAmount : float = 0.01;
public var burst : GameObject;
static var player : Collider;
private var tempPlayer : Collider;

function Awake(){
	transform.Rotate(Vector3(-90, 0, 0));
	player.transform.root.gameObject.GetComponent(PlayerHealth).TakeDamage(-70);
}
function Update () {
	if(player != null){
	transform.position = Vector3(player.gameObject.transform.position.x, player.gameObject.transform.position.y+5, player.gameObject.transform.position.z);
	}
	else{
		Destroy(this.gameObject);
	}
	rotationAmount += 5;
	transform.Rotate(Vector3(0,0,rotationAmount*Time.deltaTime));
	if(rotationAmount >= 1000){
		Instantiate(burst, transform.position, Quaternion.identity);
		Destroy(this.gameObject);
	}
}