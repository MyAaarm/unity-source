#pragma strict

static var numberOfPlayers : int = 2;
static var HUD:HUDController;
static var PauseMenu:PauseController;
static var numberOfPlayersPlaying: int;

public var Player : GameObject;

static var players : GameObject[];
//static var playerControllers = ['Keyboard','','',''];
static var playerControllers = ['X360PC', 'Keyboard', 'X360OSX', 'PS3OSX'];

function Awake () {
  DontDestroyOnLoad(this);
}

function Start () {
  HUD = FindObjectOfType(HUDController);
  PauseMenu = FindObjectOfType(PauseController);

  if(Application.loadedLevel == 1){
    addPlayers();
  }
}

function addPlayers() {
  for(var i  = 0; i < numberOfPlayers; i++) {
    var playerObject = GameObject.Instantiate(Player, Vector3(-20 + 10*i , 20, 0), Quaternion.identity) as GameObject;
    Debug.Log('Added player ' + i);
    playerObject.name = 'Player' + (i + 1);
    playerObject.GetComponent(PlayerMovement).playerNumber = i + 1;
    playerObject.GetComponent(PlayerMovement).currentGameController = playerControllers[i];

 //   var hingeJoints : HingeJoint[];
//	hingeJoints = playerObject.GetComponentsInChildren(HingeJoint);
//	for (var joint : HingeJoint in hingeJoints) {
		//joint.enabled = false;
//	}
  }
  numberOfPlayersPlaying = numberOfPlayers;

  players = GameObject.FindGameObjectsWithTag("Player");
}

function StartTheGame() {
  Application.LoadLevel('Play');
  addPlayers();
}

static function SetNumberOfPlayers (integer) {
  numberOfPlayers = integer;
}

static function PlayerHurt (player) {
  HUD.UpdatePlayerHealth(player);
}

static function PlayerDied (player) {
  //Someone died, was it the last player?!
  numberOfPlayersPlaying = numberOfPlayersPlaying - 1;
  HUD.SetPlayerToDead(player);

  if(numberOfPlayersPlaying == 1) {
    HUD.Hide();
    PauseMenu.ShowWonMessage(players[0]);
  }
}