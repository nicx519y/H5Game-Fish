import { AssetsLoader } from './assetsLoader';
import { FontText } from './fontText';
import { resolve } from 'url';

export class ResultField extends createjs.Container {
	private base;
	private textField;
	private balanceField;
	render() {
		let sheet = new createjs.SpriteSheet({
			images: [ AssetsLoader.assets['resultField'] ],
			frames: [[0, 0, 215, 55]],
		});
		this.base = new createjs.Sprite(sheet);
		this.base.visible = false;
		this.base.gotoAndStop(0);
		this.addChild(this.base);

		this.textField = FontText.getResultText('');
		this.textField.letterSpacing = -10;
		this.textField.visible = false;
		this.textField.y = -18;
		this.addChild(this.textField);

		this.balanceField = FontText.getResultText('');
		this.balanceField.letterSpacing = -10;
		this.balanceField.visible = false;
		this.balanceField.y = -100;
		this.addChild(this.balanceField);


		return this;
	}

	showResult(text: string, win: number): Promise<any> {

		if(text === '')
			return new Promise(resolve => resolve());

		console.log('Show result: ' + text + ', user win: ' + win);

		this.base.visible = true;
		this.base.alpha = 1;
		this.textField.visible = true;
		this.textField.alpha = 1;
		this.balanceField.visible = true;
		this.balanceField.alpha = 1;

		let baseW = this.base.getBounds().width;
		this.base.x = - baseW;

		this.textField.text = text;
		let textW = this.textField.getBounds().width;
		this.textField.x = - textW;

		this.balanceField.text = '+' + win;
		let balanceW = this.balanceField.getBounds().width;
		this.balanceField.x = - balanceW;

		let p1 = new Promise((resolve, reject) => {
			createjs.Tween.get(this.base, { override: true })
				.to({ x: 50 }, 500, createjs.Ease.quartOut)
				.wait(2000)
				.to({ alpha: 0 }, 500)
				.call(() => resolve());
		});

		let p2 = new Promise((resolve, reject) => {
			createjs.Tween.get(this.textField, { override: true })
				.wait(500)
				.to({ x: 20 }, 500, createjs.Ease.quartOut)
				.wait(1500)
				.to({ alpha: 0 }, 500)
				.call(() => resolve());
		});

		let p3 = new Promise(resolve => {
			createjs.Tween.get(this.balanceField, { override: true })
				.wait(1000)
				.to({x: 20}, 500, createjs.Ease.quartOut)
				.wait(1000)
				.to({alpha: 0}, 500)
				.call(() => resolve());
		});

		return Promise.all([p1, p2, p3]);
	}
}