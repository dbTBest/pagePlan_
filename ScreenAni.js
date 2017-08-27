var ScreenAni=(function(){
    function EleAni(){
        this.state=state++;
        originPrototype=this.__proto__;
        EleAniPrototype=Object.create(originPrototype,EleAniPrototypeMethods);
        EleAniPrototype.constructor=EleAni;
        this.__proto__=EleAniPrototype;
    }
    
    var originPrototype=null;
    var EleAniPrototype=null;
    var state=0;
    var animations=["screenAni2_1","screenAni1_0","screenAni0_2"];
    var animationGetter=/(\d)$/;
    var EleAniPrototypeMethods={
        ani:{
        value:function(){
        var curState=--this.state;
        if(curState<0){
            curState=2;
            this.state=2;
        }
        
        for(index in animations){
            var toStateNumber=parseInt(animationGetter.exec(animations[index])[1]);
            if(toStateNumber==curState){
                this.animationName=animations[index];
                break;
            }
        }
        
        $(this).css({
            animationName:this.animationName
        });
    },
            writable:false,
            enumerable:false,
            configurable:false
        }
    }
    
    
    function ScreenAni(){
        if(arguments.length==1&&Array.isArray(arguments[0])){
            this.aniEles=arguments[0];
        }else{
            this.aniEles=Array.prototype.splice.call(arguments,0);
        }
        for(index in this.aniEles){
            EleAni.call(this.aniEles[index]);
        }
    }
    
    ScreenAni.prototype.ani=function(){
        var eles=this.aniEles;
        for(index in eles){
            eles[index].ani();
        }
    }
    
    return ScreenAni;
}());


//ani code
/*
var screenAniKey=(function(){
    var bigScreenImgs=[];
    $(".bigScreenImg").each(function(){
        bigScreenImgs.push(this);
    });
    
    var screenAni=new ScreenAni(bigScreenImgs);
    
    return setInterval(function(){
        screenAni.ani();
    },5000);
}());
*/