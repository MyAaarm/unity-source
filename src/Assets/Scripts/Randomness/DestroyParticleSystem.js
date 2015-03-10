#pragma strict

private var timer: float = 3;
private var radius = 10.0;
private	var power = 10000.0;

function Start(){
	// Applies an explosion force to all nearby rigidbodies
	var explosionPos : Vector3 = transform.position;
	var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
	for (var hit : Collider in colliders) {
		if (hit && hit.rigidbody){
			hit.rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
			hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
			var playerHealth = hit.transform.root.gameObject.GetComponent(PlayerHealth);

			if(playerHealth != null) {
				playerHealth.TakeDamage(2 * Vector3.Distance(transform.position, hit.gameObject.transform.position));
			}
		}
	}
	var ums = GameObject.Find( "CraterController" );
	ums.BroadcastMessage( "handleOuterImpacts", transform.position );
}

function Update() {
	timer -= Time.deltaTime;
    if(timer <= 0){
    	Destroy(gameObject);
	}
}