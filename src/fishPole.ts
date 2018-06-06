import { UtilUI } from './utilUI';
import { resolve } from 'url';

export class FishPole extends createjs.Container {
	private box;
	private pole;		//鱼竿
	private tape;		//鱼线
	private shrimp;		//虾
	render() {

		this.pole = UtilUI.getUtil('fishPole');

		let bounds = this.pole.getBounds();
		this.pole.x = - bounds.width;
		this.pole.y = - 30;
		this.addChild(this.pole);

		this.tape = new createjs.Shape();
		this.tape.graphics.beginFill('#40625a')
			.drawRect(0, 0, 2, 250)
			.endFill();
		this.tape.cache(0, 0, 2, 250);
		this.tape.x = - bounds.width;
		this.tape.y = 7;
		this.addChild(this.tape);

		this.shrimp = UtilUI.getUtil('shrimp');
		this.shrimp.x = - bounds.width - 28;
		this.shrimp.y = 235;
		this.addChild(this.shrimp);

		this.reset();
		return this;
	}

	reset() {
		this.rotation = 90;
		this.tape.scaleY = 0;
		this.shrimp.y = 15;
		this.shrimp.visible = false;
		this.visible = false;
	}

	run(): Promise<any> {
		this.visible = true;
		let self = this;
		let promiseList: Array<any> = [];
		promiseList.push(
			new Promise( resolve =>
				createjs.Tween.get(this, { override: true })
					.to({ rotation: 0 }, 300)
					.call(() => {
						self.shrimp.visible = true;
						resolve();
				})
		));

		promiseList.push(
			new Promise( resolve => 
				createjs.Tween.get(this.tape, { override: true })
					.wait(300)
					.to({ scaleY: 1 }, 300)
					.call(() => resolve())
		));

		promiseList.push(
		new Promise(resolve => 
			createjs.Tween.get(this.shrimp, { override: true })
				.wait(300)
				.to({ y: 235 }, 300)
				.call(() => resolve())
		));

		return Promise.all(promiseList);
	}

}