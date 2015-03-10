#pragma strict

public var Meteor : GameObject;
private var timer: float;
public var meteorSpawnHeight : float;
public var timeOk : boolean;
static var nbrOfMeteors : float = 0;

function Update () {
  setTimer();
}

function setTimer(){
  if (nbrOfMeteors <= 0){ //If no crates available - count down the timer
    timer -= Time.deltaTime;
    if(timer <= 0){
      timeOk = Time.realtimeSinceStartup > 2; //To not spawn crates directly
      timer = Random.Range(1, 5); //Crate spawn-timer (between 60 and 90 sec)
      spawnMeteor(timeOk);
    }
  }
}
//Spawns crates and increases the crate count (no more than 1 at a time)
function spawnMeteor(timeOk : boolean){
  if (timeOk && nbrOfMeteors == 0){
    Instantiate (Meteor, Vector3(Random.Range(1, 10), meteorSpawnHeight, Random.Range(1, 10)), Quaternion.identity);
    nbrOfMeteors ++;
  }
}