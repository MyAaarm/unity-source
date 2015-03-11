#pragma strict

static var player : Collider;
private var tempPlayer : Collider;
private var timer : float = 15;
private var playerFallen : boolean;

function Start () {
	player.gameObject.rigidbody.mass = 2.5;
	transform.Rotate(Vector3(180, 0, 0));
	playerFallen = false;
}

function Update () {
	if (player != null && !player.gameObject.GetComponentInParent(PlayerMovement).isFallen && !playerFallen){
	transform.position = Vector3(player.gameObject.transform.position.x, player.gameObject.transform.position.y+3, player.gameObject.transform.position.z);
	tempPlayer = player;
	}
	else if(player == null){
		Destroy(this.gameObject);
	}
	else if(player.gameObject.GetComponentInParent(PlayerMovement).isFallen && !playerFallen){
		gameObject.collider.enabled = true;
		playerFallen = true;
		transform.position = Vector3(transform.position.x, 10, transform.position.z);
	}
	if(playerFallen && player != null){
		player.gameObject.rigidbody.mass = 1;
	}
	if(timer <= 0){
			Destroy(this.gameObject);
			player.gameObject.rigidbody.mass = 1;
		}
	timer -= Time.deltaTime;
}