private var GameController:GameController;
private var healthLabels:Array = new Array();

private var p1Color = Color.Lerp(Color.cyan,Color.blue, 0.2);
private var p2Color = Color.green;
private var p3Color = new Color(1f, 0.8, 0);
private var p4Color = Color.Lerp(Color.magenta,Color.red, 0.5);
private var colors = [p1Color, p2Color, p3Color, p4Color];

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
    healthLabels[i].GetComponentInChildren(UI.Text).color = colors[i];
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



