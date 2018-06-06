import { AssetsLoader } from './assetsLoader';
import { Select } from './select';
import { FontText } from './fontText';
import { Controller } from './controller';

export class ToolBar extends createjs.Container {

	public mainButton;
	public select;
	private btnHelper;

	render() {
		let bitmap = new createjs.Bitmap(AssetsLoader.assets['toolbar']);
		this.addChild(bitmap);

		//设置边框属性
		let bounds = bitmap.getBounds();
		this.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

		this.mainButton = new MainButton().render();
		this.addChild(this.mainButton);
		//居中
		this.mainButton.x = (bitmap.getBounds().width - this.mainButton.getBounds().width) / 2;

		let betList = Controller.data['betList'] || [];
		if(betList.length > 0) {
			this.select = new Select().render(betList[0], betList);
			this.addChild(this.select);
			this.select.x = 20;
			this.select.y = 22;
		}
	}

}

class MainButton extends createjs.Container {
	private helper;
	private btn;
	render() {
		let asset = AssetsLoader.assets['mainButton'];
		let base = new createjs.Sprite(
			new createjs.SpriteSheet({
				images: [asset],
				frames: [
					[0, 402, 208, 96]
				]
			})
		);
		let text = FontText.getText('出竿');
		this.btn = new createjs.Sprite(
			new createjs.SpriteSheet({
				images: [asset],
				frames: [
					[0, 0, 176, 92],
					[0, 100, 176, 92],
					[0, 200, 175, 92],
				],
				animations: {
					out: [0],
					down: [1],
					disabled: [2],
				}
			})
		);

		this.addChild(base);
		this.addChild(this.btn);
		this.addChild(text);

		this.btn.x = 15;
		this.btn.y = -10;

		this.helper = new createjs.ButtonHelper(this.btn, 'out', 'out', 'down', false);

		text.letterSpacing = 2;
		text.x = this.btn.x + (this.btn.getBounds().width - text.getBounds().width) / 2;
		text.y = this.btn.y + (this.btn.getBounds().height - text.getBounds().height) / 2;
		
		base.mouseEnabled = false;
		text.mouseEnabled = false;

		

		// this.btn.gotoAndStop('disabled');

		return this;
	}

	set disabled(isDisabled: boolean) {
		if(isDisabled) {
			this.helper.enabled = false;
			this.btn.mouseEnabled = false;
			this.btn.touchEnabled = false;
			this.btn.gotoAndStop('disabled');
		} else {
			this.btn.mouseEnabled = true;
			this.btn.touchEnabled = true;
			this.helper.enabled = true;
			this.btn.gotoAndStop('out');
		}
	}
}