
 private var menu:Array = new Array();

 private var selection:GameObject;
 private var selectionNum:float = 0;
 private var isChanging = false;
 private var isOnlyBack = false;

 private var helpText;


function Start () {
  menu.push(GameObject.Find("Buttons/play"));
  menu.push(GameObject.Find("Buttons/players"));
  menu.push(GameObject.Find("Buttons/help"));
  menu.push(GameObject.Find("Buttons/exit"));

  helpText = GameObject.Find("helpText");


  menu[0].GetComponent(UI.Image).color = Color.black;
}

function Update () {
  transform.rotation = Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup) * 3, Mathf.Sin(Time.realtimeSinceStartup) * 7, 0);
  Debug.Log(selectionNum);

  if(Input.GetKeyDown("joystick 1 button 16") || Input.GetKeyDown("space")) {
    HandleMenuClick();
  }

  if(isOnlyBack) return;

  if(Input.GetAxis("Vertical") < 0 && isChanging == false) {
    UpdateMenu(1);
  }
  else if(Input.GetAxis("Vertical") > 0 && isChanging == false) {
    UpdateMenu(-1);
  }

  else if(Input.GetAxisRaw("PS3LeftJoystickYOSX1") < 0 && isChanging == false) {
    UpdateMenu(1);
  }
  else if(Input.GetAxisRaw("PS3LeftJoystickYOSX1") > 0 && isChanging == false) {
    UpdateMenu(-1);
  }



}

function HandleMenuClick() {

  if(selectionNum == 0) {
    Application.LoadLevel("Play");
  }
  else if(selectionNum == 1) {

  }
  else if(selectionNum == 2) {
    isOnlyBack = true;

    menu[0].GetComponentInChildren(UI.Text).color = Color(0,0,0,0);
    menu[1].GetComponentInChildren(UI.Text).color = Color(0,0,0,0);

    menu[2].GetComponentInChildren(UI.Text).color = Color(0,0,0,0);
    menu[2].GetComponent(UI.Image).color = Color(0,0,0,0);

    menu[3].GetComponentInChildren(UI.Text).text = 'BACK';
    menu[3].GetComponent(UI.Image).color = Color.black;

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

    menu[0].GetComponentInChildren(UI.Text).color = Color.white;
    menu[1].GetComponentInChildren(UI.Text).color = Color.white;
    menu[2].GetComponentInChildren(UI.Text).color = Color.white;
    menu[3].GetComponentInChildren(UI.Text).color = Color.white;

    menu[selectedMenuItem].GetComponent(UI.Image).color = Color.black;

    menu[3].GetComponent(UI.Image).color = Color(0,0,0,0);
    menu[3].GetComponentInChildren(UI.Text).text = 'EXIT';

    helpText.GetComponent(UI.Text).color = Color(0,0,0,0);
    isOnlyBack = false;
}

function UpdateMenu (value) {
  if(selectionNum + value >= menu.length || selectionNum + value < 0) return;

  isChanging = true;

  Debug.Log('value:' + value);

  menu[selectionNum].GetComponent(UI.Image).color = Color(0,0,0,0);
  menu[selectionNum + value].GetComponent(UI.Image).color = Color.black;

  selectionNum = selectionNum + value;

  yield WaitForSeconds (0.2);
  isChanging = false;
}

