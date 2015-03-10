#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	Debug.Log('asdklajsdlkajdlkajdlkadjlaksdjlaksdj');
	Debug.Log(other.collider.name);
}

function OnCollisionEnter( col : Collision ){
	Debug.Log('123123123123123');
	Debug.Log(col.collider.name);	
}