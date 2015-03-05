using UnityEngine;
using System.Collections;

public class TerrainGen : MonoBehaviour {

	/*
	 * ******** HILL WORLD *********/
	float stoneBaseHeight = 1;
	float stoneBaseNoise = 0.05f;
	float stoneBaseNoiseHeight = 4;
	
	float stoneMountainHeight = 15;
	float stoneMountainFrequency = 0.008f;
	float stoneMinHeight = -12;
	
	float dirtBaseHeight = 3;
	float dirtNoise = 0.04f;
	float dirtNoiseHeight = 1;

	/*
	 * ******** FLAT WORLD ********
	 * float stoneBaseHeight = 1;
	float stoneBaseNoise = 0f;
	float stoneBaseNoiseHeight = 0;
	
	float stoneMountainHeight = 0;
	float stoneMountainFrequency = 0f;
	float stoneMinHeight = -12;
	
	float dirtBaseHeight = 3;
	float dirtNoise = 0.04f;
	float dirtNoiseHeight = 1;*/ 

	public Chunk ChunkGen(Chunk chunk)
	{
		for (int x = chunk.pos.x; x < chunk.pos.x + Chunk.chunkSize; x++)
		{
			

			for (int z = chunk.pos.z; z < chunk.pos.z + Chunk.chunkSize; z++)
			{	
				//Debug.Log (" x == " + (((Mathf.Acos((x)/(Mathf.Sqrt(Mathf.Pow(x,2)+Mathf.Pow (z,2))))) > (Mathf.PI/3)) && ((Mathf.Acos((x)/(Mathf.Sqrt(Mathf.Pow(x,2)+Mathf.Pow (z,2))))) < (Mathf.PI/6))));

				chunk = ChunkColumnGen(chunk, x, z);
			}
		}
		return chunk;
	}
	
	public static int GetNoise(int x, int y, int z, float scale, int max)
	{
		return Mathf.FloorToInt( (SimplexNoise.Noise.Generate(x * scale, y * scale, z * scale) + 1f) * (max/2f));
	}

	public Chunk ChunkColumnGen(Chunk chunk, int x, int z)
	{
		int stoneHeight = Mathf.FloorToInt(stoneBaseHeight);
		stoneHeight += GetNoise(x, 0, z, stoneMountainFrequency, Mathf.FloorToInt(stoneMountainHeight));
		
		if (stoneHeight < stoneMinHeight)
			stoneHeight = Mathf.FloorToInt(stoneMinHeight);
		
		stoneHeight += GetNoise(x, 0, z, stoneBaseNoise, Mathf.FloorToInt(stoneBaseNoiseHeight));
		
		int dirtHeight = stoneHeight + Mathf.FloorToInt(dirtBaseHeight);
		dirtHeight += GetNoise(x, 100, z, dirtNoise, Mathf.FloorToInt(dirtNoiseHeight));
		for (int y = chunk.pos.y; y < chunk.pos.y + Chunk.chunkSize; y++)
		{	
			if(!(Mathf.Abs(x-z) < 3)){
				if (y <= stoneHeight)
				{
					if(y == chunk.pos.y-2) Debug.Log (" x == " + (x - chunk.pos.x));
					chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new Block());
				}
				else if (y <= dirtHeight)
				{
					if(y == chunk.pos.y-2) Debug.Log (" x == " + (x - chunk.pos.x));
					chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new BlockGrass());
				}
				else
				{
					if(y == chunk.pos.y-2) Debug.Log (" x == " + (x - chunk.pos.x));
					chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new BlockAir());
				}
			} else {
				Debug.Log ("BANANATIME");
				chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new BlockAir());
			}
			
		}
		
		return chunk;
	}

}
