// Autor: Abraham DIaz
// Version : 1.0
var AutoNextCarousel = function(settings){

    var index = 0;
    var nextLimit = 0;
    var prevLimit = 0;
    var nextPosition = 0;
    var prevPosition = 0;
    var base,baseWidth,slider,items,itemsLimit,itemWidth,itemsWidth,next,prev,imgView;

    // Resize end
    (function(e,d,a){var b,f,c;c="resizeEnd";f={delay:250};b=function(h,g,i){if(typeof g==="function"){i=g;g={}}i=i||null;this.element=h;this.settings=e.extend({},f,g);this._defaults=f;this._name=c;this._timeout=false;this._callback=i;return this.init()};b.prototype={init:function(){var g,h;h=this;g=e(this.element);return g.on("resize",function(){return h.initResize()})},getUTCDate:function(h){var g;h=h||new Date();g=Date.UTC(h.getUTCFullYear(),h.getUTCMonth(),h.getUTCDate(),h.getUTCHours(),h.getUTCMinutes(),h.getUTCSeconds(),h.getUTCMilliseconds());return g},initResize:function(){var g;g=this;g.controlTime=g.getUTCDate();if(g._timeout===false){g._timeout=true;return setTimeout(function(){return g.runCallback(g)},g.settings.delay)}},runCallback:function(h){var g;g=h.getUTCDate();if(g-h.controlTime<h.settings.delay){return setTimeout(function(){return h.runCallback(h)},h.settings.delay)}else{h._timeout=false;return h._callback()}}};return e.fn[c]=function(g,h){return this.each(function(){if(!e.data(this,"plugin_"+c)){return e.data(this,"plugin_"+c,new b(this,g,h))}})}})(jQuery,window,document);
    // Settings
    $(settings.slider+" > * img").css({"width" : 100+"%", "height" : 100+"%", "margin-bottom" : -2.5+"px"});
    // Override vars
    imgView = $(settings.view);
    base = $(settings.base).css({"display" : "block", "width" : 100+"%"});
    slider = $(settings.slider).css({"display" : "block", "white-space" : "nowrap", "box-sizing" : "border-box", "position" : "relative"});
    items = $(settings.slider+" > *").css({"display" : "block", "float" : "left"});
    
    for(var i = 1;i <= items.length;i++){
        $(settings.slider+" > *:nth-child("+i+") img").attr("num", i);
    }

    (function(){

        // Base Settings
        baseWidth = base.width();
        // Items Settings
        itemsLimit = settings.limit;
        itemWidth = baseWidth / itemsLimit;
        itemsWidth = itemWidth * items.length;
        // Controlls Settings
        next = $(settings.next);
        prev = $(settings.prev);
        
        base.css({
            "overflow" : "hidden"
        });

        slider.css({
            "width" : itemsWidth+"px",
            "padding" : 0+"px",
            "margin" : 0+"px",
        });$(settings.slider+"*").css("box-sizing", "border-box");

        items.css({
            "width" : itemWidth,
            "box-sizing" : "border-box",
        });$(settings.slider+" > *:first-child").css("margin-left", 0+"px");$(settings.slider+" > *:last-child").css("margin-right", 0+"px");

        // Image container
        imgView.html("<img src="+$(settings.slider+" img:first-child").attr('src')+" alt="+'ImageView'+"/>");
        $(settings.slider+" img").click(function(){
            
            var src = $(this).attr('src');
            imgView.html("<img src="+src+" alt="+'ImageView'+"/>");

            items.removeClass(settings.activeClass);
            $(settings.slider+" > *:nth-child("+$(this).attr('num')+")").addClass(settings.activeClass);

        });

        $(window).resize(function(){

            // Starting loader
            (function(){
                base.slideUp(500);
            })();

            // Base Settings
            baseWidth = base.width();
            // Items Settings
            itemsLimit = settings.limit;
            itemWidth = baseWidth / itemsLimit;
            itemsWidth = itemWidth * items.length;
            // Controlls Settings
            next = $(settings.next);
            prev = $(settings.prev);
            
            slider.css({
                "width" : itemsWidth+"px",
                "right" : 0+"px",
                "padding" : 0+"px",
                "margin" : 0+"px",
            });$(settings.slider+"*").css("box-sizing", "border-box");

            items.css({
                "width" : itemWidth,
                "box-sizing" : "border-box",
            });$(settings.slider+" > *:first-child").css("margin-left", 0+"px");$(settings.slider+" > *:last-child").css("margin-right", 0+"px");

            index = 0;

        });
        
        // End loader
        $(window).resizeEnd({
            delay : 500
        }, function() {
            base.slideDown(500, "easeInOutCirc")
        });

    })();

    $(settings.nex).click(function(){
            
        index += 1;
        
        if(items.length < (index + 1) * itemsLimit){
            slider.animate({ "right" : (itemWidth * items.length) - (itemWidth * itemsLimit) }, 1000, "easeInOutCirc");
            index -= 1;
        }else{
            slider.animate({ "right" : (index * itemsLimit) * (itemWidth + 0) }, 1000, "easeInOutCirc");
        }

        // console.log(index);

    });

    $(settings.prev).click(function(){

        index -= 1;
        
        if(prevLimit < (index + 1) * itemsLimit){
            slider.animate({ "right" : 0 }, 1000, "easeInOutCirc");
            index = 0;
        }else{
            slider.animate({ "right" : - (index * itemsLimit) * (itemWidth + 0) }, 1000, "easeInOutCirc");
        }

        // console.log(index);

    });

}
