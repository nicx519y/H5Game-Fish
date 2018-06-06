import { AssetsLoader } from './assetsLoader';
import { Background } from './background';
import { Fish, FishPond } from './fish';
import { ToolBar } from './toolBar';
import { MoneyField } from './moneyField';
import { Controller } from './controller';
import { Loading } from './loading';
import { ResultField } from './resultField';

export class Main {

    private stage;
    private stageWidth;
    private stageHeight;
    private loading;
    private bg;
    private fishPond;
    private toolBar;
    private moneyBar;
    private isRendered: boolean = false;

    private isInited: boolean = false;

    constructor(stageWidth: number, stageHeight: number) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        window.addEventListener('visibilitychange', () => createjs.Ticker.paused = this.isHidden());

        //切换RAF模式 会使动画更顺滑，但是 会导致调试时切换浏览器卡死
        // createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.framerate = 45;
        this.stage = new createjs.StageGL(document.getElementById('stage-canvas'));
        // this.stage = new createjs.Stage(document.getElementById('stage-canvas'));
        createjs.Touch.enable(this.stage);
        createjs.Ticker.on('tick', this.tickerHandler.bind(this));

        this.loading = new Loading().render(stageWidth, stageHeight);
        // this.loading.cache(0, 0, stageWidth, stageHeight);
        this.stage.addChild(this.loading);

        // 加载资源及初始化数据
        Promise.all([AssetsLoader.init(), Controller.dataInit(), Controller.getBalance()])
            .then(() => this.init());
    }

    private init() {
        console.log('Main init.');
        //根据窗口活动状态停止和开启更新
        this.stage.removeChild(this.loading);
        this.isInited = true;
    }

    private render() {
        if(this.isRendered) return;
        this.isRendered = true;
        // //画面自动更新
        this.bg = new Background();
        this.bg.render(this.stageWidth, this.stageHeight);

        this.toolBar = new ToolBar();
        this.toolBar.render();
        this.toolBar.y = this.stageHeight - this.toolBar.getBounds().height;
        this.toolBar.mainButton.on('click', () => this.fishingBeginHandler());
        
        this.moneyBar = new MoneyField().render(Controller.balance.toString());
        this.moneyBar.x = 50;
        this.moneyBar.y = 30;

        let fishPondConfig = Controller.initFishes;

        this.fishPond = new FishPond();
        this.fishPond.render(fishPondConfig, 0, 600, 640, this.stageHeight - this.toolBar.getBounds().height - 600 - 80);
        
        this.stage.addChild(this.bg);
        this.stage.addChild(this.fishPond);
        this.stage.addChild(this.toolBar);
        this.stage.addChild(this.moneyBar);

        this.moneyBar.addBtn.on('click', () => Controller.cashierPay());

    }

    private clear() {
        if(!this.isRendered) return;
        this.isRendered = false;
        this.stage.removeChild(this.bg);
        this.fishPond.clear();
        this.stage.removeChild(this.fishPond);
    }

    private tickerHandler(event) {
        if(!this.isHidden()) {
            this.isInited && this.render();
        } else {
            this.clear();
        }
        this.stage.update();
    }

    private fishingBeginHandler() {
        let bet = parseInt(this.toolBar.select.getValue(), 10);
        this.moneyBar.setValue(this.moneyBar.getValue() - bet);
        this.toolBar.mainButton.disabled = true;
        Controller.fishing(bet)
            .then((data) => this.fishPond.getFishes(data))      //钓鱼动画
            .then(() => this.moneyBar.tweenToValue(Controller.balance))         //金币动画
            .then(() => this.toolBar.mainButton.disabled = false)  //按钮状态恢复
            .catch(data => {
                if(data === 1) {        //用户没钱
                    Controller.cashierPay();
                }
            });
    }
    private getHiddenProp(){
        var prefixes = ['webkit','moz','ms','o'];
        
        // if 'hidden' is natively supported just return it
        if ('hidden' in document) return 'hidden';
        
        // otherwise loop over all the known prefixes until we find one
        for (var i = 0; i < prefixes.length; i++){
            if ((prefixes[i] + 'Hidden') in document) 
                return prefixes[i] + 'Hidden';
        }
     
        // otherwise it's not supported
        return null;
    }

    /**
     * 获取视窗状态
     */
    private isHidden() {
        var prop = this.getHiddenProp();
        if (!prop) return false;
        
        return document[prop];
    }

}


window.addEventListener('load', function() {
    setTimeout(() => new Main(640, window.innerHeight) ,0);
});

