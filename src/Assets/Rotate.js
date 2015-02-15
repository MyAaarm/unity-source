#pragma strict

function Start () {

}

function Update () {
  transform.rotation = Quaternion.Euler(Mathf.Sin(Time.realtimeSinceStartup) * 3, Mathf.Sin(Time.realtimeSinceStartup) * 7 + 196, 0);
}