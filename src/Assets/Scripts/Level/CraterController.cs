using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class CraterController : MonoBehaviour {
	Chunk chunk;
	public World world;
	WorldPos pos;
	Dictionary<string, List<int>> nbPos;

	public void Impact (RaycastHit hit, int force) {
		Terrain.SetBlock(hit, new BlockAir());
		Block b = Terrain.GetBlock (hit);
		chunk = hit.collider.GetComponent<Chunk>();
		pos = Terrain.GetBlockPos(hit, false);
		
		Debug.Log("force 1 : " + force);

		force = force - 100;

		Debug.Log("space");
		Debug.Log("force 2 : " + force);

		if (force > 0) {
			List<Block> bl = Neighbours (b);
				//Impact (bl, force);

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

		foreach (Block b in neighbours) {
					Debug.Log("blockdata:");
				}
		foreach(int x in nbPosTemp){
			Debug.Log ("bananer : " + x);
		}

		return neighbours;

	}
}
