var ScreenToggleAni=(function(){
    var screenToggleEles=[];
    
    //need changed code *****
    var bigScreenImg_iPhone7=document.getElementById("bigScreenImg_iPhone7");
    var bigScreenImg_watch=document.getElementById("bigScreenImg_watch");
    var bigScreenImg_hero=document.getElementById("bigScreenImg_hero");
    
    var screenEles=[bigScreenImg_iPhone7,bigScreenImg_watch,bigScreenImg_hero];
    var screenElesAniBack="screenElesAniBack";
    var screenElesAniLeft="screenElesAniLeft";
    var screenElesAniBack_right="screenElesAniBack_right";
    var screenElesAniRight="screenElesAniRight";
    
    var curScreenEleIndex=0;
    
    function toLeft(backEle,leftEle){
        $(backEle).css({
            zIndex:-1
            ,left:"0%"
            ,animationName:screenElesAniBack
        });

        $(leftEle).css({
            zIndex:1
            ,height:"30rem"
            ,left:"0%"
            ,animationName:screenElesAniLeft
        });

        setTimeout(function(){
            $(backEle).css({
                left:"100%"
            });
        },910);
    }
    
    function toRight(backEle,rightEle){
        $(rightEle).css({
            zIndex:1
            ,height:"30rem"
            ,left:"0%"
            ,animationName:screenElesAniRight
        });
        
        $(backEle).css({
            zIndex:-1
            ,left:"0%"
            ,animationName:screenElesAniBack_right
        });
    }
    
    function _animationAuto(curIndex){
        var backEle=screenEles[curIndex++];
        curIndex=curIndex==3?0:curIndex;
        var leftEle=screenEles[curIndex];

        toLeft(backEle,leftEle);
    }

    function _animationClickNegative(offset,backEle,rightEle){
        offset==1&&toRight(backEle,rightEle);
    }
    
    function _animationClickPositive(offset,backEle,leftEle){
        offset==1&&toLeft(backEle,leftEle);
    }
    
    function _animationClick(curIndex){
        var offset=curIndex-curScreenEleIndex;
        
        offset>0&&(function(){
            var backEle=screenEles[curScreenEleIndex];
            var leftEle=screenEles[curIndex];
            _animationClickPositive.bind(null,offset,backEle,leftEle)();
        }());
        offset<0&&(function(){
            var rightEle=screenEles[curScreenEleIndex];
            var backEle=screenEles[curIndex];
            _animationClickNegative.bind(null,Math.abs(offset),backEle,rightEle)();
        }());
        
        curScreenEleIndex=curIndex;
    }
    
    ScreenToggleAni.prototype._screenAni=function(curIndex){
        
        curIndex.autoFlag&&_animationAuto(curIndex.value);
        curIndex.clickFlag&&_animationClick(curIndex.value);
        
    }
    
    //curIndex:0,1,2
    ScreenToggleAni.prototype.ani=function(){
        var i=1;
        this.aniKey=setInterval(function(){
            $(".screenToggle").each(function(){
                $(this).css({
                    animationName:""
                });
            });
            
            var curIndex=(i++)%3-1;
            if(curIndex==-1){
                curIndex=2;
            }
            
            $(screenToggleEles[curIndex]).css({
                animationName:"screenToggleAni"
            });
            
            setTimeout(this._screenAni.bind(null,{
                autoFlag:true,
                value:curIndex
            }),4010);
        }.bind(this),5200);
    };
    
    function ScreenToggleAni(){
        if(arguments.length==0){
            if(Array.isArray(arguments[0])){
                screenToggleEles=arguments[0];
            }else if(typeof arguments[0]=="object"&&(arguments[0] instanceof HTMLElement)){
                screenToggleEles.push(arguments[0]);
            }else{
                throw new Error("invalid value");
            }
        }else{
            for(var i in arguments){
                if(typeof arguments[i]=="object"&&(arguments[i] instanceof HTMLElement)){
                    screenToggleEles.push(arguments[i]);
                }
            }
        }
    }
    
    return ScreenToggleAni;
})();

var screenToggle_0=document.getElementById("screenToggle_0");
var screenToggle_1=document.getElementById("screenToggle_1");
var screenToggle_2=document.getElementById("screenToggle_2");
var screenToggleAni=new ScreenToggleAni(screenToggle_0,screenToggle_1,screenToggle_2);
//screenToggleAni.ani();

$(".screenToggle").bind("click.db",/screenToggle_(\d)/,function(e){
    var curIndex=Number(e.data.exec(this.id)[1]);
    screenToggleAni._screenAni({
        clickFlag:true,
        value:curIndex
    });
});