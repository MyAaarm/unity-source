private var GameController:GameController;
private var healthLabels:Array = new Array();

function Start () {
  GameController = GetComponent('GameController');

  healthLabels.push(GameObject.Find("player1Health"));
  healthLabels.push(GameObject.Find("player2Health"));
  healthLabels.push(GameObject.Find("player3Health"));
  healthLabels.push(GameObject.Find("player4Health"));

  if(Application.loadedLevel == 1) {
    Show();
  }
}


function Show() {
  for(var i  = 0; i < GameController.numberOfPlayers; i++) {
    healthLabels[i].GetComponentInChildren(UI.Text).color = Color.red;
    healthLabels[i].GetComponent(UI.Text).text = 'p' + (i + 1) + ':' + 100;
  }
}

function Hide() {
  for(label in healthLabels) {
    label.GetComponentInChildren(UI.Text).color = Color(0,0,0,0);
    label.GetComponent(UI.Text).text = '';
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



