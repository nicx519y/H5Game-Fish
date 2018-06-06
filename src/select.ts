import { UtilUI } from './utilUI';
import { FontText } from './fontText';

export class Select extends createjs.Container {
	private text;
	private panel;
	private list;
	private panelState: boolean = false;

	render(value: string = '', config: Array<string> = []) {
		if(config.length <= 0) return;

		if(value === '')
			value = config[0];

		let base = UtilUI.getUtil('select');
		this.addChild(base);

		let star = UtilUI.getUtil('star');
		this.addChild(star);
		star.mouseEnabled = false;
		star.x = 10;
		star.y = 10;
		
		this.text = FontText.getSmallNumber(value);
		this.addChild(this.text);
		this.text.mouseEnabled = false;
		this.text.x = 55;
		this.text.y = 18;

		this.createPanel(value, config);

		base.addEventListener('click', this.togglePanel.bind(this));
		
		return this;
	}

	setValue(value: string) {
		this.text.text = value;
		this.list.setValue(value);
	}

	createPanel(value: string, config: Array<string>) {
		this.list = new SelectList().render(value, config);
		this.list.x = 10;
		this.list.y = 10;
		this.list.addEventListener('change', this.valueChangeHandler.bind(this));
		
		this.panel = new createjs.Container();
		let shape = new createjs.Shape();
		let height = this.list.getBounds().height + 20;
		shape.graphics.beginFill('#79411e')
			.setStrokeStyle(3)
			.beginStroke('#f28541')
			.drawRoundRect(0, 0, this.list.getBounds().width + 15, height, 20, 20, 20, 20)
			.endFill();
		shape.cache(0, 0, 300, height);
		this.panel.addChild(shape);
		this.panel.y = -height - 20;
		this.panel.visible = false;
		this.panel.addChild(this.list);
		this.addChild(this.panel);
	}

	createItem(value: string) {
		let base = new createjs.Container();
		let text = FontText.getSmallNumber(value);
		base.addChild(text);

	}

	openPanel() {
		if(this.panelState) return;
		this.panelState = true;
		this.panel.visible = true;
		this.panel.mouseEnabled = true;
	}

	closePanel() {
		if(!this.panelState) return;
		this.panelState = false;
		this.panel.visible = false;
	}

	togglePanel() {
		if(this.panelState)
			this.closePanel();
		else
			this.openPanel();
	}

	getValue(): string {
		return this.list.getValue();
	}

	valueChangeHandler(evt) {
		this.setValue(this.list.getValue());
		this.panel.mouseEnabled = false;
		setTimeout(this.closePanel.bind(this), 500);
	}
}

class SelectList extends createjs.Container {
	private _active;
	private _config;
	private _items: Array<any> = [];
	private _value: string = '';
	render(value: string = '', config: Array<string>) {
		this._config = config;
		this._value = value;

		this._config.forEach((val, key) => {
			let	item = new SelectItem().render(val, key < this._config.length - 1);	
			this.addChild(item);
			item.setActive(val === value);
			item.y = key * item.getBounds().height;
			item.addEventListener('fire', this.itemFireHandler.bind(this));
			this._items.push(item);
		});

		return this;
	}

	setValue(value: string) {
		if(this._value === value) return;
		this._value = value;
		this._items.forEach(item => item.setActive(item.getValue() === value));
		this.dispatchEvent('change');
	}

	getValue(): string {
		return this._value;
	}

	private itemFireHandler(event) {
		this.setValue((event.target as SelectItem).getValue());
	}
}

class SelectItem extends createjs.Container {
	private _value: string = '';
	private _width: number = 250;
	private _height: number = 70;
	private _activeIcon;
	render(value: string, hasLine: boolean = false) {
		this._value = value;
		let shape = new createjs.Shape();
		shape.graphics.beginFill('#79411e')
			.drawRect(0, 0, this._width, this._height)
			.endFill();
		if(hasLine) {
			shape.graphics.setStrokeStyle(2)
				.beginStroke('#643012')
				.moveTo(15, this._height)
				.lineTo(this._width - 15, this._height)
				.beginStroke('#965831')
				.moveTo(15, this._height + 2)
				.lineTo(this._width - 15, this._height + 2)
				.endStroke();
		}
		shape.cache(0, 0, this._width, this._height + 4);
		this.addChild(shape);
		let self = this;
		//事件代理
		shape.addEventListener('click', function() {
			self.dispatchEvent('fire');
		});

		let text = FontText.getSmallNumber(value);
		this.addChild(text);
		text.mouseEnabled = false;
		text.x = 60;
		text.y = 20;

		let star = UtilUI.getUtil('star');
		this.addChild(star);
		star.mouseEnabled = false;
		star.x = 15;
		star.y = 12;

		this._activeIcon = UtilUI.getUtil('active');
		this.addChild(this._activeIcon);
		this._activeIcon.x = this._width - 60;
		this._activeIcon.y = 14;
		this._activeIcon.mouseEnabled = false;
		this._activeIcon.visible = false;

		this.setBounds(0, 0, this._width, this._height + 4);
		return this;
	}

	setActive(isActive: boolean = false) {
		this._activeIcon.visible = isActive;
	}

	isActive(): boolean {
		return this._activeIcon.visible;
	}

	getValue() {
		return this._value;
	}
}