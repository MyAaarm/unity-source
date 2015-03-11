using UnityEngine;
using System.Collections;

public class Debris : MonoBehaviour {
	Chunk chunk;
	public World world;
	private GameObject dynamicBlock;
	private BlockHandler bh = new BlockHandler();
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
		0, +1, -1,
		0, +1, +1,
		0, +1, +1,
		0, +1, +1,
		0, +1, +1,
		0, +1, +1,
		0, +1, +1,
		0, +1, +1,
		0, +1, +1};


	public void destroyBlocks(int x, int y, int z, int impactSize, Chunk c, World w){
				chunk = c;
				world = w;
				int dx;
				int dy;
				int dz;
				for (int i = 0; i <= impactSize*3; i=i+3) {
					dx = blockCoordinates [i];
					dy = blockCoordinates [i + 1];
					dz = blockCoordinates [i + 2];
					Block bx = chunk.world.GetBlock (x + dx, y + dy, z + dz);
					chunk.world.SetBlock (x + dx, y + dy, z + dz, new BlockAir ());
					spawnDebris (x + blockCoordinates [i], y + blockCoordinates [i + 1], z + blockCoordinates [i + 2], bx, debrisAngle (dx, dy, dz));
				}
				if (impactSize > 10) {
							for(int i = 0; i < (impactSize)-10; i++){
										int pwx = Random.Range (2, 6); int pwy = Random.Range (2, 3); int pwz = Random.Range (2, 6);
										int multix = Random.Range(-1,1); int multiy = Random.Range(-1,1); int multiz = Random.Range(-1,1);
										Block bx = chunk.world.GetBlock (x + pwx * multix, y + pwy * multiy, z + pwz * multiz);
										chunk.world.SetBlock (x + pwx * multix, y + pwy * multiy, z + pwz * multiz, new BlockAir ());
										int[] angle = new int[3];
										angle[0] = Mathf.Abs(pwx-6)*multix; angle[1] = Mathf.Abs(pwy-6)*multiy; angle[2] = Mathf.Abs(pwz-6)*multiz;
										spawnDebris (x + pwx * multix, y + pwy * multiy, z + pwz * multiz, bx, angle);
							}

				}

	}

	private void spawnDebris(int x, int y, int z, Block bt, int[] da){
		if (bt is BlockGrass) {
			dynamicBlock = bh.SpawnBlock(new Vector3 (x, y, z), Quaternion.identity, "Grass");
			dynamicBlock.rigidbody.AddForce (250*da[0], 350*da[1], 250*da[2]);
		} else if (bt is BlockAir) {
		} else {
			dynamicBlock = bh.SpawnBlock(new Vector3 (x, y, z), Quaternion.identity, "Stone");
			dynamicBlock.rigidbody.AddForce (250*da[0], 350*da[1], 250*da[2]);
		}
	}

	private int[] debrisAngle(int x, int y, int z){
		int[] da;

		if (x == 0 && y == 0 && z == 0) {
			da = new int[]{0, 5, 0};
		} else if ( x != 0 && y != 0){
			da = new int[]{5*Random.Range (-1,1), 5, 0};
		} else {
			da = new int[]{0, 5, 5*Random.Range (-1,1)};
		}

		return da;
	}
}