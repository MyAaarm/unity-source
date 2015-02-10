#pragma strict
	
private var playerHealth : PlayerHealth;

	
function Awake (){
	playerHealth = GetComponent (PlayerHealth);
}	
	
function OnCollisionEnter( col : Collision ){

	if(col.gameObject.tag=="Player") {
		
		var otherPlayerHealth = col.gameObject.GetComponent(PlayerHealth);
		Debug.Log(col.rigidbody.velocity.magnitude);
		
	}
	Debug.Log(col.gameObject.transform.parent.tag);
	
	
}