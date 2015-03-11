#pragma strict

public var Crate : GameObject;
private var timer: float;
public var crateSpawnHeight : float;
public var timeOk : boolean;
static var nbrOfCrates : GameObject[];

function Start(){
	timer = Random.Range(2, 5);
	nbrOfCrates = null;
}

function Update () {
	setTimer();
}

function setTimer(){
	var nbrOfCrates = GameObject.FindGameObjectsWithTag("Crate");
	if (nbrOfCrates.Length <= 3){ //If no crates available - count down the timer
		timer -= Time.deltaTime;
		if(timer <= 0){
			timer = Random.Range(5, 10); //Crate spawn-timer (between 60 and 90 sec)
			if (nbrOfCrates.Length <= 3){
			Instantiate (Crate, Vector3(Random.Range(-35, 55), crateSpawnHeight, Random.Range(-85, 26)), Quaternion.identity);
			}
		}
	}
}
