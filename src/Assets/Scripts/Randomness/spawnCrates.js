#pragma strict

public var Crate : GameObject;
private var timer: float;
public var crateSpawnHeight : float;
public var timeOk : boolean;
static var nbrOfCrates : float = 0;

function Update () {
	setTimer();
//	Debug.Log();
}

function setTimer(){
	if (nbrOfCrates == 0){ //If no crates available - count down the timer
		timer -= Time.deltaTime;
		if(timer <= 0){
			timeOk = Time.realtimeSinceStartup > 2; //To not spawn crates directly
			timer = Random.Range(1, 5); //Crate spawn-timer (between 60 and 90 sec)
			spawnCrate(timeOk);
		}
	}
}
//Spawns crates and increases the crate count (no more than 1 at a time)
function spawnCrate(timeOk : boolean){
	if (timeOk && nbrOfCrates == 0){
		Instantiate (Crate, Vector3(Random.Range(1, 15), crateSpawnHeight, Random.Range(1, 15)), Quaternion.identity);
		nbrOfCrates ++;
	}
}