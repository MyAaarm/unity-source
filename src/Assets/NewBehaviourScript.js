
#pragma strict

function OnCollisionEnter( col : Collision ){
	
	if(col.collider.transform.root.name != gameObject.transform.root.name){
			Debug.Log(transform.gameObject.name);
			transform.gameObject.particleSystem.enableEmission = true; 
			transform.gameObject.particleSystem.Play();
			
		}

	}
