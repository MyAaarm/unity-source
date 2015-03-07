using UnityEngine;
using System.Collections;

public class SphereExpander : MonoBehaviour {
	
	SphereCollider myCollider;
	bool expanding;
	private Debris d = new Debris();
	Chunk chunk;
	public World world;
	private int expC;
	public NewSpherePoolerScript SpherePooler;
	public CraterController cc;
	
	void Awake(){
		myCollider = transform.GetComponent<SphereCollider>();
		//myCollider.radius = 0.1f; 
		//expanding = true;
		expC = 1;
	}

	void OnEnable(){
		myCollider.radius = 0.5f; 
		this.transform.localScale = new Vector3(1,1,1);
		expanding = true;
	}
	/*void OnTriggerStay(Collider other) {	
		chunk = other.GetComponent<Chunk>();

		//Debug.Log ("valpvalp" + col.collider.name + " " + col.contacts [1].point);
		chunk.world.SetBlock((int)other.transform.position.x, (int)other.transform.position.y,(int)other.transform.position.z, new BlockAir());
		//d.destroyBlocks((int)col.contacts [0].otherCollider.transform.position.x, (int)col.contacts [0].otherCollider.transform.position.y, (int)col.contacts [0].otherCollider.transform.position.z, 1, chunk, world);
		//d.destroyBlocks(pos.x, pos.y, pos.z, 1, chunk, world);
		expanding = false;
		if (!(this.transform.localScale.x > 9)) {
			this.gameObject.SetActive (false);
			GameObject obj = NewSpherePoolerScript.current.GetPooledObject ();
			obj.SetActive (true);
			obj.transform.position = new Vector3(other.transform.position.x, other.transform.position.y, other.transform.position.z);
			
		}
		this.gameObject.SetActive (false);
		
	}*/
	void OnCollisionEnter(Collision col){
		expanding = false;
			foreach (ContactPoint cp in col.contacts) {
						RaycastHit hit;
						float rayLength = 0.1f;
						Ray ray = new Ray (cp.point - cp.normal * rayLength * 0.5f, cp.normal);

						if (cp.otherCollider.Raycast (ray, out hit, rayLength)) {
								//Terrain.SetBlock(hit, new BlockAir());
								cc.Impact (hit, 100);
								// Instantiate your effect and
								// use the color C
						}
			if (!(this.transform.localScale.x > 4)) {
					this.gameObject.SetActive (false);
					GameObject xobj = NewSpherePoolerScript.current.GetPooledObject ();
					xobj.SetActive (true);
			}
					//this.gameObject.SetActive (false);
				}
		/*expanding = false;
		RaycastHit hit;
		col.contacts [0].otherCollider.Raycast (new Ray(col.contacts[1].point, -Vector3.up), out hit, 1f);
		if (!(this.transform.localScale.x > 9)) cc.Impact (hit, 100);
		/*chunk = col.collider.GetComponent<Chunk>();
		//Debug.Log ("valpvalp" + col.collider.name + " " + col.contacts [1].point);
		WorldPos blockPos = new WorldPos(
			Mathf.RoundToInt(col.contacts [0].point.x),
			Mathf.RoundToInt(col.contacts [0].point.y),
			Mathf.RoundToInt(col.contacts [0].point.z)
			);
		chunk.world.SetBlock(blockPos.x, blockPos.y,blockPos.z, new BlockAir());
		//d.destroyBlocks((int)col.contacts [0].otherCollider.transform.position.x, (int)col.contacts [0].otherCollider.transform.position.y, (int)col.contacts [0].otherCollider.transform.position.z, 1, chunk, world);
		//d.destroyBlocks(pos.x, pos.y, pos.z, 1, chunk, world);
		expanding = false;
		Vector3 pos = this.transform.position;
		if (!(this.transform.localScale.x > 9)) {
						this.gameObject.SetActive (false);
						GameObject xobj = NewSpherePoolerScript.current.GetPooledObject ();
						xobj.SetActive (true);
						Debug.Log ("bananatime");
			xobj.transform.position = pos;//new Vector3((int)col.contacts [0].point.x, (int)col.contacts [0].point.y+7, (int)col.contacts [0].point.z);
			                                     
		}
		this.gameObject.SetActive (false);
		if (col.gameObject.name == "DespawnPlane") Invoke ("Destroy", 1f);*/
	}

	void Update()
	{
		if (expanding) {
						//myCollider.radius = myCollider.radius + (1);
			if(expC == 1){
				this.transform.localScale += new Vector3(0.75f,0.75f,0.75f);
				expC = 0;
						} else {
							this.transform.localScale += new Vector3(-0.15f,-0.15f,-0.15f);
				expC = 1;
						}
				}
		
		//if (myCollider.radius > 10) {
		if(this.transform.localScale.x > 4){
			expanding = false;
			this.gameObject.SetActive (false);
		}
		
	}
}
