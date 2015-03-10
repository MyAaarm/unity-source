using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class CraterController : MonoBehaviour {
	Chunk chunk;
	public World world;
	WorldPos pos;
	Dictionary<string, List<int>> nbPos;
	private GameObject dynamicBlock;
	private Debris d = new Debris();
	
	
	public void handleOuterImpacts(Vector3 pos){
		Debug.Log ("Impact");
		RaycastHit hit;
		Physics.Raycast (pos, -transform.up, out hit, 100);
		this.Impact (hit, 450);

	}

	public void Impact (RaycastHit hit, int force) {
		Block b = Terrain.GetBlock (hit);
		chunk = hit.collider.GetComponent<Chunk>();
		pos = Terrain.GetBlockPos (hit, false);
		
		if (force > 50) {
			d.destroyBlocks(pos.x, pos.y, pos.z, impactSize(force), chunk, world);
		}
		/*	
		dynamicBlock = Instantiate(Resources.Load("BlockDynamic"), new Vector3(pos.x, pos.y, pos.z), Quaternion.identity) as GameObject;
		dynamicBlock.rigidbody.AddForce (0, 500, 0);
		
		Debug.Log("force 1 : " + force);
		force = force - 100;
		Debug.Log("space");
		Debug.Log("force 2 : " + force);
		if (force > 0) {
			List<Block> bl = Neighbours (b);
				//Impact (bl, force);
*/
		
	}
	
	private int impactSize(int f){
			if (f < 100) {
						return 1;
				} else if (f < 200) {
						return 7;
				} else if (f < 300) {
						return 12; 
				} else {
						return 18;
				}

		}
	private void Impact (List<Block> blockList, int force) {
		foreach (Block bls in blockList) {
			//world.SetBlock(nbPos[bls.ToString].FindIndex(0), nbPos[bls.ToString].FindIndex(1), nbPos[bls.ToString].FindIndex(2), new BlockAir());
		}
		
		if (force > 0) {
			force = force - 100;
			
			foreach (Block bls in blockList) {
				List<Block> bl = Neighbours (bls);
				Impact(bl, force);
			}
		}
	}
	
	private void createBlockDebris(WorldPos p, int f){
		int impactSize = 1;
		
		if (f >= 320 && f < 500) {
			impactSize = 7;
		} else if (f >= 500) {
			impactSize = 31;
		}
		
		for (int i = 0; i < impactSize; i++) {
			Block bx = chunk.world.GetBlock (p.x, p.y, p.z);
			chunk.world.SetBlock (p.x, p.y, p.z, new BlockAir ());
			
			if (bx is BlockGrass) {
				dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (p.x, p.y, p.z), Quaternion.identity) as GameObject;
				dynamicBlock.rigidbody.AddForce (0, f * 5, 0);
			} else if (bx is BlockAir) {
				Debug.Log ("blabla");
			} else {
				Debug.Log ("blablaasdasd");
				dynamicBlock = Instantiate (Resources.Load ("BlockStoneDynamic"), new Vector3 (p.x, p.y, p.z), Quaternion.identity) as GameObject;
				dynamicBlock.rigidbody.AddForce (0, f * 5, 0);
			}
			chunk.world.SetBlock(pos.x - 1, pos.y, pos.z, new BlockAir());
			dynamicBlock = Instantiate(Resources.Load("BlockGrassDynamic"), new Vector3(pos.x - 1, pos.y, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (f*3, f*3, 0);
			
			chunk.world.SetBlock(pos.x + 1, pos.y, pos.z, new BlockAir());
			dynamicBlock = Instantiate(Resources.Load("BlockGrassDynamic"), new Vector3(pos.x + 1, pos.y, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (f*3, f * 3, 0);
			
			chunk.world.SetBlock(pos.x - 2, pos.y, pos.z, new BlockAir());
			dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (pos.x - 2, pos.y, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (f*(-1), f * 1, 0);
			chunk.world.SetBlock(pos.x + 2, pos.y, pos.z, new BlockAir());
			dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (pos.x + 2, pos.y, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (f*1, f * 1, 0);
			chunk.world.SetBlock(pos.x, pos.y - 1, pos.z, new BlockAir());
			dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (pos.x , pos.y -1, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (0, f * 3, 0);
			chunk.world.SetBlock(pos.x, pos.y + 1, pos.z, new BlockAir());
			chunk.world.SetBlock(pos.x, pos.y - 2, pos.z, new BlockAir());
			dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (pos.x, pos.y - 2, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (0, f * 1, 0);	
			chunk.world.SetBlock(pos.x, pos.y + 2, pos.z, new BlockAir());
			chunk.world.SetBlock(pos.x, pos.y, pos.z - 1, new BlockAir());
			dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (pos.x + 2, pos.y, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (0, f*3, f*(-3));
			chunk.world.SetBlock(pos.x, pos.y, pos.z + 1, new BlockAir());
			dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (pos.x + 2, pos.y, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (0, f*3, f*3);
			chunk.world.SetBlock(pos.x, pos.y, pos.z - 2, new BlockAir());
			dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (pos.x + 2, pos.y, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (0, f * 1, f*(-1));
			chunk.world.SetBlock(pos.x, pos.y, pos.z + 2, new BlockAir());
			dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (pos.x + 2, pos.y, pos.z), Quaternion.identity) as GameObject;
			dynamicBlock.rigidbody.AddForce (0, f * 1, f*1);
			chunk.world.SetBlock(pos.x - 1, pos.y -1, pos.z, new BlockAir());
			chunk.world.SetBlock(pos.x - 1, pos.y +1, pos.z, new BlockAir());
			chunk.world.SetBlock(pos.x + 1, pos.y +1, pos.z, new BlockAir());
			chunk.world.SetBlock(pos.x + 1, pos.y -1, pos.z, new BlockAir());
			chunk.world.SetBlock(pos.x - 1, pos.y, pos.z+1, new BlockAir());
			chunk.world.SetBlock(pos.x - 1, pos.y, pos.z-1, new BlockAir());
			chunk.world.SetBlock(pos.x + 1, pos.y, pos.z+1, new BlockAir());
			chunk.world.SetBlock(pos.x + 1, pos.y, pos.z-1, new BlockAir());
			chunk.world.SetBlock(pos.x, pos.y - 1, pos.z-1, new BlockAir());
			chunk.world.SetBlock(pos.x, pos.y - 1, pos.z+1, new BlockAir());
			chunk.world.SetBlock(pos.x, pos.y + 1, pos.z-1, new BlockAir());
			chunk.world.SetBlock(pos.x, pos.y + 1, pos.z+1, new BlockAir());
			chunk.world.SetBlock(pos.x-1, pos.y + 1, pos.z+1, new BlockAir());
			chunk.world.SetBlock(pos.x-1, pos.y - 1, pos.z+1, new BlockAir());
			chunk.world.SetBlock(pos.x-1, pos.y + 1, pos.z-1, new BlockAir());
			chunk.world.SetBlock(pos.x-1, pos.y - 1, pos.z-1, new BlockAir());
			chunk.world.SetBlock(pos.x+1, pos.y + 1, pos.z+1, new BlockAir());
			chunk.world.SetBlock(pos.x+1, pos.y - 1, pos.z+1, new BlockAir());
			chunk.world.SetBlock(pos.x+1, pos.y + 1, pos.z-1, new BlockAir());
			chunk.world.SetBlock(pos.x+1, pos.y - 1, pos.z-1, new BlockAir());
		}
	}
	
	private List<Block> Neighbours(Block block){
		List<Block> neighbours = new List<Block>();
		nbPos = new Dictionary<string, List<int>> ();
		List<int> nbPosTemp = new List<int> ();
		
		neighbours.Add(chunk.world.GetBlock(pos.x - 1, pos.y, pos.z));
		nbPosTemp.Add (pos.x - 1); nbPosTemp.Add (pos.y); nbPosTemp.Add (pos.z);
		nbPos.Add ("one" ,nbPosTemp);
		/*
		neighbours.Add(chunk.world.GetBlock(pos.x + 1, pos.y, pos.z));
		nbPosTemp.Add (pos.x + 1); nbPosTemp.Add (pos.y); nbPosTemp.Add (pos.z);
		nbPos.Add (chunk.world.GetBlock(pos.x + 1, pos.y, pos.z).ToString ,nbPosTemp);
		nbPosTemp.Clear();
		neighbours.Add(chunk.world.GetBlock(pos.x, pos.y - 1, pos.z));
		nbPosTemp.Add (pos.x); nbPosTemp.Add (pos.y - 1); nbPosTemp.Add (pos.z);
		nbPos.Add (chunk.world.GetBlock(pos.x, pos.y - 1, pos.z).ToString ,nbPosTemp);
		nbPosTemp.Clear();
		neighbours.Add(chunk.world.GetBlock(pos.x, pos.y + 1, pos.z));
		nbPosTemp.Add (pos.x); nbPosTemp.Add (pos.y + 1); nbPosTemp.Add (pos.z);
		nbPos.Add (chunk.world.GetBlock(pos.x, pos.y + 1, pos.z).ToString ,nbPosTemp);
		nbPosTemp.Clear();
		neighbours.Add(chunk.world.GetBlock(pos.x, pos.y, pos.z - 1));
		nbPosTemp.Add (pos.x); nbPosTemp.Add (pos.y); nbPosTemp.Add (pos.z - 1);
		nbPos.Add (chunk.world.GetBlock(pos.x, pos.y, pos.z - 1).ToString ,nbPosTemp);
		nbPosTemp.Clear();
		neighbours.Add(chunk.world.GetBlock(pos.x, pos.y, pos.z + 1));
		nbPosTemp.Add (pos.x); nbPosTemp.Add (pos.y); nbPosTemp.Add (pos.z + 1);
		nbPos.Add (chunk.world.GetBlock(pos.x, pos.y, pos.z + 1).ToString ,nbPosTemp);
		nbPosTemp.Clear();
		*/
		
		return neighbours;
		
	}
}

/*
	private int[] xArray;
	private int[] yArray;
	private int[] zArray;
	private 
	void Start()
	{
	}
	*/
