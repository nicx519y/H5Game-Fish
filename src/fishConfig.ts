export class FishConfig {
	headSheet;
	bodySheet;
	swimSpeed;

	constructor(headSheet, bodySheet, swimSpeed) {
		this.headSheet = headSheet;
		this.bodySheet = bodySheet;
		this.swimSpeed = swimSpeed;
	}
}

/**
 * 鱼的动画配置 
 */
const FISH_ANIMATIONS = {
	run: {
		frames: [0, 4],
		speed: 0.1,
	}
};

/**
 * 鱼的雪碧图配置
 */
export const FISH_CONFIGS = {
	'goldfish': new FishConfig(
		{
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				[0, 0, 34, 63]
			]
		}, {
			frames: [
				[200, 0, 125, 63, 0],
				[400, 0, 125, 63, 0],
				[600, 0, 125, 63, 0],
				[800, 0, 125, 63, 0],
				[1000, 0, 125, 63, 0],
			],
			animations: FISH_ANIMATIONS,
		}, {
			minDuration: 5000,		//每次冲刺用的最小tick
			maxDuration: 10000,		//每次冲刺用的最大tick
			minRange: 500,			//每次冲刺最小距离
			maxRange: 1200,			//每次冲刺最大距离
		}
	),
	'flatfish': new FishConfig(
		{
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				[0, 200, 30, 90]
			]
		}, {
			frames: [
				[200, 200, 80, 90, 0],
				[400, 200, 80, 90, 0],
				[600, 200, 80, 90, 0],
				[800, 200, 80, 90, 0],
				[1000, 200, 80, 90, 0],
			],
			animations: FISH_ANIMATIONS,
		}, {
			minDuration: 500,		//每次冲刺用的最小tick
			maxDuration: 1800,		//每次冲刺用的最大tick
			minRange: 30,			//每次冲刺最小距离
			maxRange: 400,			//每次冲刺最大距离
		}
	),
	'tuna': new FishConfig(
		{
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				[0, 400, 22, 56]
			]
		}, {
			frames: [
				[200, 400, 55, 57, 0],
				[400, 400, 55, 57, 0],
				[600, 400, 55, 57, 0],
				[800, 400, 55, 57, 0],
				[1000, 400, 55, 57, 0],
			],
			animations: FISH_ANIMATIONS,
		}, {
			minDuration: 200,		//每次冲刺用的最小tick
			maxDuration: 1500,		//每次冲刺用的最大tick
			minRange: 100,			//每次冲刺最小距离
			maxRange: 400,			//每次冲刺最大距离
		}
	),
	'clownfish': new FishConfig(
		{
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				[0, 595, 22, 34]
			]
		}, {
			frames: [
				[200, 597, 55, 34, 0],
				[400, 597, 55, 34, 0],
				[600, 597, 55, 34, 0],
				[800, 597, 55, 34, 0],
				[1000, 597, 55, 34, 0],
			],
			animations: FISH_ANIMATIONS,
		}, {
			minDuration: 500,		//每次冲刺用的最小tick
			maxDuration: 1000,		//每次冲刺用的最大tick
			minRange: 50,			//每次冲刺最小距离
			maxRange: 400,			//每次冲刺最大距离
		}
	),
	'lanternfish': new FishConfig(
		{
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				[0, 800, 52, 114]
			]
		}, {
			frames: [
				[200, 800, 80, 114, 0],
				[400, 800, 80, 114, 0],
				[600, 800, 80, 114, 0],
				[800, 800, 80, 114, 0],
				[1000, 800, 80, 114, 0],
			],
			animations: FISH_ANIMATIONS,
		}, {
			minDuration: 800,		//每次冲刺用的最小tick
			maxDuration: 3000,		//每次冲刺用的最大tick
			minRange: 50,			//每次冲刺最小距离
			maxRange: 300,			//每次冲刺最大距离
		}
	),
	'shark': new FishConfig(
		{
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				[0, 1000, 84, 146]
			]
		}, {
			frames: [
				[200, 1000, 170, 146, 0],
				[400, 1000, 170, 146, 0],
				[600, 1000, 170, 146, 0],
				[800, 1000, 170, 146, 0],
				[1000, 1000, 170, 146, 0],
			],
			animations: FISH_ANIMATIONS,
		}, {
			minDuration: 10000,		//每次冲刺用的最小tick
			maxDuration: 20000,		//每次冲刺用的最大tick
			minRange: 800,			//每次冲刺最小距离
			maxRange: 1500,			//每次冲刺最大距离
		}
	),
	'sailfish': new FishConfig(
		{
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				[0, 1395, 38, 80]
			]
		}, {
			frames: [
				[200, 1395, 103, 80, 0],
				[400, 1395, 103, 80, 0],
				[600, 1395, 103, 80, 0],
				[800, 1395, 103, 80, 0],
				[1000, 1395, 103, 80, 0],
			],
			animations: FISH_ANIMATIONS,
		}, {
			minDuration: 500,		//每次冲刺用的最小tick
			maxDuration: 3000,		//每次冲刺用的最大tick
			minRange: 80,			//每次冲刺最小距离
			maxRange: 400,			//每次冲刺最大距离
		}
	),
	'globefish': new FishConfig(
		{
			frames: [
				// x, y, width, height, imageIndex*, regX*, regY*
				[0, 1605, 46, 90]
			]
		}, {
			frames: [
				[200, 1605, 100, 90, 0],
				[400, 1605, 100, 90, 0],
				[600, 1605, 100, 90, 0],
				[800, 1605, 100, 90, 0],
				[1000, 1605, 100, 90, 0],
			],
			animations: FISH_ANIMATIONS,
		}, {
			minDuration: 5000,		//每次冲刺用的最小tick
			maxDuration: 8000,		//每次冲刺用的最大tick
			minRange: 300,			//每次冲刺最小距离
			maxRange: 600,			//每次冲刺最大距离
		}
	)
};
