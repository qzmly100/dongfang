/**
 **		公用滚动方法
 **     支持定时自动轮播、前后轮播、单独点击轮播
 **/
(function($){
    $("div[data-scro='btn-banner'] b").click(function(){
        var T = $(this);
        if(T.attr("class")=="down") return false;
        banner_animation.st({
            findObject : T,	//当前点击对象 默认写
            main : T.parent().parent().find("div[data-scro='list']"),	//滚动目标容器窗口对象
            pagSource : T.parent().parent().find("div[data-scro='btn-banner'] b"),	//切换按钮对象
            className : "down",		//选中的样式
            duration : "slow",		//滚动速度 和jquery速度一致
            on : $(this)[0].tagName=="A" ? true : false		//用于判断是否开启无限滚动 or 来回切换
        });
        return false;
    });
    var settime="", time=true,banner_animation = {
        init : function(){
            this.start();
            this.time();
        },
        st : function(o){
            if(time){
                this.animate(o.findObject,o.main,o.className,o.duration,o.pagSource,o.on);
                time = false;
            }
        },
        animate : function(T,M,C,S,P,O){
            var _prevDown = O ? P.parent().find("*[class='"+C+"']") : T.parent().find(T[0].tagName+"[class='"+C+"']"),
                _prevIndex = _prevDown.index(),
                _thisIndex = O ? (T.attr("class")=="next" ? _prevIndex+1 : _prevIndex-1) : T.index(),
                _list = M.find(".item"),
                p2n = 1;
            _prevDown.removeClass(C);
            if(O){
                if(_thisIndex==-1) _thisIndex=_list.size()-1;
                if(_thisIndex==_list.size()) _thisIndex=0;
                P.eq(_thisIndex).addClass(C);
            }else{
                T.addClass(C);
            }

            !p2n ? _list.eq(_thisIndex).css("left",-M.width()) : '';
            _list.eq(_prevIndex).animate({left:p2n ? -M.width() : M.width()},S,function(){
                $(this).removeAttr("style");
                time = true;
            });
            _list.eq(_thisIndex).animate({left:"0px"},S);
        },
        start : function(){
            $("#focus-pic div[data-scro='btn-banner'] b").mouseover(function(){
                window.clearInterval(settime);
            }).mouseout(function(){
                    banner_animation.time();
                });
        },
        time : function(){
            settime = window.setInterval(function(){
                var num = $("#focus-pic div[data-scro='btn-banner'] b[class='down']").index(),
                    _list = $("#focus-pic div[data-scro='list'] li");
                _list.eq(num).animate({"left":-$("#focus-pic div[data-scro='list']").width()},"slow",function(){
                    $(this).removeAttr("style");
                    $("#focus-pic div[data-scro='btn-banner'] b").removeClass("down").eq(num).addClass("down");
                });
                num++;
                if(num==_list.size()){
                    num=0;
                }
                _list.eq(num).animate({"left":"0px"},"slow");
            },4000);
        }
    };
    $("a").click(function(){
        $(this).blur();
    });

    banner_animation.init();	//是否开启自动轮播
})(this.jQuery);