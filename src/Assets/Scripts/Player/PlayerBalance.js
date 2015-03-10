#pragma strict

private var playerMovement: PlayerMovement;

function Start () {
  playerMovement = GetComponentInParent(PlayerMovement);
}


function FixedUpdate() {
	if(Mathf.Abs(this.transform.rotation.x) > 0.35 || Mathf.Abs(this.transform.rotation.z) > 0.35){
		playerMovement.isFallen = true;
    this.transform.rotation.x *= 0.95;
    this.transform.rotation.z *= 0.95;
	}


  if(Mathf.Abs(this.transform.rotation.x) < 0.1 && Mathf.Abs(this.transform.rotation.z) < 0.1){
    playerMovement.isFallen = false;
  }

}