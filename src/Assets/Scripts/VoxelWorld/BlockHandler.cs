using UnityEngine;
using System.Collections;

public class BlockHandler : MonoBehaviour {

	public NewStonePoolerScript BlockStonePooler;
	public NewGrassPoolerScript BlockGrassPooler;
	GameObject obj;
	
	// Update is called once per frame
	public GameObject SpawnBlock(Vector3 x, Quaternion y, string type){

		if (type == "Grass") {
				obj = NewGrassPoolerScript.current.GetPooledObject();
				} else {
				obj = NewStonePoolerScript.current.GetPooledObject ();
				}


		obj.SetActive (true);
		obj.transform.position = x;
		obj.transform.rotation = y;
		return obj;
	}
}
