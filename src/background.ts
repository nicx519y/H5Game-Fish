import { AssetsLoader } from './assetsLoader';
import { Water } from './water';

export class Background extends createjs.Container {
	public render(width, height) {
		let bg = new createjs.Bitmap(AssetsLoader.assets['bg']);
		bg.y = -325;
		this.addChild( bg );
		// bg.y = height - bg.getBounds().height;

		//水动画
		let water1 = new Water();
		water1.render(['rgb(25,212,120)', 'rgb(21,109,137)'], [0, 1], width, 8, 2300);
		water1.y = 342;
		this.addChild(water1);

		let water2 = new Water();
		// water2.render(['rgb(29,173,147)', 'rgb(30,187,149)', 'rgb(21,109,137)'], [0, 0.08, 1], 640, 6, 180);
		water2.render(['rgb(29,173,147)', 'rgb(30,187,149)', 'rgb(20,95,135)'], [0, 0.08, 0.4], width, 12, 2500);
		water2.y = 380;
		this.addChild(water2);

		// 海草
		let seaweed = new createjs.Bitmap(AssetsLoader.assets['seaweed']);
		// seaweed.y = 450;
		this.addChild(seaweed);
		seaweed.y = height - seaweed.getBounds().height;

		//钓鱼台
		let table = new createjs.Bitmap(AssetsLoader.assets['table']);
		table.x = width - 138;
		table.y = 205;
		this.addChild( table );

	}

	
}