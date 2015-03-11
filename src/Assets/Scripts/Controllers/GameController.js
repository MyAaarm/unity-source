#pragma strict

static var numberOfPlayers : int = 2;
static var HUD:HUDController;
static var PauseMenu:PauseController;
static var numberOfPlayersPlaying: int = 0;

public var Player : GameObject;

public var Judge : GameObject;

static var players : GameObject[];
static var playerControllers = ['Keyboard', 'Keyboard', 'Keyboard', 'PS3OSX'];

private var spawnPositions:Array = new Array();
private var judgePositions:Array = new Array();

function Awake () {
  DontDestroyOnLoad(this);
}

function Start () {
  spawnPositions.push(new Vector3(-25,24.5, -35));
  spawnPositions.push(new Vector3(50,24.5, -35));
  spawnPositions.push(new Vector3(50,24.5, 25));
  spawnPositions.push(new Vector3(-25,24.5, 25));

  judgePositions.push(new Vector3(-37,24.5, -50));
  judgePositions.push(new Vector3(50,24.5, -50));
  judgePositions.push(new Vector3(50,24.5, 40));
  judgePositions.push(new Vector3(-37,24.5, 40));

  HUD = FindObjectOfType(HUDController);
  PauseMenu = FindObjectOfType(PauseController);

  numberOfPlayersPlaying = 0;

  if(Application.loadedLevel == 1) {
  setGameControllers();
    addPlayers();
    var judge = Instantiate(Judge, judgePositions[Random.Range(0, numberOfPlayersPlaying)], Quaternion.identity) as GameObject;
    judge.name = 'Judge';
  }
}

function setGameControllers(){
	var gameControllers : String[] = Input.GetJoystickNames();
	for(var i = 0; i < gameControllers.Length; i++){

		if(gameControllers[i]=="XBOX 360 For Windows (Controller)"){
			playerControllers[i] = "X360PC";
		}else if(gameControllers[i]=="©Microsoft Corporation Xbox 360 Wired Controller"){
			playerControllers[i] = "X360OSX";
		}else if(gameControllers[i].Contains("Wireless Controller")){
			playerControllers[i] = "PS4OSX";
		}else if(gameControllers[i]=="Sony PLAYSTATION(R)3 Controller"){
			playerControllers[i] = "PS3OSX";
		}
	}
}

function addPlayers() {

  for(var i  = 0; i < numberOfPlayers; i++) {
    var playerObject = GameObject.Instantiate(Player, spawnPositions[i], Quaternion.identity) as GameObject;
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
    for(p in players) {
      if(p != null && !p.GetComponent(PlayerHealth).isDead) {
        PauseMenu.ShowWonMessage(p);
      }
    }
  }
}