#pragma strict
private var timer: float = 3; 

function Update () {
	if (timer <= 0){
		Destroy(this.gameObject);
	}
	timer -= Time.deltaTime;
}