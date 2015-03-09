#pragma strict

var startingHealth : int = 100;                             // The amount of health the player starts the game with.
var currentHealth : int;
var regenFactor : int = 2;                                  // The current health the player has.
var regenHealth : int = 30;

public var isDead : boolean;                                                // Whether the player is dead.
private var damaged : boolean;
private var lastDamaged : float = 0;
private var healthAdder : float = 0;                                          // True when the player gets damaged.

private var GameController:GameController;
private var nose: GameObject;
private var noseInitialSize:Vector3;

function Awake () {
  // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
  currentHealth = startingHealth;
  lastDamaged = Time.time;
}

function Start () {
  // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
  GameController = GetComponent('GameController');

  nose = this.transform.Find("body").Find('Nose').gameObject;
  noseInitialSize = nose.transform.localScale;
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


public function TakeDamage (amount : int) {
	if(isDead) {
    	return;
  	}

    // Set the damaged flag
    damaged = true;

	lastDamaged = Time.time;

    // Reduce the current health by the damage amount.
    if((currentHealth-amount) >= 100){
    	currentHealth = 100;
    }
    else if((currentHealth-amount) <= 0){
    	currentHealth = 0;
    }
    else{
    	currentHealth -= amount;
      UpdateNoseColor();
    }

    if(currentHealth <= 0) {
    	// ... it should die a horrible horrible (and possibly humiliating) death.
    	Death ();
	}
  else {
		GameController.PlayerHurt(this);
	}

}

function ConvertColor (r : int, g : int, b : int) : Color { return Color(r/255.0, g/255.0, b/255.0); }
function UpdateNoseColor() {
  var r = 255 * (100 - currentHealth) / 100;
  var g = (255 * currentHealth) / 100;
  var b = 0;

  //nose.transform.localScale = noseInitialSize * Mathf.Min(currentHealth/100, 0.25);
  nose.transform.renderer.material.color = ConvertColor(r,g,b);
}



function Death () {
  //Implement a knockout here instead
  isDead = true;
  GameController.PlayerDied(this);
  Destroy(this.gameObject);
}