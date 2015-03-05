#pragma strict

function FixedUpdate() {
	if(Mathf.Abs(this.transform.rotation.x) > 0.3 || Mathf.Abs(this.transform.rotation.z) > 0.3){
		this.GetComponent(PlayerMovement).isFallen = true;
	} else {
		this.GetComponent(PlayerMovement).isFallen = false;
	}
}