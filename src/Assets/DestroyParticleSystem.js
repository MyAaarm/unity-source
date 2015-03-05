﻿#pragma strict

private var timer: float = 3; 
private var radius = 10.0;
private	var power = 1500.0;
 
function Start(){
	// Applies an explosion force to all nearby rigidbodies
	var explosionPos : Vector3 = transform.position;
	var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
	for (var hit : Collider in colliders) {
		if (hit && hit.rigidbody){
			hit.rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
			hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
			hit.transform.root.gameObject.GetComponent(PlayerHealth).TakeDamage(10);
		}
	}
}

function Update() {
	timer -= Time.deltaTime;
    if(timer <= 0){
    	Destroy(gameObject);
	}
}