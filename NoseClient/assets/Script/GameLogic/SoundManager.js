cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
        dropDown: {
            url: cc.AudioClip,
            default: null
        },
        fail: {
            url: cc.AudioClip,
            default: null
        },
        victory: {
            url: cc.AudioClip,
            default: null
        },
        click: {
            url: cc.AudioClip,
            default: null
        },
        isOpen:true,
        isVoiceOpen:true,
    },

    // LIFE-CYCLE CALLBACKS:

    playSound:function(soundtype)
    {
        if(this.isOpen){
            switch(soundtype){
                case "dropDown":
                    cc.audioEngine.play(this.dropDown, false, 3);
                    break;
                case "fail":
                    cc.audioEngine.play(this.fail, false, 3);
                    break;
                case "victory":
                    cc.audioEngine.play(this.victory, false, 3);
                    break;
                case "click":
                    cc.audioEngine.play(this.click, false, 3);
                break;
            }
        }
    },

    playBg:function()
    {
        if(this.isOpen){
            this.audioSource.play();
        }
    },

    setVoiceIsOpen:function(isOpen){
        this.isVoiceOpen = isOpen;
        if(isOpen){
            try{
                if(str != null){
                    HiboGameJs.enableMic(0)
                }
            }catch(e){
                
            }
        }else{
            try{
                if(str != null){
                    HiboGameJs.enableMic(1)
                }
            }catch(e){
                
            }
        }

    },

    setIsOpen:function(isOpen){
        this.isOpen = isOpen;
        if(this.isOpen){
            this.playBg();
            try{
                if(str != null){
                    HiboGameJs.mute(0)
                }
            }catch(e){
                
            }
            
        }else{
            this.audioSource.pause();
            try{
                if(str != null){
                    HiboGameJs.mute(1)
                }
            }catch(e){
                
            }
        }
    },
});
