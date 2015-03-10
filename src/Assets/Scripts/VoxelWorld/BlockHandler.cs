using UnityEngine;
using System.Collections;

public class BlockHandler : MonoBehaviour {

	public NewStonePoolerScript BlockStonePooler;
	public NewGrassPoolerScript BlockGrassPooler;
	GameObject obj;

	public void meteorExplosion (Vector3 meteorPos){
		SpawnBlock (meteorPos, Quaternion.identity, "Meteor");
		Debug.Log("SPAWN METEOR BLOX");
		}
	
	// Update is called once per frame
	public GameObject SpawnBlock(Vector3 x, Quaternion y, string type){

		if (type == "Grass") {
				obj = NewGrassPoolerScript.current.GetPooledObject() ;
				} else {
				obj = NewStonePoolerScript.current.GetPooledObject ();
				}


		obj.SetActive (true);
		obj.transform.position = x;
		obj.transform.rotation = y;

		if(type == "Meteor"){
			obj.rigidbody.AddForce(x.x*5f*Random.Range(-1f, 1f), x.y*5f, x.z*5f*Random.Range(-1f, 1f), ForceMode.Impulse);
		}
		return obj;

	}
}
