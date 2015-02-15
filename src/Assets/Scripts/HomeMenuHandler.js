
 private var menu:Array = new Array();

 private var selection:GameObject;
 private var selectionNum:float = 0;
 private var isChanging = false;

function Start () {
  menu.push(GameObject.Find("Buttons/play"));
  menu.push(GameObject.Find("Buttons/players"));
  menu.push(GameObject.Find("Buttons/help"));
  menu.push(GameObject.Find("Buttons/exit"));


  menu[0].GetComponent(UI.Image).color = Color.black;
}

function Update () {
  transform.rotation = Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup) * 3, Mathf.Sin(Time.realtimeSinceStartup) * 7, 0);

  if(Input.GetAxis("Vertical") < 0 && isChanging == false) {
    UpdateMenu(1);
  }
  else if(Input.GetAxis("Vertical") > 0 && isChanging == false) {
    UpdateMenu(-1);

  }
}

function UpdateMenu (value) {
  isChanging = true;

  if(selectionNum + value >= menu.length || selectionNum + value < 0) return;
  Debug.Log('value:' + value);

  menu[selectionNum].GetComponent(UI.Image).color = Color(0,0,0,0);
  menu[selectionNum + value].GetComponent(UI.Image).color = Color.black;

  selectionNum = selectionNum + value;

  yield WaitForSeconds (0.2);
  isChanging = false;
}