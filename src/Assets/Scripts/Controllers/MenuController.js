
private var homeMenu:Array = new Array();
private var pauseMenu:Array = new Array();

private var selection:GameObject;
private var selectionNum:float = 0;
private var isChanging = false;
private var isOnlyBack = false;

private var helpText;
private var GameController:GameController;

private var playerMap = ["ONE","TWO","THREE","FOUR"];

function Start () {
  GameController = GetComponent('GameController');
  homeMenu.push(GameObject.Find("Buttons/play"));
  homeMenu.push(GameObject.Find("Buttons/players"));
  homeMenu.push(GameObject.Find("Buttons/help"));
  homeMenu.push(GameObject.Find("Buttons/exit"));

  helpText = GameObject.Find("helpText");


  homeMenu[0].GetComponent(UI.Image).color = Color.black;
}

function Update () {
  RotateMenu();
  CheckInput();
}

function CheckInput() {

  if(Input.GetKeyDown("joystick 1 button 16") || Input.GetKeyDown("space")) {
    HandleMenuClick();
  }

  if(isOnlyBack) return;

  if(Input.GetAxis("Horizontal") < 0 && isChanging == false && selectionNum == 1) {
    ChangePlayerNumber(-1);
  }

  if(Input.GetAxis("Horizontal") > 0 && isChanging == false && selectionNum == 1) {
    ChangePlayerNumber(1);
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

function ChangePlayerNumber(value) {
  if(GameController.numberOfPlayers + value > 4 || GameController.numberOfPlayers + value < 2) return;
  isChanging = true;
  GameController.numberOfPlayers += value;

  homeMenu[1].GetComponentInChildren(UI.Text).text = "< " + playerMap[GameController.numberOfPlayers-1]  + ' PLAYERS >';
  yield WaitForSeconds (0.01);
  isChanging = false;
}

function UpdateMenu (value) {
  if(selectionNum + value >= homeMenu.length || selectionNum + value < 0) return;

  isChanging = true;

  homeMenu[selectionNum].GetComponent(UI.Image).color = Color(0,0,0,0);
  homeMenu[selectionNum + value].GetComponent(UI.Image).color = Color.black;

  selectionNum = selectionNum + value;

  yield WaitForSeconds (0.2);
  isChanging = false;
}

function HandleMenuClick() {

  if(selectionNum == 0) {
    Application.LoadLevel("Play");
  }
  else if(selectionNum == 1) {

  }
  else if(selectionNum == 2) {
    isOnlyBack = true;

    homeMenu[0].GetComponentInChildren(UI.Text).color = Color(0,0,0,0);
    homeMenu[1].GetComponentInChildren(UI.Text).color = Color(0,0,0,0);

    homeMenu[2].GetComponentInChildren(UI.Text).color = Color(0,0,0,0);
    homeMenu[2].GetComponent(UI.Image).color = Color(0,0,0,0);

    homeMenu[3].GetComponentInChildren(UI.Text).text = 'BACK';
    homeMenu[3].GetComponent(UI.Image).color = Color.black;

    helpText.GetComponent(UI.Text).color = Color.white;

    selectionNum = 3;
  }
  else if(selectionNum == 3) {
    if(isOnlyBack == true) {
      ResetMenu(2);
    }
    else {
      Application.Quit();
    }

  }
}

function ResetMenu (selectedMenuItem) {
    selectionNum = selectedMenuItem;

    homeMenu[0].GetComponentInChildren(UI.Text).color = Color.white;
    homeMenu[1].GetComponentInChildren(UI.Text).color = Color.white;
    homeMenu[2].GetComponentInChildren(UI.Text).color = Color.white;
    homeMenu[3].GetComponentInChildren(UI.Text).color = Color.white;

    homeMenu[selectedMenuItem].GetComponent(UI.Image).color = Color.black;

    homeMenu[3].GetComponent(UI.Image).color = Color(0,0,0,0);
    homeMenu[3].GetComponentInChildren(UI.Text).text = 'EXIT';

    helpText.GetComponent(UI.Text).color = Color(0,0,0,0);
    isOnlyBack = false;
}




function RotateMenu () {
  transform.rotation = Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup) * 3, Mathf.Sin(Time.realtimeSinceStartup) * 7, 0);
}