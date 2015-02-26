using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class NewGrassPoolerScript : MonoBehaviour {

	public static NewGrassPoolerScript current;
	public GameObject pooledObject;
	public int pooledAmount = 120;
	public bool willGrow = false;

	public List<GameObject> pooledObjects;

	private int lastBlock = 0;


	void Awake () {	
		current = this;
	}

	// Use this for initialization
	void Start () {	
		pooledObjects = new List<GameObject> ();
		for (int i = 0; i < pooledAmount; i++) {
			GameObject obj = (GameObject)Instantiate(pooledObject);
			obj.SetActive(false);
			pooledObjects.Add (obj);
			obj.transform.parent = GameObject.Find ("ObjectPooling").transform;

		}
	}
	
	public GameObject GetPooledObject(){
		for (int i = 0; i < pooledObjects.Count; i++) {
			if(!pooledObjects[i].activeInHierarchy){
				return pooledObjects[i];
			}
		}


		if (willGrow) {
			GameObject obj = (GameObject)Instantiate(pooledObject);
			pooledObjects.Add (obj);
			return obj;
				}

		return pooledObjects [Random.Range (0, pooledObjects.Count)];
	}
}
