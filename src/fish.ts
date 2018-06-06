import { FishConfig, FISH_CONFIGS } from './fishConfig';
import { AssetsLoader } from './assetsLoader';
import { FishPole } from './fishPole';
import { ResultField } from './resultField';
import { Controller } from './controller';


function randomRange(min, max): number {
	return Math.random() * (max - min) + min;
}

function randomRangeInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export class Fish extends createjs.Container{

	private _state: boolean = false;
	private _head;
	private _body;
	private _config;
	private _turnbacked: boolean = false;	//是否刚刚翻转过
	private _waited: boolean = false;

	render(image: any, config: FishConfig) {
		if(this._state === true) {
			this.destroy();
		}
		this._config = config;
		this._state = true;

		let headSheet = new createjs.SpriteSheet({
			images: [image],
			frames: config.headSheet.frames,
		});
		this._head = new createjs.Sprite(headSheet);

		let headBounds = this._head.getBounds();

		let bodySheet = new createjs.SpriteSheet({
			images: [image],
			frames: config.bodySheet.frames,
			animations: config.bodySheet.animations,
		});

		this._body = new createjs.Sprite(bodySheet, 'run');
		let bodyBounds = this._body.getBounds();
		this._body.x = headBounds.width;		//获取head的宽度

		this.addChild(this._head, this._body);

		let fishWidth = headBounds.width + bodyBounds.width;
		let fishHeight = Math.max(headBounds.height, bodyBounds.height);
		//注册中心点
		this._head.x -= fishWidth  / 2;
		this._body.x -= fishWidth / 2;
		this._head.y -= fishHeight / 2;
		this._body.y -= fishHeight / 2;
	}

	destroy() {
		this.removeChild(this._body, this._head);
	}

	/**
	 * 冲刺
	 */
	forward() {
		let swimConfig = this._config.swimSpeed;
		let duration = randomRange(swimConfig.minDuration, swimConfig.maxDuration);
		let distance = randomRange(swimConfig.minRange, swimConfig.maxRange);
		let direction = - this.scaleX;
		let isSprint = randomRangeInt(0, 3) === 0;		//有1/4的概率，鱼会进行冲刺
		let tweenType = isSprint? createjs.Ease.quartOut: createjs.Ease.linear;
		createjs.Tween.get(this, { override: true })
			.to({ x: this.x + distance * direction }, duration, tweenType)
			.call(this.tweenCompleteHandler.bind(this));
	}

	/**
	 * 转身
	 */
	turnback() {
		this._turnbacked = true;
		createjs.Tween.get(this, { override: true })
			.to({ scaleX: - this.scaleX }, 300)
			.call(this.tweenCompleteHandler.bind(this));
	}

	waitfor() {
		// this._waited = true;
		createjs.Tween.get(this, { override: true })
			.wait(randomRange(50, 2000))
			.call(() => this.tweenCompleteHandler())
	}

	/**
	 * 被钓鱼
	 */
	fishing(x: number, y: number, wait: number): Promise<Fish> {
		// if(this.x - x)
		let self = this;
		let promise;
		let scaleX = (this.x > x) ? 1 : -1;
		return new Promise((resolve) => {
			createjs.Tween.removeTweens(this);
			createjs.Tween.get(this, { override: true })
				.wait(wait)
				.to({ scaleX: scaleX }, 300)
				.wait(500)
				.to({ x: x }, 1000, createjs.Ease.quartOut)
				.to({ rotation: 90 * scaleX }, 300)
				.to({ y: y }, 1000, createjs.Ease.quartOut)
				.call(() => resolve(self));
		});
	}

	tweenCompleteHandler() {
		if(randomRangeInt(0, 4) == 0) {
			this.waitfor();
		} else if(this._turnbacked) {
			this._turnbacked = false;
			this.forward();
		} else {
			let dir: number = this.getDirection();
			if(dir == - this.scaleX) {
				this.forward();
			} else {
				this.turnback();
			}
		}
	}

	/**
	 * 启动
	 */
	start() {
		this.tweenCompleteHandler();
	}

	private getDirection(): number {
		if(this.x < -640) {
			return 1;
		}

		if(this.x > 1280) {
			return -1;
		}

		let r = randomRange(-640, 1280);
		if(r < this.x) {
			return -1;
		} else {
			return 1;
		}
	}
}

