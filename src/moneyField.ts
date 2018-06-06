import { Icons } from './icons';
import { FontText } from './fontText';
import { CoinTween }  from './coinTween';
import { Controller } from 'controller';

export class MoneyField extends createjs.Container {
	public addBtn;
	private _textField;
	private _minWidth: number = 100;
	private _value: number = 0;
	private _tickDuration: number = 1;		//动画帧间隔
	private coinTween;

	render(value) {
		this._value = value;

		let bar = Icons.getIcon('bar');
		bar.x = - 38;
		bar.y = - 6;
		bar.mouseEnabled = false;
		this.addChild(bar);

		let star = Icons.getIcon('star');
		star.x = -30;
		star.y = 0;
		star.mouseEnabled = false;
		this.addChild(star);

		this.addBtn = Icons.getIcon('add');
		this.addBtn.x = this._minWidth;
		this.addBtn.y = -2;
		this.addChild(this.addBtn);

		this._textField = FontText.getLargeNumber(value);
		this._textField.mouseEnabled = false;
		this._textField.letterSpacing = -8;
		this._textField.x = 35;
		this._textField.y = 5;
		this.addChild(this._textField);

		this.resize();

		this._toValue = parseInt(value, 10);
		this._textField.shadow = new createjs.Shadow("#000000", 3, 3, 15);

		this.coinTween = new CoinTween().render();
		this.addChild(this.coinTween);

		this.resize();
		return this;
	}

	private set tweenValue(value: number) {
		this._textField.text = Math.floor(value).toString();
		this.resize();
	}

	private get tweenValue(): number {
		return parseInt(this._textField.text, 10);
	}

	private resize() {
		let textBounds = this._textField.getBounds();
		this.addBtn.x = Math.min(textBounds.width + 35, 600);
	}

	/**
	 * 动画变换到一个value显示
	 * @param value 需要变换到的值显示
	 */
	public tweenToValue(value: number): Promise<any> {

		if(value === this.getValue())	//如果值不变，立即返回
			return new Promise(reject => reject());

		this._value = value;
		let p1 = new Promise(reject => {
			createjs.Tween.get(this, { override: true })
				.to({ tweenValue: value }, 1500)
				.call(() => reject())
				.on('change', () => this.resize());
		});
		let p2 = this.coinTween.run();
		return Promise.all([p1, p2]);
	}

	public setValue(value: number) {
		this._value = value;
		this._textField.text = value.toString();
	}

	public getValue(): number {
		return this._value;
	}

}