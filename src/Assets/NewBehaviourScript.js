
#pragma strict

function OnCollisionEnter( col : Collision ){
	
	if(col.collider.transform.root.name != gameObject.transform.root.name){
			Debug.Log(transform.gameObject.name);
			transform.gameObject.particleSystem.enableEmission = true; 
			transform.gameObject.particleSystem.startSpeed = col.relativeVelocity.magnitude*0.25;
			transform.gameObject.particleSystem.startSize = col.relativeVelocity.magnitude*0.08;
			transform.gameObject.particleSystem.Play();
			
			
		}

	}
