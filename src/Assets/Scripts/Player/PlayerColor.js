#pragma strict
private var currentPlayer : GameObject;
private var body : GameObject;

private var p1Color = Color.Lerp(Color.cyan,Color.blue, 0.2);
private var p2Color = Color.green;
private var p3Color = new Color(1f, 0.8, 0);
private var p4Color = Color.Lerp(Color.magenta,Color.red, 0.5);
private var colors = [p1Color, p2Color, p3Color, p4Color];

function Start () {
    currentPlayer = this.transform.gameObject;
    var playerNumber = currentPlayer.GetComponent(PlayerMovement).playerNumber;

 	body = this.transform.Find("body").gameObject;

  this.transform.Find("body").Find('Nose').renderer.material.color = Color.green;
	body.renderer.material.color = colors[playerNumber-1];
}

