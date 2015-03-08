#pragma strict

private var movement : Vector3;                   // The vector to store the direction of the player's movement.
private var leftLeg : GameObject;
private var rightLeg : GameObject;
private var legs : GameObject;
private var newRotation : Quaternion;
//static var move : boolean;

function moveLegs(){//(h : float, v : float, hV : float, vV : float) {
  //get rigidbody velocity vector
  movement = rigidbody.velocity;
  //remove velocity in y axis
  movement.y = 0f;
  
    legs = this.transform.Find("Legs").gameObject;
    leftLeg = this.transform.Find("Legs/leftLeg").gameObject;
    rightLeg = this.transform.Find("Legs/rightLeg").gameObject;

  //find the forward rotation based on this and rotate parent leg object towards this vector  
  newRotation = Quaternion.LookRotation(movement);
  legs.transform.rotation=newRotation;

  //also use sin function to rotate legs and apply same rotation to them.
  leftLeg.transform.rotation = newRotation * Quaternion.Euler(-Mathf.Sin(Time.realtimeSinceStartup*10) * 50, 0, 0);
  rightLeg.transform.rotation = newRotation * Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup*10) * 50, 0, 0);
}
