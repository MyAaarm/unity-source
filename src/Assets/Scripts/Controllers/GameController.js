#pragma strict

static var numberOfPlayers : int = 2;
static var HUD:HUDController;
static var numberOfPlayersPlaying: int;

public var Player : GameObject;

static var players : GameObject[];
static var playerControllers = ['Keyboard'];
//static var playerControllers = ['PS3OSX', 'X360OSX', 'X360OSX', 'PS3OSX'];

function Start () {
  HUD = GetComponent(HUDController);

  if(Application.loadedLevel == 1){
    addPlayers();
  }
}

function addPlayers() {
  for(var i  = 0; i < numberOfPlayers; i++) {
    var playerObject = GameObject.Instantiate(Player, Vector3(-10 + 5*i , 4.6, 0), Quaternion.identity) as GameObject;
    Debug.Log('Added player ' + i);
    playerObject.name = 'Player' + (i + 1);
    playerObject.GetComponent(PlayerMovement).playerNumber = i + 1;
    playerObject.GetComponent(PlayerMovement).currentGameController = playerControllers[i];
  }
  numberOfPlayersPlaying = numberOfPlayers;

  players = GameObject.FindGameObjectsWithTag("Player");
}

function StartTheGame() {
  Application.LoadLevel('Play');
  addPlayers();
}

function Awake () {
  DontDestroyOnLoad(this);
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
    for (var i = 0; i < players.length; i++){
      if (!players[i].GetComponent(PlayerHealth).isDead) {
        HUD.ShowWonMessage(players[i]);
        yield WaitForSeconds(3);
        Application.LoadLevel('Play');
      }
    }
  }
}