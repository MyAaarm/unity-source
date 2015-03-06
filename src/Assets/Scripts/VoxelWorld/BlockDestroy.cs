using UnityEngine;
using System.Collections;

public class BlockDestroy : MonoBehaviour {

	void OnCollisionEnter(Collision col){
		if (col.gameObject.name == "DespawnPlane") Invoke ("Destroy", 1f);
		}

	void Destroy()
	{
		this.gameObject.SetActive (false);
		CancelInvoke ();
		
	}
}
