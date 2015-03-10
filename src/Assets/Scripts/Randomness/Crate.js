#pragma strict

public var explosion : GameObject;
private var timer: float = 30;
public var heart : GameObject;
public var LightningBolt : GameObject;
public var weight : GameObject;
public var pan : GameObject;

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
}

//When player picks up the crate the content is instantiated 
function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player" || other.tag == "body"){
		DestroyCrate();
		var playerHealth = 100 - other.gameObject.GetComponent(PlayerHealth).currentHealth;
		if(playerHealth <= 40){
			playerHealth = 40;
		}
		var rand = Random.Range(0, 100);
		if (rand <= playerHealth){
			var rand2 = Random.Range(1, 4);
			switch(rand2){
				case 1:
					RotateHeart.player = other;
					Instantiate (heart, Vector3(other.transform.position.x, other.transform.position.y+2, other.transform.position.z), Quaternion.identity);
					break;
				case 2:
					RotateBolt.player = other;
					Instantiate (LightningBolt, Vector3(other.transform.position.x, other.transform.position.y+2, other.transform.position.z), Quaternion.identity);
					break;
				case 3:
					RotateWeight.player = other;
					Instantiate (weight, Vector3(other.transform.position.x, other.transform.position.y+2, other.transform.position.z), Quaternion.identity);
					break;
			}
		}
		else{
			var rand3 = Random.Range(1, 3);
			switch(rand3){
				case 1:
					Instantiate (explosion, transform.position, Quaternion.identity);
					break;
				case 2:
					PanScript.player = other;
					Instantiate (pan, transform.position, Quaternion.identity);
					break;
			}
		}	
	}
}