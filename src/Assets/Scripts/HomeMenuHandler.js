private var selectedItem;
private var menu;
private var isPressed = false;

function Start () {
  menu = new Array ();
  selectedItem = 0;
  //Menu objects

  menu.Push(GameObject.Find("play"));
  menu.Push(GameObject.Find("#ofplayers"));
  menu.Push(GameObject.Find("controllers"));
  menu.Push(GameObject.Find("exit"));
}

function Update () {

  transform.rotation = Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup) * 3, Mathf.Sin(Time.realtimeSinceStartup) * 7, 0);

  Debug.Log('Vertical: ' + Input.GetAxisRaw ("Vertical"));
  Debug.Log('Length:' + menu.length);
  Debug.Log(selectedItem);
  if((Input.GetAxisRaw("Vertical") == 1) && isPressed == false) {
    isPressed = true;

    menu[selectedItem].GetComponent(UI.Text).color = Color.white;
    selectedItem = selectedItem + 1;
    menu[selectedItem].GetComponent(UI.Text).color = Color.yellow;
  }

  if((Input.GetAxisRaw("Vertical") == -1) && isPressed == false) {
    isPressed = true;

    menu[selectedItem].GetComponent(UI.Text).color = Color.white;
    selectedItem = selectedItem - 1;
    menu[selectedItem].GetComponent(UI.Text).color = Color.yellow;
  }




}