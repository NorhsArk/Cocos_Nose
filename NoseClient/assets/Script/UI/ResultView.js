cc.Class({
    extends: cc.Component,

    properties: {
        gameApplication:{
            default:null,
        },
        win25Node:{
            default:null,
            type:cc.Node,
        },
        lostNode:{
            default:null,
            type:cc.Node,
        },
        winBg:{
            default:null,
            type:cc.Node,
        },
        //失败界面
        lostMain:{
            default:null,
            type:cc.Node,
        },
        lostFront:{
            default:null,
            type:cc.Node,
        },
        lostText:{
            default:null,
            type:cc.RichText,
        },
        //按钮
        rankBtn:{
            default:null,
            type:cc.Node,
        },
        replayBtn:{
            default:null,
            type:cc.Node,
        },
        inviteBtn:{
            default:null,
            type:cc.Node,
        },
        isCanClickBtn:{
            default:false,
            type:cc.Boolean,
        },
    },

    start () {
        var self = this;
    },

    showBtn(isShow,type){
        if(type){
            this.gameApplication.gameView.showView(this.rankBtn,0.3,isShow);
        }else{
            this.gameApplication.gameView.showView(this.rankBtn,0.3,isShow);
            this.gameApplication.gameView.showView(this.replayBtn,0.3,isShow);
        }
        this.gameApplication.gameView.showView(this.inviteBtn,0.3,isShow);
        if(isShow){
            this.scheduleOnce(function(){
                this.isCanClickBtn = true;
            },0.5)
        }else{
            this.isCanClickBtn = false;
        }
    },

    showResult(isWin){
        if(isWin == 1){//超过15s
            this.winBg.runAction(cc.repeatForever(cc.rotateBy(2,360)));
            this.gameApplication.gameView.showView(this.win25Node,0.3,true);
            this.gameApplication.soundManager.playSound("victory"); 
            this.showBtn(true,true);
        }
        else if (isWin == 0){
            this.gameApplication.gameView.showView(this.lostNode,0.3,true);
            this.lostFront.runAction(cc.sequence(
                cc.moveTo(0.3,cc.v2(0,cc.winSize.height/-2))
                ,cc.callFunc(function(){
                    this.gameApplication.soundManager.playSound("fail"); 
                }.bind(this),this)
                ,cc.moveTo(0.07,cc.v2(0,150+cc.winSize.height/-2))
                ,cc.moveTo(0.06,cc.v2(0,cc.winSize.height/-2))
                ,cc.callFunc(function(){
                    this.gameApplication.soundManager.playSound("fail"); 
                }.bind(this),this)
                ,cc.moveTo(0.05,cc.v2(0,50+cc.winSize.height/-2))
                ,cc.moveTo(0.04,cc.v2(0,cc.winSize.height/-2))
                ,cc.callFunc(function(){
                    this.gameApplication.soundManager.playSound("fail"); 
                    this.gameApplication.gameView.showView(this.lostMain,0.3,true);
                    this.showBtn(true,false);
                }.bind(this),this)
            ))
        }
    },

    hideResult(){
        this.gameApplication.gameView.showView(this.gameApplication.resultNode,0.3,false);
        this.gameApplication.gameView.showView(this.gameApplication.rankView,0.3,false);
        this.gameApplication.gameView.showView(this.win25Node,0.3,false);
        this.gameApplication.gameView.showView(this.lostNode,0.3,false);
        this.lostMain.active = false;
        this.lostFront.position = cc.v2(0,cc.winSize.height/2);
    },

    btnClick(event,type){
        if(!this.isCanClickBtn){
            return;
        }
        if("Share" == type){
            SDK().share(this.gameApplication.highest, function (isCompleted) {
                if (isCompleted) {//分享激励
                    cc.log("share");
                } else {
                    this.gameApplication.gameView.fbFail(2);
                }
            }.bind(this));
        }else if("Replay" == type){
            this.hideResult();
            this.showBtn(false);
            this.gameApplication.enterGame();
        }else if("Rank" == type){
            this.hideResult();
            this.gameApplication.gameView.LoadRank();
        }else if("PlayWith" == type){
            SDK().playWith(event.target.parent.name,this.gameApplication.highest, function (isCompleted) {
                if (isCompleted) {//分享激励
                    this.hideResult();
                    this.showBtn(false);
                    this.gameApplication.enterGame();
                } else {
                    this.gameApplication.gameView.fbFail(2);
                }
            }.bind(this));
        }
    },

    // update (dt) {},
});
