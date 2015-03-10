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

      Instantiate (explosion, transform.position, Quaternion.identity);
      Destroy(this.gameObject);
    }
  }

  else if(col.collider.transform.root.name=="SpawnedChunks" || col.collider.transform.root.name=="Floor"){
    var ums = GameObject.Find( "CraterController" );

    Instantiate (explosion, transform.position, Quaternion.identity);
    ums.BroadcastMessage( "handleOuterImpacts", col.contacts[0].point);

    Destroy(this.gameObject);
  }
}