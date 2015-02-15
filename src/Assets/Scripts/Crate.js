#pragma strict

public var tinySkeleton : GameObject;
private var timer: float = 30;

//Transforms & Rotates the crate 
function Update () {
	transform.Rotate(new Vector3(15, 30,45) * Time.deltaTime);
//	if (transform.position.y < 20 && transform.position.y > 1){
//		transform.position.y -= 0.05;
//	}
//	else if(transform.position.y > 1){
//		transform.position.y -= 0.2;
//	}
	OldCrate();
//	this.renderer.material.color.a = 1.0f;
}

//Removes crate after 'x' amount of time
function OldCrate(){
	timer -= Time.deltaTime;
	if (timer <= 0){
		DestroyCrate();
	}
}

//The crate is destroyed, the crate count decreases
function DestroyCrate(){
	Destroy(this.gameObject);
	spawnCrates.nbrOfCrates --;
}

//When player picks up the crate the content is instantiated 
function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		DestroyCrate();
		Instantiate (tinySkeleton, transform.position, Quaternion.identity);
	}
}