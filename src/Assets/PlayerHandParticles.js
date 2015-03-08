
#pragma strict

function OnCollisionEnter( col : Collision ){

	if(col.collider.transform.root.name=="SpawnedChunks") return;
	if(col.collider.transform.root.name == gameObject.transform.root.name) return;

	if(col.relativeVelocity.magnitude > 3){
			//Debug.Log(transform.gameObject.name);
			transform.gameObject.particleSystem.enableEmission = true;
			transform.gameObject.particleSystem.startSpeed = col.relativeVelocity.magnitude*0.15;
			transform.gameObject.particleSystem.startSize = col.relativeVelocity.magnitude*0.05;
			transform.gameObject.particleSystem.Play();


		}

	}
