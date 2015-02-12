using UnityEngine;
using System.Collections;

public class Debris : MonoBehaviour {
	Chunk chunk;
	public World world;
	private GameObject dynamicBlock;
	private int[] blockSets = new int[]{0, 3, 6, 9, 12, 15, 18};
	private int[] blockCoordinates = new int[]  {0, 0, 0, 
												-1, 0, 0, 
												1, 0, 0, 
												0, -1, 0, 
												0, 1, 0, 
												0, 0, -1, 
												0, 0, 1, 
												-1, -1, 0, 
												-1, +1, 0, 
												+1, +1, 0, 
												+1, -1, 0, 
												-1, 0, +1, 
												-1, 0, -1, 
												+1, 0, +1, 
												+1, 0, -1, 
												0, -1, -1, 
												0, -1, +1,
												0,  +1, -1, 
												0, +1, +1};

	// Use this for initialization
	void Start () {/*

		blockCoordinates [31] = 0; blockCoordinates [0] [1] = 0; blockCoordinates [0] [2] = 0; //31
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
		                chunk.world.SetBlock(pos.x - 2, pos.y, pos.z, new BlockAir());
	chunk.world.SetBlock(pos.x + 2, pos.y, pos.z, new BlockAir());
	chunk.world.SetBlock(pos.x, pos.y - 1, pos.z, new BlockAir());
	chunk.world.SetBlock(pos.x, pos.y + 1, pos.z, new BlockAir());
	chunk.world.SetBlock(pos.x, pos.y - 2, pos.z, new BlockAir());
	chunk.world.SetBlock(pos.x, pos.y + 2, pos.z, new BlockAir());
	chunk.world.SetBlock(pos.x, pos.y, pos.z - 1, new BlockAir());
	chunk.world.SetBlock(pos.x, pos.y, pos.z + 1, new BlockAir());
	chunk.world.SetBlock(pos.x, pos.y, pos.z - 2, new BlockAir());
	chunk.world.SetBlock(pos.x, pos.y, pos.z + 2, new BlockAir());
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
	chunk.world.SetBlock(pos.x+1, pos.y - 1, pos.z-1, new BlockAir());*/
	}
	
	 public void destroyBlocks(int x, int y, int z, int impactSize, Chunk c, World w){
		chunk = c;
		world = w;
		for (int i = 0; i < impactSize*3; i = i+3) {
			//Debug.Log ("i value == " + i + " bloockcoordinates x,y,z = " + blockCoordinates[impactSize] + blockCoordinates[impactSize+1] + blockCoordinates[impactSize+2]);
			//Debug.Log (blockCoordinates[impactSize]);Debug.Log (blockCoordinates[impactSize+1]);Debug.Log (blockCoordinates[impactSize+2]);
					Block bx = chunk.world.GetBlock (x + blockCoordinates[i], y + blockCoordinates[i+1], z + blockCoordinates[i+2]);
					chunk.world.SetBlock(x + blockCoordinates[i], y + blockCoordinates[i+1], z + blockCoordinates[i+2], new BlockAir());
					spawnDebris(x + blockCoordinates[i], y + blockCoordinates[i+1], z + blockCoordinates[i+2], bx);
				}
		}

	 private void spawnDebris(int x, int y, int z, Block bt){
				if (bt is BlockGrass) {
						dynamicBlock = Instantiate (Resources.Load ("BlockGrassDynamic"), new Vector3 (x, y, z), Quaternion.identity) as GameObject;
						dynamicBlock.rigidbody.AddForce (0, 150 * 5, 0);
				} else if (bt is BlockAir) {
				} else {
					dynamicBlock = Instantiate (Resources.Load ("BlockStoneDynamic"), new Vector3 (x, y, z), Quaternion.identity) as GameObject;
				}
		}
}
