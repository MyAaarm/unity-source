#pragma strict

function FixedUpdate(){
	Debug.Log(this.transform.eulerAngles.y);
	if(Mathf.Abs(this.transform.eulerAngles.x) > 15 || Mathf.Abs(this.transform.eulerAngles.z) > 15){
		Debug.Log("FALLEN PLAYER");
	}
}