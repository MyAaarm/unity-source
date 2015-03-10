#pragma strict

private var timer: float = 3;
private var radius = 10.0;
private	var power = 10000.0;
private var playerCollider : Collider;

function Start(){
	// Applies an explosion force to all nearby rigidbodies
	var explosionPos : Vector3 = transform.position;

	  this.transform.gameObject.particleSystem.enableEmission = true;
      this.transform.gameObject.particleSystem.Play();

      var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
		for (var hit : Collider in colliders) {
			if (hit && hit.rigidbody && hit.transform.root.tag == "Player"){
					playerCollider = hit;
					hit.rigidbody.constraints = RigidbodyConstraints.None;
					hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
					hit.transform.root.transform.Find("body").GetComponent(PlayerCollider).isHit = true;
		}
	}

	var ums = GameObject.Find( "CraterController" );
	ums.BroadcastMessage( "handleOuterImpacts", transform.position );
}

function Update() {
	timer -= Time.deltaTime;
    if(timer <= 0){
    	if(playerCollider != null) playerCollider.transform.root.transform.Find("body").GetComponent(PlayerCollider).isHit = false;
    	Destroy(gameObject);
	}
}