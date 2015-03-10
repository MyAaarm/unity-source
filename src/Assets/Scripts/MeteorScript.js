#pragma strict

public var explosion : GameObject;
private var timer: float = 30;

//Transforms & Rotates the crate
function Update () {
  transform.Rotate(new Vector3(0, 30,0) * Time.deltaTime);
}

//When player picks up the crate the content is instantiated
function OnTriggerEnter (other : Collider) {
  if(other.collider.name=="DespawnPlane") {
    transform.position.y = 75;
  }

}

function OnCollisionEnter( col : Collision ){
  if(col.transform.root.gameObject.name.Contains('Player')){
    var playerHealth = col.transform.root.gameObject.GetComponent(PlayerHealth);
    if(playerHealth != null) {
      playerHealth.TakeDamage(50);

      //Instantiate (explosion, transform.position, Quaternion.identity);
      var ums = GameObject.Find("BlockHandler");
      ums.BroadcastMessage( "meteorExplosion", transform.position );
	  var pX : Vector3 = transform.position;
	  pX.x += 1;
	  ums.BroadcastMessage( "meteorExplosion", pX);
	  pX.x += -1;
      pX.y += 1;
	  ums.BroadcastMessage( "meteorExplosion", pX);
	  pX.x += 1;
      pX.y += -1;
	  ums.BroadcastMessage( "meteorExplosion", pX);
      pX.y += 1;
	  pX.z += -1;
      ums.BroadcastMessage( "meteorExplosion", pX);
	  pX.z += -2;
      ums.BroadcastMessage( "meteorExplosion", pX);
      Instantiate (explosion, transform.position, Quaternion.identity);
      Destroy(this.gameObject);
    }
  }

  else if(col.collider.transform.root.name=="SpawnedChunks" || col.collider.transform.root.name=="Floor"){
      var pms = GameObject.Find("BlockHandler");
	  pms.BroadcastMessage( "meteorExplosion", transform.position );
	  var vX : Vector3 = transform.position;
	  vX.x += 1;
	  pms.BroadcastMessage( "meteorExplosion", vX);
	  vX.x += -1;
      vX.y += 1;
	  pms.BroadcastMessage( "meteorExplosion", vX);
	  vX.x += 1;
      vX.y += -1;
	  pms.BroadcastMessage( "meteorExplosion", vX);
      vX.y += 1;
	  vX.z += -1;
      pms.BroadcastMessage( "meteorExplosion", vX);
	  vX.z += -2;
      pms.BroadcastMessage( "meteorExplosion", vX);
      Instantiate (explosion, transform.position, Quaternion.identity);
      Destroy(this.gameObject);
  }
}