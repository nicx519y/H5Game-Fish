import { AssetsLoader } from './assetsLoader';

export class FontText {
	private static textSheetConfig;
	private static smallNumSheetConfig;
	private static largeNumSheetConfig;
	private static resultTextSheetConfig;
	private static textInit() {
		this.textSheetConfig = new createjs.SpriteSheet({
			images: [AssetsLoader.assets['font']],
			frames: [
				[0, 48, 36, 42],
				[42, 48, 40, 42],
			],
			animations: {
				'出': { frames: [0] },
				'竿': { frames: [1] },
			},
		});
	}
	private static smallNumberInit() {
		this.smallNumSheetConfig = new createjs.SpriteSheet({
			images: [AssetsLoader.assets['font']],
			frames: [
				[0, 109, 14, 29],
				[18, 109, 17, 29],
				[40, 109, 17, 29],
				[60, 109, 17, 29],
				[83, 109, 17, 29],
				[103, 109, 17, 29],
				[126, 109, 17, 29],
				[147, 109, 17, 29],
				[169, 109, 17, 29],
				[190, 109, 17, 29],
			],
			animations: {
				'1': { frames: [0] },
				'2': { frames: [1] },
				'3': { frames: [2] },
				'4': { frames: [3] },
				'5': { frames: [4] },
				'6': { frames: [5] },
				'7': { frames: [6] },
				'8': { frames: [7] },
				'9': { frames: [8] },
				'0': { frames: [9] },
			}
		});
	}

	private static largeNumberInit() {
		this.largeNumSheetConfig = new createjs.SpriteSheet({
			images: [AssetsLoader.assets['font']],
			frames: [
				[-2, 144, 35, 54],
				[42, 144, 42, 54],
				[92, 144, 42, 54],
				[141, 144, 42, 54],
				[191, 144, 42, 54],
				[238, 144, 42, 54],
				[291, 144, 42, 54],
				[338, 144, 42, 54],
				[388, 144, 42, 54],
				[438, 144, 42, 54],
			],
			animations: {
				'1': { frames: [0] },
				'2': { frames: [1] },
				'3': { frames: [2] },
				'4': { frames: [3] },
				'5': { frames: [4] },
				'6': { frames: [5] },
				'7': { frames: [6] },
				'8': { frames: [7] },
				'9': { frames: [8] },
				'0': { frames: [9] },
			}
		});
	}

	private static resultTextInit() {
		this.resultTextSheetConfig = new createjs.SpriteSheet({
			images: [ AssetsLoader.assets['resultField'] ],
			frames: [
				[0, 219, 43, 56],
				[51, 219, 35, 56],
				[96, 219, 43, 56],
				[146, 219, 43, 56],
				[195, 219, 43, 56],
				[246, 219, 43, 56],
				[296, 219, 43, 56],
				[347, 219, 43, 56],
				[397, 219, 43, 56],
				[450, 219, 43, 56],
				[500, 219, 45, 56],
				[0, 286, 55, 57],
				[59, 286, 55, 57],
				[116, 286, 55, 57],
				[179, 286, 51, 57],
				[235, 286, 58, 57],
				[300, 286, 55, 57],
				[360, 286, 51, 57],
				[414, 286, 60, 57],
				[474, 286, 60, 57],
				[535, 286, 60, 57],
				[595, 286, 60, 57],
				[655, 286, 58, 57],
				[713, 286, 60, 57],
				[775, 286, 58, 57],
				[834, 286, 60, 57],
			],
			animations: {
				'0': [0],
				'1': [1],
				'2': [2],
				'3': [3],
				'4': [4],
				'5': [5],
				'6': [6],
				'7': [7],
				'8': [8],
				'9': [9],
				'+': [10],
				'一': [11],
				'竿': [12],
				'鱼': [13],
				'小': [14],
				'丑': [15],
				'比': [16],
				'目': [17],
				'河': [18],
				'豚': [19],
				'金': [20],
				'灯': [21],
				'笼': [22],
				'旗': [23],
				'鲨': [24],
				'枪': [25],
			}
		});
	}

	public static getText(text: string) {
		if(!this.textSheetConfig) {
			this.textInit();
		}
		return new createjs.BitmapText(text, this.textSheetConfig);
	}
	public static getSmallNumber(num: string) {
		if(!this.smallNumSheetConfig) {
			this.smallNumberInit();
		}
		return new createjs.BitmapText(num, this.smallNumSheetConfig);		
	}
	public static getLargeNumber(num: string) {
		if(!this.largeNumSheetConfig) {
			this.largeNumberInit();
		}
		return new createjs.BitmapText(num, this.largeNumSheetConfig);
	}
	public static getResultText(text: string) {
		if(!this.resultTextSheetConfig) {
			this.resultTextInit();
		}
		return new createjs.BitmapText(text, this.resultTextSheetConfig);
	}
}