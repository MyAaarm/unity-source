#pragma strict

var startingHealth : int = 100;                             // The amount of health the player starts the game with.
static var currentHealth : int;
var regenFactor : int = 2;                                  // The current health the player has.
var regenHealth : int = 30;
var DeadPlayer: GameObject;

public var isDead : boolean;                                                // Whether the player is dead.
public var isKnocked : boolean;
private var damaged : boolean;
private var lastDamaged : float = 0;
private var healthAdder : float = 0;                                          // True when the player gets damaged.

private var GameController:GameController;
private var nose: GameObject;
private var noseInitialSize:Vector3;

private var punchSounds:Array = new Array();
var punch1: AudioSource;
var punch2: AudioSource;
var punch3: AudioSource;
var punch4: AudioSource;
var punch5: AudioSource;
var punch6: AudioSource;
var punch7: AudioSource;

private var deathSounds:Array = new Array();
var death1: AudioSource;

function Awake () {
  // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
  currentHealth = startingHealth;
  lastDamaged = Time.time;
}

function Start () {
  // Set the initial health of the player (Maybe cheat a little and add more health to your character, only an if statement away).
  punchSounds.push(punch1);
  punchSounds.push(punch2);
  punchSounds.push(punch3);
  punchSounds.push(punch4);
  punchSounds.push(punch5);
  punchSounds.push(punch6);
  punchSounds.push(punch7);

  deathSounds.push(death1);

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

	if(Time.time-lastDamaged>3&&currentHealth<=regenHealth){
		healthAdder += regenFactor*Time.deltaTime;
		if(healthAdder>=1){
			healthAdder = 0;
			currentHealth += 1;
			GameController.PlayerHurt(this);
		}
	}


    // Reset the damaged flag.
    damaged = false;
    
    if(currentHealth<=10){
   		isKnocked = true;
	}
	else {
		isKnocked = false;
	}
    
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
      PlayPunchSound();
    }

    if(currentHealth <= 0) {
    	// ... it should die a horrible horrible (and possibly humiliating) death.
    	Death ();
	}
  else {
  		UpdateNoseColor();
		GameController.PlayerHurt(this);
	}

  
}

function PlayPunchSound(){
  var sound = punchSounds[Random.Range(0, punchSounds.length-1)] as AudioSource;
  sound.Play();
}

function PlayDeathSound(){
  var sound = deathSounds[Random.Range(0, deathSounds.length-1)] as AudioSource;
  sound.Play();
  return sound.clip.length;
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

  var audioLength = PlayDeathSound();

  this.transform.gameObject.active = false;

  var deadPlayer = GameObject.Instantiate(DeadPlayer, this.transform.Find("body").transform.position, this.transform.Find("body").transform.rotation) as GameObject;
  deadPlayer.transform.Find("body").transform.renderer.material.color = this.transform.Find("body").transform.renderer.material.color;
  Destroy(this.gameObject, audioLength);
}