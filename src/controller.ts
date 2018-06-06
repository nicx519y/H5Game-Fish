import { debug } from "util";
var Sdk = require('tools-cashier');

const HOST: string = 'http://59.110.143.218';
const DATA_INIT_URL: string = HOST + '/game/get-betting-amount';
const FISHING_URL: string = HOST + '/game/begin-fishing';
const USER_BALANCE_URL: string = HOST + '/user/balance';
var userId: string = '12345678';
var openId: string = '';
var accessToken: string = '';

function getCookie(name) : any
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

export class Controller {

	private static _data = {
		betList: [],
		fishList: [],
	};

	private static _balance;

	static fetch(url: string, config:any=null): Promise<any> {
		userId = getCookie('userId');
		openId = getCookie('openId');
		accessToken = getCookie('accessToken');
		return new Promise((resolve, reject) => {
			let _config = {
				method: "post",
				headers: new Headers({
					"Content-Type": "application/x-www-form-urlencoded"
				}),
			};

			for(let i in config) {
				_config[i] = config[i];
			}

			fetch(url, _config).then(response => {
				response.json()
					.then(data => {
						if(data.error.returnCode != 0) {
							alert(data['data']);
							reject(data.error.returnCode);
						} else {
							resolve(data['data']);
						}
					});
			}, error => {
				console.log(error);
				reject(error);
			});
		});
	}

	static dataInit(): Promise<any> {
		console.log('Begin data init!');
		return this.fetch(DATA_INIT_URL, { 
			body: "gameType=fishing&userId=" + userId
		}).then(data => {
			this._data = data;
		});
	}

	static fishing(bet: number): Promise<any> {
		return new Promise(((resolve, reject) => {
			this.fetch(FISHING_URL, {
				body: 'betAmount=' + bet + '&userId=' + userId
			}).then(data => {
				this._balance = data['user_balance'];
				resolve(data);
			}).catch(errorCode => reject(errorCode));
		}));
	}

	static getBalance(): Promise<any> {
		return new Promise(resolve => {
			this.fetch(USER_BALANCE_URL, { body: 'userId=' + userId })
				.then(data => {
					this._balance = data.balance || 0;
					console.log('Get balance: ' + data.balance);
					resolve(data.balance);
				});
		});
	}

	static get data() {
		return this._data;
	}

	static get initFishes(): Array<any> {
		let fishes: Array<any> = [];
		let data = this.data['fishList'];
		for(let key in data) {
			fishes.push({
				'key': key.toString(),
				'count': data[key]['available_num'],
			});
		}
		return fishes;
	}

	static get balance(): number {
		return this._balance;
	}

	static cashierPay(): Promise<any> {
		return new Promise(resolve => Sdk.cashierPay(result => resolve(result)));
	}
}