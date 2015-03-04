#pragma strict

var startingHealth : int = 100;                             // The amount of health the player starts the game with.
var currentHealth : int;
var regenFactor : int = 2;                                  // The current health the player has.
var regenHealth : int = 30;

private var isDead : boolean;                                                // Whether the player is dead.
private var damaged : boolean;
private var lastDamaged : float = 0;
private var healthAdder : float = 0;                                          // True when the player gets damaged.

private var GameController:GameController;

function Awake () {
  // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
  currentHealth = startingHealth;
  lastDamaged = Time.time;
}

function Start () {
  // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
  GameController = GetComponent('GameController');
}


function Update ()
{
    // If the player has just been damaged...
    if(damaged)
    {
        //Make player look damaged
    }
    // Otherwise...
    else
    {
    	//Make player look not damaged (duh)
    }

	if(Time.time-lastDamaged>3&&currentHealth<regenHealth){
		healthAdder += regenFactor*Time.deltaTime;
		if(healthAdder>=1){
			healthAdder = 0;
			currentHealth += 1;
			GameController.PlayerHurt(this);
		}
	}


    // Reset the damaged flag.
    damaged = false;
}


public function TakeDamage (amount : int)
{
	if(isDead) {
    	return;
  	}

    // Set the damaged flag
    damaged = true;

	lastDamaged = Time.time;

    // Reduce the current health by the damage amount.
    currentHealth -= amount;

    if(currentHealth <= 0) {
    	// ... it should die a horrible horrible (and possibly humiliating) death.
    	Death ();
	}else {
		GameController.PlayerHurt(this);
	}

}


function Death () {
  // Set the death flag so this function won't be called again (you wouldn't want to die twice would you?).
  var rigidBody = this.GetComponent(Rigidbody);

  isDead = true;
  GameController.PlayerDied(this);
  //lets make the body fly around!
  rigidBody.constraints = RigidbodyConstraints.None;
  yield WaitForSeconds(0.1);

  Destroy(this.gameObject);


}