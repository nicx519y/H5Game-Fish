import { AssetsLoader } from './assetsLoader';


export class UtilUI {
	private static sheetConfig;
	private static init() {
		this.sheetConfig = new createjs.SpriteSheet({
			images: [
				AssetsLoader.assets['utils'],
				AssetsLoader.assets['utils_1'],
			],
			frames: [
				[0, 100, 175, 165, 0],
				[200, 100, 45, 45, 0],
				[300, 100, 45, 50, 0],
				[0, 0, 322, 75, 1],
				[103, 103, 55, 63, 1],
			],
			animations: {
				select: [0],
				star: [1],
				active: [2],
				fishPole: [3],
				shrimp: [4],
			}
		});
	}

	public static getUtil(key: string) {
		if(!this.sheetConfig) {
			this.init();
		}
		let sprite = new createjs.Sprite(this.sheetConfig);
		sprite.gotoAndStop(key);
		return sprite;
	}
}