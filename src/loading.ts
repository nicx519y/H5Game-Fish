// import { AssetsLoader } from './assetsLoader';

export class Loading extends createjs.Container {

	private _width: number = 0;
	private _height: number = 0;

	render(width: number, height: number) {
		this._width = width;
		this._height = height;

		let base = new createjs.Shape();
		base.graphics.beginLinearGradientFill(['#ceeffe','#0c5871'],[0,1], 0, 0, width, height)
			.drawRect(0, 0, width, height)
			.endFill();
		base.cache(0, 0, width, height);
		this.addChild(base);

		let image = new Image();
		image.onload = (evt) => this.renderIcon(evt);
		image.src = './assets/10-08-58.png';

		return this;
	}
	
	private renderIcon(evt) {
		let icon = new createjs.Sprite(
			new createjs.SpriteSheet({
				images: [evt.target],
				frames: [[395, 0, 159, 124, 0]],
			})
		);
		icon.gotoAndStop(0);
		this.addChild(icon);
		let bounds = icon.getBounds();

		let h1 = (this._height - bounds.height) / 2 - bounds.height / 2;
		let h2 = h1 - 40;

		icon.x = (this._width - bounds.width) / 2;
		icon.y = h1;

		createjs.Tween.get(icon, { override: true, loop: true })
			.to({ y: h2 }, 1000)
			.to({ y: h1 }, 1000);
	}
}