const ASSETS_SRC_CONFIG = { 
	bg: './assets/10-08-43.jpg',
	table: './assets/10-08-52.png',
	seaweed: './assets/10-09-42.png',
	water: './assets/10-08-54.png',
	fishs: './assets/10-09-11.png',
	toolbar: './assets/10-09-29.png',
	mainButton: './assets/10-09-35.png',
	font: './assets/text.png',
	utils: './assets/10-09-44.png',
	utils_1: './assets/10-09-40.png',
	icons: './assets/10-09-21.png',
	loading: './assets/10-08-58.png',
	resultField: './assets/10-10-09.png',
};

export class AssetsLoader {

	private static _assets = {};
	/**
	 * 开始加载资源
	 */
	public static init(): Promise<any> {
		let promiseAll: Array<Promise<any>> = [];
		let self = this;
		for(let key in ASSETS_SRC_CONFIG) {
			this._assets[key] = new Image();
			this._assets[key].src = ASSETS_SRC_CONFIG[key];
			let promise: Promise<any> = new Promise((resolve, reject) => {
				this._assets[key].onload = (evt) => resolve(self);
			});
			promiseAll.push(promise);
		}
		//监听所有资源加载状态
		return Promise.all(promiseAll);
	}

	/**
	 * 获取资源图片，readonly
	 */
	static get assets() {
		return this._assets;
	}
}