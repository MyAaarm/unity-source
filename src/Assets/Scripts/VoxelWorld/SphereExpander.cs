using UnityEngine;
using System.Collections;

public class SphereExpander : MonoBehaviour {
	
	SphereCollider myCollider;
	bool expanding;
	private Debris d = new Debris();
	Chunk chunk;
	public World world;
	private int expC;
	
	void Awake(){
		myCollider = transform.GetComponent<SphereCollider>();
		//myCollider.radius = 0.1f; 
		//expanding = true;
		expC = 1;
	}

	void OnEnable(){
		myCollider.radius = 0.6f; 
		this.transform.localScale = new Vector3(1,1,1);
		expanding = true;
	}
	
	void OnCollisionEnter(Collision col){
		//expanding = false;
		chunk = col.collider.GetComponent<Chunk>();
		//Debug.Log ("valpvalp" + col.collider.name + " " + col.contacts [1].point);
		chunk.world.SetBlock((int)col.contacts [0].point.x, (int)col.contacts [0].point.y,(int) col.contacts [0].point.z, new BlockAir());
		//d.destroyBlocks((int)col.contacts [0].otherCollider.transform.position.x, (int)col.contacts [0].otherCollider.transform.position.y, (int)col.contacts [0].otherCollider.transform.position.z, 1, chunk, world);
		//d.destroyBlocks(pos.x, pos.y, pos.z, 1, chunk, world);
		if (col.gameObject.name == "DespawnPlane") Invoke ("Destroy", 1f);
	}
	
	void Update()
	{
		if (expanding) {
						//myCollider.radius = myCollider.radius + (1);
			if(expC == 1){
				this.transform.localScale += new Vector3(0.25f,0.25f,0.25f);
				expC = 0;
						} else {
							this.transform.localScale += new Vector3(-0.15f,-0.15f,-0.15f);
				expC = 1;
						}
				}
		
		//if (myCollider.radius > 10) {
		if(this.transform.localScale.x > 9){
			expanding = false;
			//this.gameObject.SetActive (false);
		}
		
	}
}
