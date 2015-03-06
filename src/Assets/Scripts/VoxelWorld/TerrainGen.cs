using UnityEngine;
using System.Collections;

public class TerrainGen : MonoBehaviour {
	
	/*
	 * ******** HILL WORLD *********/
	float stoneBaseHeight = 1;
	float stoneBaseNoise = 0.05f;
	float stoneBaseNoiseHeight = 4;
	
	float stoneMountainHeight = 1;
	float stoneMountainFrequency = 0.008f;
	float stoneMinHeight = -12;
	
	float dirtBaseHeight = 3;
	float dirtNoise = 0.04f;
	float dirtNoiseHeight = 1;
	
	int l = 1;
	
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
		int k = 0;
		int p = 0;
		for (int y = chunk.pos.y; y < chunk.pos.y + Chunk.chunkSize; y++)
		{	
			k = k + Random.Range(-1,1);
			
			/*if(p > 120){ 
				l = l + 1;
				if(l>3) l = 0;
				p = 0;
			}
			
			p++;*/
			
			if(!(((x-(z)) <= (18+k)*2) && ((x-(z)) >= (10+k)*2))){
				//if(!(((x-(z)*(1/l)) <= (18+k)*2) && ((x-(z)*(1/l)) >= (10+k)*2))){
				if (y <= stoneHeight && !onEdge (x,z))
				{
					chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new Block());
				}
				else if (y <= dirtHeight && !onEdge (x,z))
				{
					chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new BlockGrass());
				}
				else if (!onEdge (x,z))
				{
					chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new BlockAir());
				} else {
					int yh = edgeVal(x,z);
						if(y < 2 && y <= stoneHeight && y <= yh) {
							chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new Block());
						} else if (y < 8 &&  y <= yh){
							chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new BlockGrass());
						} else {
							chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new BlockAir());
						}

				}
			} else {
				chunk.SetBlock(x - chunk.pos.x, y - chunk.pos.y, z - chunk.pos.z, new BlockAir());
			}
			
		}
		
		return chunk;
	}

	private bool onEdge(int xE, int zE){
		return (xE < -45 || xE > 60 || zE < -61 || zE > 60);
	}
	private int edgeVal(int xE, int zE){
		return Mathf.Min (Mathf.Abs (xE - (-48)), Mathf.Abs (xE - 63), Mathf.Abs (zE - (-64)), Mathf.Abs (zE - 63));
	}
}
