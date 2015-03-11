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

		return neighbours;

	}
}
