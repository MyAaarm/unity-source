#pragma strict

var startingHealth : int = 10;                             // The amount of health the player starts the game with.

public var currentHealth : int;                                    // The current health the player has.
public var isDead : boolean;                                                // Whether the player is dead.

private var damaged : boolean;                                               // True when the player gets damaged.

private var GameController:GameController;

function Awake () {
  // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
  currentHealth = startingHealth;
}

function Start () {
  // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
  GameController = GetComponent('GameController');
}


function Update () {
  // If the player has just been damaged...
  if(damaged) {
      //Make player look damaged
  }
  // Otherwise...
  else {
  	//Make player look not damaged (duh)
  }

  // Reset the damaged flag.
  damaged = false;
}


public function TakeDamage (amount : int) {
  if(isDead) {
    return;
  }
  // Set the damaged flag
  damaged = true;

  // Reduce the current health by the damage amount.
  currentHealth -= amount;

  // If the player has lost all it's health and the death flag hasn't been set yet...
  if(currentHealth <= 0) {
    // ... it should die a horrible horrible (and possibly humiliating) death.
    Death ();
  }
  else {
    GameController.PlayerHurt(this);
  }
  //Debug.Log("Damage taken, Current health for " + this.name + ": "+ currentHealth);


}


function Death () {
  // Set the death flag so this function won't be called again (you wouldn't want to die twice would you?).
  var rigidBody = this.GetComponent(Rigidbody);

  isDead = true;
  GameController.PlayerDied(this);
  //lets make the body fly around!
  rigidBody.constraints = RigidbodyConstraints.None;
  yield WaitForSeconds(0.1);
  rigidbody.AddForce(100000, 1000, 5000);
  rigidbody.AddTorque (0, 1000, 0);
  yield WaitForSeconds(0.5);
  rigidbody.AddForce(100000, 1000, 5000);


}