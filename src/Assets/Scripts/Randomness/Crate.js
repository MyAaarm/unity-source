#pragma strict

public var explosion : GameObject;
private var timer: float = 30;

//Transforms & Rotates the crate 
function Update () {
	transform.Rotate(new Vector3(15, 30,45) * Time.deltaTime);
	OldCrate();
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
		//Instantiate (judge, transform.position, Quaternion.identity);
		Instantiate (explosion, transform.position, Quaternion.identity);
	}
}