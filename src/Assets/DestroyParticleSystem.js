#pragma strict

private var timer: float = 3; 
private var radius = 50.0;
private	var power = 700.0;
 
function Start(){
	// Applies an explosion force to all nearby rigidbodies
	var explosionPos : Vector3 = transform.position;
	var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
	for (var hit : Collider in colliders) {
		if (hit && hit.rigidbody){
			hit.rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
			hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
		}
	}
}

function Update() {
	timer -= Time.deltaTime;
    if(timer <= 0){
    	Destroy(gameObject);
	}
}