export class FishFactroy {
	private static cacheState: boolean = false;
	private static image ;
	static createFish(fishType: string): Fish {
		this.image = AssetsLoader.assets['fishs'];
		let fish: Fish = new Fish();
		fish.render(this.image, FISH_CONFIGS[fishType]);
		return fish;
	}
}

export class FishPond extends createjs.Container {

	private fishes = {};
	private fishPole;
	private _x;
	private _y;
	private _width;
	private _height;
	private resultField;

	render(fishPondConfig: Array<any>, x: number, y: number, width: number, height: number) {
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;

		this.fishPole = new FishPole().render();
        let bounds = this.fishPole.getBounds();
        this.fishPole.x = 640;
		this.fishPole.y = 160;
		this.addChild(this.fishPole);
		
		// console.log(FISH_POND_CONFIG);
		fishPondConfig.forEach(config => {
			for(let i = 0; i < config.count; i ++) {
				let fish: Fish = FishFactroy.createFish(config.key);
				fish.x = randomRange(- width, width * 2) + x;
				fish.y = randomRange(0, height) + y;
				//根据坐标设定初始方向
				if(fish.x >= width / 2) {
					fish.scaleX = 1;
				} else {
					fish.scaleX = -1;
				}
				this.addChild(fish);
				fish.start();
				
				if(typeof this.fishes[config.key] !== 'object') {
					this.fishes[config.key] = [];
				}
				//写入索引
				this.fishes[config.key].push(fish);
			}
		});

		this.resultField = new ResultField().render();
		this.resultField.y = 500;
		this.addChild(this.resultField);
		
	}

	clear() {
		this.removeAllChildren();
		this.fishes = {};
	}

	/**
	 * 钓鱼
	 * @param config key value，指定需要找的鱼的号码和个数
	 */
	getFishes(config): Promise<any> {

		console.log('Fishing data: ', config);

		let fishList = config['fish_list'];
		let win = config['win'];
		let data = [];
		let promiseList: Array<Promise<any>> = [];

		promiseList.push(this.fishPole.run());

		for(let key in this.fishes) {
			let fishes = this.fishes[key];
			if(typeof fishes === 'object' && fishes.length >= 0 && key in fishList) {
				let num = fishList[key];
				data = data.concat(fishes.slice(0, num));
			}
		}

		if(data.length >= 1) {
			data.forEach(
				(fish, key) => promiseList.push((fish as Fish).fishing(320, 480 + key * 50, key * 1000))
			);
		} else {
			//sleep 3000
			promiseList.push(new Promise(reject => { setTimeout(() => { reject() }, 3000) }));
		}

		return Promise.all(promiseList)
			.then(() => this.showResult(fishList, win))
			.then(() => this.hidePole(data));
	}

	/**
	 * 隐藏鱼竿
	 * @param fishes 被钓走的鱼
	 */
	private hidePole(fishes): Promise<any> {
		let promiseList: Array<any> = [];
		
		promiseList.push(
			new Promise<any>(resolve => createjs.Tween.get(this.fishPole, { override: true })
				// .wait(3000)
				.to({ y: -350 }, 200)
				.call(() => resolve()))
		);
		
		fishes.forEach(fish => 
			promiseList.push(
				new Promise<any>(resolve => createjs.Tween.get(fish, { override: true })
					// .wait(3000)
					.to({ y: -100 }, 200)
					.call(() => resolve()))
			)
		);

		return Promise.all(promiseList)
			.then(() => {
				return new Promise(resolve => {
				this.reset(fishes);
				resolve();
			})
		});
	}

	private showResult(resultData, win: number): Promise<any> {
		let total = 0;
		let resultText: string = '';
		for(let i in resultData) {
			total += parseInt(resultData[i], 10);
		}
		if(total > 1) {
			resultText = '一竿' + total + '鱼';
		} else if(total === 1) {
			for(let i in resultData) {
				resultText = Controller.data['fishList'][i]['fish_name'];
				break;
			}
		}
		return this.resultField.showResult(resultText, win);
	}

	/**
	 * 还原，将被钓走的鱼重启动
	 * @param fishes 被钓走的鱼
	 */
	private reset(fishes) {
		this.fishPole.x = 640;
		this.fishPole.y = 160;
		this.fishPole.reset();

		fishes.forEach(fish => {
			fish.rotation = 0;
			fish.x = -100;
			fish.y = randomRange(0, this._height) + this._y;
			fish.start();
		});
	}
}