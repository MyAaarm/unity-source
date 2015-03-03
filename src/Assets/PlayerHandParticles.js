
#pragma strict

function OnCollisionEnter( col : Collision ){
	
	if(col.collider.transform.root.name != gameObject.transform.root.name && col.relativeVelocity.magnitude > 100){
			Debug.Log(transform.gameObject.name);
			transform.gameObject.particleSystem.enableEmission = true; 
			transform.gameObject.particleSystem.startSpeed = col.relativeVelocity.magnitude*0.025;
			transform.gameObject.particleSystem.startSize = col.relativeVelocity.magnitude*0.008;
			transform.gameObject.particleSystem.Play();
			
			
		}

	}
