import { Icons } from './icons';

//启动引导动画插件
createjs.MotionGuidePlugin.install();

export class CoinTween extends createjs.Container {

	private total = 15;

	render() {
		return this;
	}

	/**
	 * 金币动画
	 */
	run(): Promise<any> {

		let promiseList: Array<Promise<any>> = [];
		for(let i = 0; i < this.total; i ++) {
			let icon = Icons.getIcon('star');
			this.addChild(icon);
			icon.x = -200;
			icon.y = 120;

			let n = Math.random() * 120 - 50;
			promiseList.push(
				new Promise(reject => {
					createjs.Tween.get(icon, { override: true })
						.wait(80*i)
						.to({ guide: { path: [-100, 180, 40, 230, 80, 60] } }, 500)
						.to({ guide: { path: [80, 50, n+80, -100, n*2+80, 60] }, alpha: 0.7}, 400)
						.to({ alpha: 0 }, 500)
						.call(() => {
							this.removeChild(icon);
							reject();
						});
				})
			);
		}

		return Promise.all(promiseList);
	}
}