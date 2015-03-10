
private var pauseMenu:Array = new Array();

private var selection:GameObject;
private var selectionNum:float = 0;
private var isChanging = false;
private var isHidden = true;
private var won: GameObject;

private var GameController:GameController;

function Start () {
  GameController = GetComponent('GameController');

  won = GameObject.Find("won");
  pauseMenu.push(GameObject.Find("Buttons/play"));
  pauseMenu.push(GameObject.Find("Buttons/exit"));

  HideMenu();
}

function Update () {
  if(isHidden) return;

  CheckInput();
}

function ShowMenu () {
  pauseMenu[0].GetComponentInChildren(UI.Text).color = Color.white;
  pauseMenu[1].GetComponentInChildren(UI.Text).color = Color.white;

  pauseMenu[0].GetComponent(UI.Image).color = Color.black;

  isHidden = false;
}

function HideMenu () {
    isHidden = true;

    pauseMenu[0].GetComponentInChildren(UI.Text).color =  Color(0,0,0,0);
    pauseMenu[1].GetComponentInChildren(UI.Text).color =  Color(0,0,0,0);
}


function CheckInput() {

  if(Input.GetKeyDown("joystick 1 button 16") || Input.GetKeyDown("space")) {
    HandleMenuClick();
  }

  if(Input.GetAxis("Vertical") < 0 && isChanging == false) {
    UpdateMenu(1);
  }
  else if(Input.GetAxis("Vertical") > 0 && isChanging == false) {
    UpdateMenu(-1);
  }

  else if(Input.GetAxisRaw("LeftJoystickY1") < 0 && isChanging == false) {
    UpdateMenu(1);
  }
  else if(Input.GetAxisRaw("LeftJoystickY1") > 0 && isChanging == false) {
    UpdateMenu(-1);
  }
}

function UpdateMenu (value) {
  if(selectionNum + value >= pauseMenu.length || selectionNum + value < 0) return;

  isChanging = true;

  pauseMenu[selectionNum].GetComponent(UI.Image).color = Color(0,0,0,0);
  pauseMenu[selectionNum + value].GetComponent(UI.Image).color = Color.black;

  selectionNum = selectionNum + value;

  yield WaitForSeconds (0.01);
  isChanging = false;
}

function HandleMenuClick() {

  if(selectionNum == 0) {
    Application.LoadLevel("Play");
  }
  else if(selectionNum == 1) {
    Application.LoadLevel("Menu");
  }
}

function ShowWonMessage(player) {
  var playerMovement = player.GetComponentInParent(PlayerMovement);
  if(playerMovement) {
    won.GetComponent(UI.Text).text = 'player ' + playerMovement.playerNumber + ' won!';
  }

  else {
    won.GetComponent(UI.Text).text = 'It\'s a draw!' ;
  }

  ShowMenu();
}