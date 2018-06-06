// import { AssetsLoader } from './assetsLoader';
// import { WaterMask } from './waterMask';

export class Water extends createjs.Container {
	private box;	//水的mask，负责水浮动动画
	private width: number = 0;
	private height: number = 0;
	private duration: number = 0;
	private color: string = '#000000';
	/**
	 * 
	 * @param width 水的宽度，一般设置为和屏幕宽度相等
	 * @param height 水的波浪高度
	 * @param y 水的背景图片纵坐标
	 * @param framerate 水波横向移动速度，数值越大越慢
	 */
	render(colors: Array<string>, radios: Array<number>, width: number = 640, height: number = 10, duration: number = 100) {
		this.width = width;
		this.height = height;
		this.duration = duration;

		// 添加渐变色
		this.box = new createjs.Shape();

		this.box.graphics.beginLinearGradientFill(
			colors, radios, 0, 0, 0, 2000
		)
			.moveTo(0, 0)
			.bezierCurveTo(width / 3, height, width * 2 / 3, height, width, 0)
			.bezierCurveTo(width * 4 / 3, - height, width * 5 / 3, - height, width * 2, 0)
			.bezierCurveTo(width * 7 / 3, height, width * 8 / 3, height, width * 3, 0)
			.lineTo(width * 3, 1000)
			.lineTo(0, 1000)
			.lineTo(0, 0)
			.closePath()
			.endFill();

		// this.box.cache(0,y - this.height, width * 3, 1000);
		this.box.cache(0, -height, width * 3, 1000);
		this.addChild(this.box);

		createjs.Tween.get(this.box, { override: true, loop: true })
			.to({ x: -2*width }, duration);

	}
}