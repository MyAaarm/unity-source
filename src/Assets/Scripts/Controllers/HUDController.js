private var won: GameObject;



private var GameController:GameController;
private var healthLabels:Array = new Array();

function Start () {
  GameController = GetComponent('GameController');
  won = GameObject.Find("won");
  healthLabels.push(GameObject.Find("player1Health"));
  healthLabels.push(GameObject.Find("player2Health"));
  healthLabels.push(GameObject.Find("player3Health"));
  healthLabels.push(GameObject.Find("player4Health"));

  for(var i  = 0; i < GameController.numberOfPlayers; i++) {
    healthLabels[i].GetComponentInChildren(UI.Text).color = Color.red;
    healthLabels[i].GetComponent(UI.Text).text = 'p' + (i + 1) + ':' + 100;
  }
}


function UpdatePlayerHealth(player) {
  var playerNumber = player.GetComponent(PlayerMovement).playerNumber;
  var playerHealth = player.GetComponent(PlayerHealth).currentHealth;

  healthLabels[playerNumber-1].GetComponent(UI.Text).text = 'p' + playerNumber  + ':' + playerHealth;
}

function SetPlayerToDead(player) {
  var playerNumber = player.GetComponent(PlayerMovement).playerNumber;
  var playerHealth = player.GetComponent(PlayerHealth).currentHealth;

  healthLabels[playerNumber-1].GetComponent(UI.Text).text = 'p' + playerNumber  + ': dead';
}

function ShowWonMessage(player) {
  var playerNumber = player.GetComponent(PlayerMovement).playerNumber;

  won.GetComponent(UI.Text).text = 'player ' + playerNumber + ' won!';
}

