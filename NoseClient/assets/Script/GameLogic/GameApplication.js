var Player = require("../GameLogic/Player");
var GameView = require("../UI/GameView");
var ResultView = require("../UI/ResultView");
var SoundManager = require("../GameLogic/SoundManager");

cc.Class({
    extends: cc.Component,

    properties: {
        soundManager:{
            default:null,
            type:SoundManager,
        },
        player1 : Player,
        player2 : Player,
        gameView:GameView,
        resultView:ResultView,
        resultNode:{
            default:null,
            type:cc.Node,
        },
        rankView:{
            default:null,
            type:cc.Node,
        },
        fbFailView:{
            default:null,
            type:cc.Node,
        },
        highest:{
            default:0,
            type:cc.Integer,
        },
        isQuit:false,
        timestamp:{
            default: 0,
            type: cc.Integer,
        },
        host:"",
        port:"",
        manualDisconnect:false,

    },

    start () {
        SDK().init();
    },

    update(){
    },

    onLoad () {
        var self = this;
        var online = false;
        if(!online){
            //单机玩
            //获取最高分
            SDK().getItem(1,function(score){
                self.highest = score;
            });
            this.gameView.gameApplication = this;
            this.resultView.gameApplication = this;
            this.enterGame();
        }
    },

    //进入游戏
    enterGame:function(){
        var self = this;
        self.gameView.showView(self.gameView.node,0.3,true);
        SDK().getItem(100,function(val){
            if(val != 1){
                self.gameView.Guide(true);
                SDK().setItem({100:1});
            }else{
                self.gameView.LoadGame();
            }
        });
    },

    //游戏结束
    endGame(isWin){
        this.gameView.status = 3;
        this.gameView.showView(this.resultNode,0.3,true);
        this.resultView.showResult(isWin);
        this.gameView.playTimes++;
    },


});
