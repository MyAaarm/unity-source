#pragma strict

private var timer: float = 3; 
 
function Update() {
	timer -= Time.deltaTime;
    if(timer <= 0){
    	Destroy(gameObject);
	}
}