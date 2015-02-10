#pragma strict

var startingHealth : int = 100;                             // The amount of health the player starts the game with.
var currentHealth : int;                                    // The current health the player has.

private var isDead : boolean;                                                // Whether the player is dead.
private var damaged : boolean;                                               // True when the player gets damaged.


function Awake ()
{
    // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
    currentHealth = startingHealth;
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

    // Reset the damaged flag.
    damaged = false;
}


public function TakeDamage (amount : int)
{
    // Set the damaged flag 
    damaged = true;

    // Reduce the current health by the damage amount.
    currentHealth -= amount;

    // If the player has lost all it's health and the death flag hasn't been set yet...
    if(currentHealth <= 0 && !isDead)
    {
        // ... it should die a horrible horrible (and possibly humiliating) death.
        Death ();
    }
}


function Death ()
{
    // Set the death flag so this function won't be called again (you wouldn't want to die twice would you?).
    isDead = true;

   //Do dead stuff that dead players do
   
}