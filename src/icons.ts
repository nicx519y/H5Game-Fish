import { AssetsLoader } from './assetsLoader';

export class Icons {
	private static sheetConfig;

	private static init() {
		if(this.sheetConfig) return;
		this.sheetConfig = {
			images: [AssetsLoader.assets['icons']],
			frames: [
				[0, 102, 65, 62],
				[98, 102, 62, 62],
				[5, 871, 635, 75],
			],
			animations: {
				add: [0],
				star: [1],
				bar: [2],
			}
		}
	}

	public static getIcon(key: string) {
		if(!this.sheetConfig)
			this.init();

		let sprite = new createjs.Sprite(
			new createjs.SpriteSheet(this.sheetConfig)
		);
		sprite.gotoAndStop(key);
		return sprite;
	}
}