#pragma strict
	
private var playerHealth : PlayerHealth;

	
function Awake (){
	playerHealth = GetComponent (PlayerHealth);
}	
	
function OnCollisionEnter( col : Collision ){

	if(col.collider.transform.parent != null && (col.collider.transform.parent.name == "Arms" || col.collider.transform.parent.name == "Hands")) {
		
		if(col.collider.transform.root.name != gameObject.name){		
			
			if(col.relativeVelocity.magnitude>6){
				playerHealth.TakeDamage(col.relativeVelocity.magnitude*.5);
			}
			
			
		}
		
	}
	
	
}