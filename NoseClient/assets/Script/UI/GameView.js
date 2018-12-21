// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        gameApplication: {
            default: null,
        },
        head: {
            default: null,
            type: cc.Node,
        },
        head1: {
            default: null,
            type: cc.Node,
        },
        myNoseL: {
            default: null,
            type: cc.Node,
        },
        myNoseR: {
            default: null,
            type: cc.Node,
        },
        opNoseL: {
            default: null,
            type: cc.Node,
        },
        opNoseR: {
            default: null,
            type: cc.Node,
        },
        leftEyeLid: {
            default: null,
            type: cc.Node,
        },
        rightEyeLid: {
            default: null,
            type: cc.Node,
        },
        shadowHead: {
            default: null,
            type: cc.Node,
        },
        //引导界面
        shadowHead:{
            default:null,
            type:cc.Node,
        },
        guideMask:{
            default:null,
            type:cc.Node,
        },
        guideHandL:{
            default:null,
            type:cc.Node,
        },
        guideHandR:{
            default:null,
            type:cc.Node,
        },
        guidePointL:{
            default:null,
            type:cc.Node,
        },
        guidePointR:{
            default:null,
            type:cc.Node,
        },
        guideLable:{
            default:null,
            type:cc.Node,
        },
        //榜单界面
        rankMin: {
            default: null,
            type: cc.Label,
        },
        rankSec: {
            default: null,
            type: cc.Label,
        },
        beatString: {
            default: null,
            type: cc.RichText,
        },
        highestString: {
            default: null,
            type: cc.RichText,
        },
        worldBtn: {
            default: null,
            type: cc.Node,
        },
        friendBtn: {
            default: null,
            type: cc.Node,
        },
        worldList: {
            default: null,
            type: cc.Node,
        },
        friendList: {
            default: null,
            type: cc.Node,
        },
        worldContent: {
            default: null,
            type: cc.Node,
        },
        friendContent: {
            default: null,
            type: cc.Node,
        },
        //头像储存
        headSpriteList: {
            default: {},
            visible: false,
        },
        //储存用户信息列表
        worldPlayer: {
            default: [],
            visible: false,
        },
        friendPlayer: {
            default: [],
            visible: false,
        },
        //储存用户UI列表
        worldUIPlayer: {
            default: [],
            visible: false,
        },
        friendUIPlayer: {
            default: [],
            visible: false,
        },
        //fb失败的标题
        fbVideoTitel: {
            default: null,
            type: cc.Node,
        },
        fbShareTitel: {
            default: null,
            type: cc.Node,
        },
        //倒数图标
        guideSprite: {
            default: null,
            type: cc.Sprite,
        },
        //鼻涕动画图
        dropSprite: {
            default: null,
            type: cc.Sprite,
        },
        minLable: {
            default: null,
            type: cc.Label,
        },
        secLable: {
            default: null,
            type: cc.Label,
        },
        roSpeed: {
            default: 0,
            type: cc.Float,
            visible: false,
        },
        roSpeed1: {
            default: 0,
            type: cc.Float,
            visible: false,
        },
        punchSpeed: {
            default: 0,
            type: cc.Float,
            visible: false,
        },
        level: {
            default: 0,
            type: cc.Integer,
            visible: false,
        },
        pastTime: {
            default: 0,
            type: cc.Float,
            visible: false,
        },
        countTime: {
            default: 0,
            type: cc.Float,
            visible: false,
        },
        isRevive: {
            default: false,
            visible: false,
        },
        status: {
            default: -1,
            type: cc.Integer,
            visible: false,
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        resultAtlas: {
            default: null,
            type: cc.SpriteAtlas,
        },
        prefab_player: {
            default: null,
            type: cc.Prefab,
        },
        _playTimes: {
            default: 0,
            type: cc.Integer,
        },
        playTimes: {
            get: function () {
                return this._playTimes;
            },
            set: function (val) {
                this._playTimes = val;
                if ((this._playTimes % SDK().getInterstitialCount() == 0 && this._playTimes >= SDK().getInterstitialCount()) || SDK().getInterstitialCount() <= 1) {
                    console.log("播放插屏广告");
                    SDK().showInterstitialAd(function (isCompleted) {
                        console.log("播放Done");
                    });
                }
            },
        }
    },

    onLoad() {
        /* this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.onMouseDown(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onMouseUp(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.onMouseUp(event);
        }, this); */
    },

    Guide(isShow) {
        if (isShow) {
            this.status = 0;
            this.guideMask.active = true;
            this.shadowHead.active = true;
            this.guideHandL.active = true;
            this.guidePointL.active = true;
            this.guidePointR.active = true;
            this.guideLable.active = true;
            var times = 3;
            let delay1 = cc.delayTime(0.2);

            let sHead1 = cc.callFunc(() => {
                this.shadowHead.rotation = 0;
            }, this);
            this.shadowHead.runAction(cc.repeat(cc.sequence(sHead1, cc.rotateTo(0.5, -50), delay1), times));

            let Hand1 = cc.callFunc(() => {
                this.guideHandL.setPositionY(150);
            }, this);
            this.guideHandL.runAction(cc.repeat(cc.sequence(Hand1, cc.moveTo(0.5, cc.v2(this.guideHandL.getPositionX(), 80)), delay1), times));


            let Point1 = cc.callFunc(() => {
                this.guidePointL.scale = 0;
                this.guidePointR.scale = 0;
            }, this);
            let Point2 = cc.callFunc(() => {
                this.guidePointL.opacity = 130;
                this.guidePointR.opacity = 130;
            }, this);
            let delay2 = cc.delayTime(0.5);

            this.scheduleOnce(function () {
                if (this.status == 0) {
                    this.guidePointL.runAction(cc.repeat(cc.sequence(Point1, cc.scaleTo(0.2, 2), delay2), times));
                    this.guidePointL.runAction(cc.repeat(cc.sequence(Point2, cc.fadeOut(0.2, 0), delay2), times));
                }
            }.bind(this), 0.5);


            this.scheduleOnce(function () {
                if (this.status == 0) {
                    this.guideHandL.active = false;
                    this.guideHandR.active = true;

                    this.shadowHead.runAction(cc.repeat(cc.sequence(sHead1, cc.rotateTo(0.5, 50), delay1), times));

                    let Hand2 = cc.callFunc(() => {
                        this.guideHandR.setPositionY(150);
                    }, this);
                    this.guideHandR.runAction(cc.repeat(cc.sequence(Hand2, cc.moveTo(0.5, cc.v2(this.guideHandR.getPositionX(), 80)), delay1), times));

                    this.scheduleOnce(function () {
                        if (this.status == 0) {
                            this.guidePointR.runAction(cc.repeat(cc.sequence(Point1, cc.scaleTo(0.2, 2), delay2), times));
                            this.guidePointR.runAction(cc.repeat(cc.sequence(Point2, cc.fadeOut(0.2, 0), delay2), times));
                        }
                    }.bind(this), 0.5);
                }


            }.bind(this), 2.1);

            this.scheduleOnce(function () {
                this.LoadGame();
                this.guideHandR.active = false;
            }.bind(this), 4.2);

        } else {
        }

    },


    goAction(isShow) {
        var self = this;
        if (isShow) {
            this.status = 0;
            this.guideMask.active = false;
            this.shadowHead.active = false;
            this.guideHandL.active = false;
            this.guidePointL.active = false;
            this.guideHandR.active = false;
            this.guidePointR.active = false;
            this.guideLable.active = false;
            this.guideHandR.active = false;
            this.guideSprite.node.active = true;
            this.guideSprite.node.runAction(cc.sequence(
                cc.callFunc(function () {
                    self.guideSprite.node.opacity = 255;
                    self.guideSprite.spriteFrame = self.resultAtlas.getSpriteFrame("text_3");
                }),
                cc.fadeOut(0.75),
                cc.callFunc(function () {
                    self.guideSprite.node.opacity = 255;
                    self.guideSprite.spriteFrame = self.resultAtlas.getSpriteFrame("text_2");
                }),
                cc.fadeOut(0.75),
                cc.callFunc(function () {
                    self.guideSprite.node.opacity = 255;
                    self.guideSprite.spriteFrame = self.resultAtlas.getSpriteFrame("text_1");
                }),
                cc.fadeOut(0.75),
                cc.callFunc(function () {
                    self.guideSprite.node.opacity = 255;
                    self.guideSprite.spriteFrame = self.resultAtlas.getSpriteFrame("go");
                }),
                cc.fadeOut(0.75),
                cc.callFunc(function () {
                    self.status = 1;//开始
                    self.guideSprite.node.active = false;
                }),
            ));
            this.guideSprite.node.runAction(cc.sequence(
                cc.callFunc(function () {
                    self.guideSprite.node.scale = cc.v2(0, 0);
                }),
                cc.scaleTo(0.75, 2),
                cc.callFunc(function () {
                    self.guideSprite.node.scale = cc.v2(0, 0);
                }),
                cc.scaleTo(0.75, 2),
                cc.callFunc(function () {
                    self.guideSprite.node.scale = cc.v2(0, 0);
                }),
                cc.scaleTo(0.75, 2),
                cc.callFunc(function () {
                    self.guideSprite.node.scale = cc.v2(0, 0);
                }),
                cc.scaleTo(0.75, 2),
            ));
        }
    },

    menuClick(event, type) {
        if (type == "restart") {
            this.LoadGame();
        }
        //榜单界面
        else if ("WorldRank" == type) {
            this.GetWorldRank(this.worldPlayer);
            this.worldList.active = true;
            this.worldBtn.active = true;
            this.friendList.active = false;
            this.friendBtn.active = false;
        } else if ("FriendsRank" == type) {
            this.GetFriendRank(this.friendPlayer);
            this.worldList.active = false;
            this.worldBtn.active = false;
            this.friendList.active = true;
            this.friendBtn.active = true;
        }
        //关闭FB失败界面
        else if ("CloseFb" == type) {
            this.showView(this.gameApplication.fbFailView, 0.3, false);
        }
    },

    //加载榜单
    LoadRank() {
        this.beatString.node.active = false;
        SDK().getFriendsInfo(function (list) {
            this.GetFriendRank(list);
        }.bind(this));
        SDK().getRank(2, 50, 0, function (list) {
            this.GetWorldRank(list);
        }.bind(this));
        this.rankMin.string = this.minLable.string;
        this.rankSec.string = this.secLable.string;

        var min = Math.ceil(this.gameApplication.highest / 100);
        var temp = (min > this.gameApplication.highest / 100 ? min - 1 : min);
        //显示最高分
        this.highestString.string = "<b><color=#ffffff>" + temp + " ' " + (this.gameApplication.highest - temp * 100) + "</c></b>"
        this.showView(this.gameApplication.rankView, 0.3, true);
    },

    //好友邀请列表
    GetFriendRank(list) {
        this.friendPlayer = list;
        for (var i = 0; i < this.friendPlayer.length; i = i + 1) {
            var playerBar;
            var Head;
            var Name;
            if (i >= this.friendUIPlayer.length) {
                playerBar = cc.instantiate(this.prefab_player);
                Head = playerBar.getChildByName("Head").getComponent(cc.Sprite);
                Name = playerBar.getChildByName("Name").getComponent(cc.RichText);
                this.friendUIPlayer[i] = {};
                this.friendUIPlayer[i].playerBar = playerBar;
                this.friendUIPlayer[i].Head = Head;
                this.friendUIPlayer[i].Name = Name;
            } else {
                playerBar = this.friendUIPlayer[i].playerBar;
                Head = this.friendUIPlayer[i].Head;
                Name = this.friendUIPlayer[i].Name;
            }
            var playBtn = playerBar.getChildByName("Share");
            Name.node.active = true;
            playerBar.name = this.friendPlayer[i].id;
            playBtn.on(cc.Node.EventType.TOUCH_END, function (event) {
                this.gameApplication.resultView.btnClick(event, "PlayWith");
            }, this);
            Name.string = "<b><color=#696969>" + this.friendPlayer[i].name + "</color></b>";
            playerBar.parent = this.friendContent;
            //加载头像
            this.LoadSprite(this.friendPlayer[i].headUrl, Head, this.headSpriteList[this.friendPlayer[i].id]);
        }
        if (this.friendPlayer.length < this.friendUIPlayer.length) {
            for (var i = this.friendPlayer.length; i < this.friendUIPlayer.length; i = i + 1) {
                this.friendUIPlayer[i].playerBar.active = false;
            }
        }
    },

    //世界排行榜
    GetWorldRank(list) {
        this.worldPlayer = list;
        var isOnRank = false;
        for (var i = 0; i < this.worldPlayer.length; i = i + 1) {
            if (this.LoadRankData(i, this.worldPlayer[i])) {
                isOnRank = true;
            }
        }
        //如果自己不在榜单上就将自己加载最后
        var listLength = this.worldPlayer.length;
        if (!isOnRank) {
            listLength = listLength + 1;
            SDK().getRankScore(2, function (info) {
                this.LoadRankData(listLength - 1, info);
            }.bind(this))
        }
        //隐藏多余的榜单
        if (listLength < this.worldUIPlayer.length) {
            for (var i = this.worldPlayer.length; i < this.worldUIPlayer.length; i = i + 1) {
                this.worldUIPlayer[i].playerBar.active = false;
            }
        }
    },

    //将玩家信息加载到第I排
    LoadRankData(i, playerData) {
        var isOnRank = false;
        var playerBar;
        var mainBg;
        var No;
        var Score;
        var Head;
        if (i >= this.worldUIPlayer.length) {
            playerBar = cc.instantiate(this.prefab_player);
            mainBg = playerBar.getComponent(cc.Sprite);
            No = playerBar.getChildByName("No").getComponent(cc.RichText);
            Score = playerBar.getChildByName("Score").getComponent(cc.RichText);
            Head = playerBar.getChildByName("Head").getComponent(cc.Sprite);
            this.worldUIPlayer[i] = {};
            this.worldUIPlayer[i].playerBar = playerBar;
            this.worldUIPlayer[i].mainBg = mainBg;
            this.worldUIPlayer[i].No = No;
            this.worldUIPlayer[i].Score = Score;
            this.worldUIPlayer[i].Head = Head;
        } else {
            playerBar = this.worldUIPlayer[i].playerBar;
            mainBg = this.worldUIPlayer[i].mainBg;
            No = this.worldUIPlayer[i].No;
            Score = this.worldUIPlayer[i].Score;
            Head = this.worldUIPlayer[i].Head;
        }
        No.node.active = true;
        Score.node.active = true;
        playerBar.name = playerData.id;
        playerBar.parent = this.worldContent;
        //是否为自己
        if (playerData.id == SDK().getSelfInfo().id) {
            mainBg.spriteFrame = this.resultAtlas.getSpriteFrame("bg1");
            var playBtn = playerBar.getChildByName("Share");
            this.LoadPercent(playerData.no);
            playBtn.active = false;
            isOnRank = true;
        } else {
            this.worldUIPlayer[i].mainBg = playerBar.getComponent(cc.Sprite);
            this.worldUIPlayer[i].mainBg.spriteFrame = this.resultAtlas.getSpriteFrame("barBg");
            var playBtn = playerBar.getChildByName("Share");
            playBtn.active = false;
        };
        //加载名次
        No.string = "<b><color=#696969>" + playerData.no + "</color></b>";
        //加载分数
        Score.string = "<b><color=EE9A00>" + (Math.ceil(playerData.score / 100) - 1) + " ' " + playerData.score % 100 + "</c></b>";
        //加载头像
        this.LoadSprite(playerData.headUrl, Head, this.headSpriteList[playerData.id]);
        return isOnRank;
    },

    //根据URL加载头像并到对应的sprite上
    LoadSprite(url, sprite, saver) {
        if (saver == null) {
            cc.loader.load(url, function (err, texture) {
                saver = new cc.SpriteFrame(texture);
                sprite.spriteFrame = saver;
            });
        } else {
            sprite.spriteFrame = saver;
        }

    },

    //加载自己打败的玩家百分比
    LoadPercent(rank) {
        SDK().getPercent(function (count) {
            var percent;
            if (count == 1) {
                percent = 100;
            } else {
                percent = ((count - parseInt(rank - 1)) / count) * 100;
            }
            /* 排行百分比 */
            this.beatString.string = "<b><color=#acacac>beat <color=#fff467>" + percent.toFixed(2) + "%</c> Players</c></b>"
            this.beatString.node.active = true;
        }.bind(this));
    },

    //FB失败界面
    fbFail(type) {
        if (type == 1) {
            this.fbVideoTitel.active = true;
            this.fbShareTitel.active = false;
        } else {
            this.fbVideoTitel.active = false;
            this.fbShareTitel.active = true;
        }
        this.showView(this.gameApplication.fbFailView, 0.3, true);
    },

    showView(view, during, inOut) {
        if (inOut) {
            view.active = true
            view.runAction(cc.fadeIn(during));
        } else {
            var seq = cc.sequence(cc.fadeOut(during),
                cc.callFunc(function () {
                    view.active = false;
                }));
            view.runAction(seq);
        }
    },

    //对手的操作逻辑
    setOpHead(dirc, rotaVal) {
        if (this.status == 1) {
            if (dirc == 1) {
                this.head1.runAction(cc.sequence(cc.rotateBy(0.1, this.punchSpeed + this.level)
                    , cc.callFunc(function () {
                        this.head1.rotation = rotaVal;
                    }, this)));
            } else {
                this.head1.runAction(cc.sequence(cc.rotateBy(0.1, -this.punchSpeed - this.level)
                    , cc.callFunc(function () {
                        this.head1.rotation = rotaVal;
                    }, this)));
            }
        }

    },

    //点击事件
    clickPush(event, dirc) {
        if (this.status == 1) {
            this.gameApplication.soundManager.playSound("click");
            if (dirc == 1) {
                this.head.runAction(cc.rotateBy(0.1, this.punchSpeed));
            } else {
                this.head.runAction(cc.rotateBy(0.1, -this.punchSpeed));
            }
        }
    },

    start() {
        this.dorpCount = 4;
        this.sprites = [];
        //加载好友榜单
        SDK().getRank(1, 50, 0, function (list) {
            this.GetFriendRank(list);
        }.bind(this));
    },

    //鼻涕掉下来的动画
    drop(position) {
        if (null == this.isDrop) {
            for (var i = 1; i <= 4; i++) {
                var strs = "drop_" + i;
                var frame = this.atlas.getSpriteFrame(strs);
                if (frame != null && this.sprites != null) {
                    this.sprites[i - 1] = frame;
                    if ("drop_4" == strs) {
                        this.isDrop = true;
                        this.dropSprite.node.active = true;
                        this.drop();
                    }
                }
            }
        } else {
            if (this.dorpCount > 0) {
                this.dropSprite.spriteFrame = this.sprites[4 - this.dorpCount];
                this.dorpCount = this.dorpCount - 1;
                this.scheduleOnce(function () {
                    this.drop();
                }.bind(this), 0.05);
            } else {
                this.dorpCount = 4;
                this.isDrop = null;
            }
        }
    },

    LoadGame() {
        this.level = 1;
        this.pastTime = 0;
        this.countTime = 0;
        this.minLable.string = "00";
        this.secLable.string = "00";
        this.surpassIdx = -1;
        this.StartGame();
        SDK().getItem(1, function (score) {
            this.gameApplication.highest = score;
        }.bind(this));
    },

    StartGame() {
        this.punchSpeed = 4;
        this.roSpeed = -2;
        this.roSpeed1 = -2;
        this.head.rotation = 1;
        this.head1.rotation = 1;
        this.myNoseL.anchorY = 1;
        this.myNoseR.anchorY = 1;
        this.myNoseL.position = cc.v2(-3, -8);
        this.myNoseR.position = cc.v2(22.8, -3.3);
        this.isCheckRobot = true;
        this.dropSprite.node.active = false;
        this.goAction(true);
    },

    checkEnd(min, sec) {
        var score = min * 100 + sec;
        this.isRevive = false;
        //是否超过最高分 超过则显示胜利界面 否则失败的榜单界面
        if (score > this.gameApplication.highest) {
            //储存最高分
            this.gameApplication.highest = score;
            SDK().setItem({ 1: min * 100 + sec });
            SDK().setRankScore(2, score, "{}", null);//储存到世界榜单
        }
        if (min >= 15) {
            this.gameApplication.endGame(1);
        } else {
            this.gameApplication.resultView.lostText.string = "<b><color=#ffffff>Your Score: " + min + " ' " + sec + "s</c></b>"
            this.gameApplication.endGame(0);
        }
    },

    surpassAnim(spriteFrame) {
        if (this.surpassHead1.node.active) {
            this.surpassHead2.node.rotation = 0;
            this.surpassHead2.node.opacity = 255;
            this.surpassHead2.spriteFrame = spriteFrame;
            this.surpassHead2.node = this.surpassHead1.node.y - 200;
            //撞上去
            this.surpassHead2.node.runAction(
                cc.moveTo(0.5, cc.v2(50, 0)),
            );
            //飞走
            this.surpassHead1.node.runAction(
                cc.sequence(
                    cc.delayTime(0.4),
                    cc.moveTo(0.5, cc.v2(350, 300)),
                    cc.callFunc(function () {
                        this.surpassHead1.node.active = false;
                    }.bind(this), this),
                )
            );
            //渐隐
            this.surpassHead1.node.runAction(
                cc.sequence(
                    cc.delayTime(0.4),
                    cc.fadeOut(0.5),
                )
            );
            //旋转
            this.surpassHead1.node.runAction(
                cc.sequence(
                    cc.delayTime(0.4),
                    cc.rotateBy(0.5, 1080),
                )
            );
        } else if (this.surpassHead2.node.active) {
            this.surpassHead1.node.rotation = 0;
            this.surpassHead1.node.opacity = 255;
            this.surpassHead1.spriteFrame = spriteFrame;
            this.surpassHead1.node = this.surpassHead2.node.y - 200;
            //撞上去
            this.surpassHead1.node.runAction(
                cc.moveTo(0.5, cc.v2(50, 0)),
            );
            //飞走
            this.surpassHead2.node.runAction(
                cc.sequence(
                    cc.delayTime(0.4),
                    cc.moveTo(0.5, cc.v2(350, 300)),
                    cc.callFunc(function () {
                        this.surpassHead1.node.active = false;
                    }.bind(this), this),
                )
            );
            //渐隐
            this.surpassHead2.node.runAction(
                cc.sequence(
                    cc.delayTime(0.4),
                    cc.fadeOut(0.5),
                )
            );
            //旋转
            this.surpassHead2.node.runAction(
                cc.sequence(
                    cc.delayTime(0.4),
                    cc.rotateBy(0.5, 1080),
                )
            );
        }
    },

    update(dt) {
        if (this.status == 1) {
            this.pastTime = this.pastTime + dt;
            if (this.pastTime > 0) {
                this.countTime = this.countTime + dt;
                if (this.countTime > 1) {
                    this.countTime = this.countTime - 1;
                    if (this.level < 20) {
                        this.level = this.level + 1;
                    }
                }
            }
            if (!this.minLable.node.active) {
                this.minLable.node.active = true;
                this.secLable.node.active = true;
            }
            var min = Math.ceil(this.pastTime) - 1;
            if (min < 10) {
                this.minLable.string = "0" + min;
            } else {
                this.minLable.string = min;
            }
            var sec = this.pastTime - min;
            sec = Math.ceil(sec * 99);
            this.secLable.string = "0" + sec;
            if (sec < 10) {
                this.secLable.string = "0" + sec;
            } else {
                this.secLable.string = sec;
            }
            if (this.isTouching) {
                this.clickTime = this.clickTime + dt;
            }
            if (this.isCheckRobot) {
                this.deadTime = 1;
                this.isCheckRobot = false;
            }
            if (null != this.deadTime) {
                if (this.deadTime > 0) {
                    var num = Math.random() * 100;
                    if (num > (85 - this.level * 1.5)) {
                        if (this.head1.rotation > 8) {
                            this.setOpHead(0, this.head1.rotation - (this.punchSpeed + this.level));
                        } else if (this.head1.rotation < -8) {
                            this.setOpHead(1, this.head1.rotation + (this.punchSpeed + this.level));
                        }
                    }
                }
            }
            if (this.head1.rotation < 90 && this.head1.rotation > -90) {

                if (this.head1.rotation == 0) {
                    this.head1.rotation = -1;
                }
                if (this.head1.rotation > -3 && this.head1.rotation < 3) {
                    this.roSpeed1 = this.head1.rotation / Math.abs(this.head1.rotation) * 20 + this.head1.rotation / 105 * (130 + this.level * 60) * 3;
                } else {
                    this.roSpeed1 = this.head1.rotation / Math.abs(this.head1.rotation) * 20 + this.head1.rotation / 105 * (130 + this.level * 60);
                }
                this.head1.rotation = this.head1.rotation + this.roSpeed1 * dt;
                this.head1.position = cc.v2(-7, 120);
                this.opNoseL.scaleY = 0.2 + Math.abs(this.head1.rotation / 90) - this.head1.rotation / Math.abs(this.head1.rotation) * 0.05;
                this.opNoseL.rotation = -this.head1.rotation;
                this.opNoseR.scaleY = 0.2 + Math.abs(this.head1.rotation / 90) + this.head1.rotation / Math.abs(this.head1.rotation) * 0.05;
                this.opNoseR.rotation = -this.head1.rotation;

            }
            if (this.head.rotation < 90 && this.head.rotation > -90) {
                if (this.head.rotation > -3 && this.head.rotation < 3) {
                    this.roSpeed = this.head.rotation / Math.abs(this.head.rotation) * 20 + this.head.rotation / 105 * (130 + this.level * 60) * 3;
                } else {
                    this.roSpeed = this.head.rotation / Math.abs(this.head.rotation) * 20 + this.head.rotation / 105 * (130 + this.level * 60);
                }
                this.head.rotation = this.head.rotation + this.roSpeed * dt;
                var Fix = this.head.rotation / 90 * 1;
                this.myNoseL.scale = cc.v2(1 - Fix, 1 - Fix);
                this.myNoseL.rotation = -this.head.rotation;
                this.myNoseR.scale = cc.v2(1 + Fix, 1 + Fix);
                this.myNoseR.rotation = -this.head.rotation;
                this.leftEyeLid.position = cc.v2(-66, 35 - 28 * Math.abs(this.head.rotation / 90));
                this.rightEyeLid.position = cc.v2(66, 37 - 30 * Math.abs(this.head.rotation / 90));
            } else {
                this.gameApplication.soundManager.playSound("dropDown");
                this.myNoseL.runAction(cc.sequence(cc.callFunc(function () {
                    this.myNoseL.anchorY = 0;
                    this.myNoseR.anchorY = 0;
                    this.myNoseL.position = cc.v2(this.myNoseL.position.x + this.myNoseL.height * this.head.rotation / Math.abs(this.head.rotation), this.myNoseL.position.y);
                    this.myNoseR.position = cc.v2(this.myNoseR.position.x + this.myNoseR.height * this.head.rotation / Math.abs(this.head.rotation), this.myNoseR.position.y)
                }.bind(this), this), cc.moveBy(0.2, cc.v2(this.myNoseL.height * this.head.rotation / Math.abs(this.head.rotation), 0))));
                this.myNoseL.runAction(cc.sequence(cc.delayTime(0.2), cc.scaleTo(0.1, this.myNoseL.scaleX, 0)));
                this.myNoseR.runAction(cc.moveBy(0.2, cc.v2(this.myNoseR.height * this.head.rotation / Math.abs(this.head.rotation), 0)));
                this.myNoseR.runAction(cc.sequence(cc.delayTime(0.2), cc.scaleTo(0.1, this.myNoseR.scaleX, 0)));
                this.status = 2;
                this.scheduleOnce(function () {
                    if (this.head.rotation > 0) {
                        this.drop()
                    } else {
                        this.drop();
                    }
                    this.gameApplication.soundManager.playSound("dropDown");
                }.bind(this), 0.2);
                //是否可以复活
                /* if (!this.isRevive) {
                    this.min = min;
                    this.sec = sec;
                    this.showView(this.gameApplication.reviveView, 0.3, true);
                } else { */
                this.scheduleOnce(function () {
                    this.checkEnd(min, sec);
                }.bind(this), 0.5);
                //}

            }
        } else if (this.status == 0) {
        }
        else if (this.status == 2) {
            //游戏结束
            this.status = 3
        }
    },
});
