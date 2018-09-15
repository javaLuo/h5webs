var swiper1;
var audio1 = document.getElementById('audio1');
var playing = 1; // 是否在播放中
var video1 = document.getElementById('video1');
var videoPlaying = 0; // 视频是否在播放中
var which = 0; // 该哪一个文字了
var isIpad = navigator.userAgent.indexOf('iPad') > -1;  // ipad特殊处理
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
var canvas1 = document.getElementById("canvas1"); // stars
var ctx = canvas1.getContext('2d');
var dpi = CanvalHD(ctx);
var swBack = document.getElementById("sw-back");
var stars = []; // 所有的星星
var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
window.onload = function(){
    swiper1 = new Swiper('#swiper',{
        direction : 'vertical', // 方向
        parallax : true, // 视差
        on:{
            slideChange: function(){
                onPageChange(this.activeIndex);
            }
        }
    });
    init();
};

// 页码改变
function onPageChange(index){
    $("#swiper-wrapper>.swiper-slide").removeClass("show");
    $('#share-model').removeClass('show');
    stopAnimate2();
    switch(index){
        case 0:showA();return;
        case 1:showB(); return;
        case 2: showC();return;
        case 3: showD();return;
        case 4: showE();return;
        case 5: showF();return;
        case 6: showG();return;
    }
}
function showA(){
    $("#page-a").addClass('show');
}
function showB(){
    $("#page-b").addClass('show');
}
function showC(){
    animate2();
    $("#page-c").addClass('show');
}
function showD(){
    $("#page-d").addClass('show');
}
function showE(){
    $("#page-e").addClass('show');
}
function showF(){
    $("#page-f").addClass('show');
}
function showG(){
    $("#page-g").addClass('show');
    $("#share-model").addClass("show");
}

// 替换月亮上的字
function createMoonWords(){
    var words = {
        a: ['下雨了不要淋湿','大夏天多喝水不要中暑','晚上早点休息，没事做点运动','喜欢什么就买，工作不要太累','我会自己赚钱了','你们不用那么拼着养我了'],
        b: ['爸爸你要好好照顾妈妈','妈妈你要多体谅爸爸','我会照顾好自己的','我爱你们'],
        c: ['我是真的很爱你们','只是我不会表达','其实爱你们远比表面上的多啊'],
        d:['小时候你们养我','现在我长大了我养你们','真的很爱你们']
    };
    var k = words.a;
    switch(which){
        case 0: k = words.a;break;
        case 1: k = words.b;break;
        case 2: k = words.c;break;
        case 3: k = words.d;break;
    }
    var w = [];
    for(var i=0;i<k.length;i++){
        w.push('<li>'+k[i]+'</li>');
    }
    $("#moon-words-box").html(w.join(''));
    which++;
    if(which>3){
        which = 0;
    }
}
// 初始化
function init(){
    $('body').one('touchstart', toggleSound);
    // 绑定music控制
    $("#music").on("touchend", toggleMusic);
    // 绑定video控制
    $("#video-mark").on("click", toggleVideo);
    // 点击生成祝福，跳转下一页
    $("#light-btn1").on("click", function(){
        createMoonWords();
        swiper1 && swiper1.slideTo(6, 300);
    });
    // 绑定share
    $("#share-model").on('click', function(){
        $(this).removeClass('show');
    });
    // 初始化ul 数字
    $(".anime_3").each(function(){
        var $t = $(this);
        $t.css('height',36 * 3 + 'px');
        $t.html(createLi(3))

    });
    $(".anime_5").each(function(){
        var $t = $(this);
        $t.css("height", 36 * 5 + 'px');
        $t.html(createLi(5))
    });
    $(".anime_7, .anime_7_two").each(function(){
        var $t = $(this);
        $t.css("height", 36 * 7 + 'px');
        $t.html(createLi(7))
    });
    $(".anime_50").each(function(){
        var $t = $(this);
        $t.css("height", 36 * 50 + 'px');
        $t.html(createLi(50))
    });
    $(".anime_78").each(function(){
        var $t = $(this);
        $t.css("height", 36 * 78 + 'px');
        $t.html(createLi(78))
    });
    $(window).on("resize",function(){
        canvas1.height = swBack.clientHeight * dpi;
        canvas1.width = swBack.clientWidth * dpi;
    }).resize();
    initStars();
    initCanvasAnimate(); // 初始化文字粒子
    $("#loading").addClass("hide");
    setTimeout(function(){
        $("#loading").remove();
    },1000);
    showA();
}

// 初始化星空所需
function initStars(){
    var files = [s1,s2];

    for(var i=0;i<160;i++){
       var ran = Math.floor(Math.random() * 2);
       var width;
       var route = 0;
       var opacity = 0.5;
       // 随机大小
        if(ran === 0){
            width = random(10,40);
            route = random(0,360);
            opacity= random(0,1); // 初始透明度
        } else {
            width = random(5,15);
            opacity= random(0,0.5); // 初始透明度
        }

        stars.push({
            dom: files[ran],
            width:width * dpi,
            flash: random(0,2) > 0.8, // 是否闪烁
            opacity: opacity,
            route:route, // 旋转角度
            x:random(-20, canvas1.width+20),
            y: random(-20, canvas1.height+20)
        });

    }
    animate();
}

// 绘制一帧
var hu = Math.PI/180;

function drow(){
    // ctx.fillRect(0,0,canvas1.width,canvas1.height);
    ctx.clearRect(0,0,canvas1.width,canvas1.height);
    for(var i=0; i < stars.length; i++) {
        var t = stars[i];
        ctx.save();
        ctx.globalAlpha = t.opacity;
        ctx.rotate(t.rotate * hu);

        ctx.drawImage(t.dom, t.x, t.y, t.width, t.width);
        ctx.restore();

        // 需要闪烁的星星随机调整亮度
        if(t.flash) {
            var rand = Math.random();
            if (rand > 0.5 && t.opacity > 0.2) {
                t.opacity -= 0.1;
            } else if (rand < 0.5 && t.opacity < 1) {
                t.opacity += 0.1;
            }
        }
    }
}

// 动画函数
function animate() {
    requestAnimationFrame(animate);
    drow();
}

// 工具 - 获取范围随机数 小数
function random(min, max) {
    return Math.random() * ( max - min ) + min;
}

function createLi(num){
    var map = [];
    for(var i=0,k=0;i<=num;i++,k++){
        if(k>9){k=0;}
        map.push("<li>"+k+"</li>");
    }
    return map.join('');
}
/** music **/
function play(){
    audio1.play();
    playing = 1;
    $("#music").addClass("playing");
}
function pause(){
    audio1.pause();
    playing = 0;
    $("#music").removeClass("playing");
}

function toggleMusic(e){
    e.stopPropagation();
    if (playing === 0) {
        play(); //没有就播放
    } else {
        pause();
    }
}

// 首次加载时 解决不能自动播放问题
function toggleSound() {
    try{
        if (audio1.paused) { //判读是否播放
            play(); //没有就播放
        }
    }catch(e){
        console.log('不支持mp3');
    }
}

/** 视频控制 **/
function videoPlay() {
    video1.play();
    pause(); // 音乐暂停
    $("#video-mark").addClass('hide');
    videoPlaying = 1;
}

function videoPause(){
    video1.pause();
    play(); // 音乐播放
    $("#video-mark").removeClass('hide');
    videoPlaying = 0;
}
function toggleVideo(){
    if(videoPlaying){
        videoPause();
    } else {
        videoPlay();
    }
}

/** 获取屏幕像素密度比 **/
function CanvalHD(ctx){
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    if (isAndroid || isIpad) {
        return devicePixelRatio / backingStorePixelRatio;
    } else {
        return devicePixelRatio / backingStorePixelRatio * 2;
    }
}

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
var ctx2p = [];
var words2 = [
    '渐行渐远的你',
    '可曾留意过父母的变化',
    '你是否发现他们突然',
    '喜欢煮得烂烂的菜？',
    '你是否发现他们经常',
    '忘记关煤气或电源？',
    '你是否发现他们不再',
    '喜欢出门遛弯？',
    '他们的这些变化，你知道为什么吗？',
    '因为他们在逐渐老去'
];
var animate2Id = null;
function initCanvasAnimate(){
    console.log(window,document.body.clientHeight);
    canvas2.width = document.body.clientWidth;
    canvas2.height = document.body.clientHeight * 0.8;

    ctx2.fillStyle = '#cccccc';
    ctx2.textAlign = 'center';
    ctx2.font = '16px Serif';
    var h = 18;
    for(var k=0;k<words2.length;k++){
        if(k>0){
            if(k%2 === 0){
                h = h+18+34;
            } else {
                h = h+18+12;
            }
        }
        ctx2.fillText(words2[k],canvas2.width/2,h);
    }

    var data = ctx2.getImageData(0,0,canvas2.width,canvas2.height).data;
    var b32 = new Uint32Array(data.buffer);
    console.log(b32.length, canvas2.width*canvas2.height);
    for(let i=0;i<canvas2.height;i++){
        for(let j=0;j<canvas2.width;j++) {
            if(b32[i*canvas2.width + j]){
                var x00 = random(-50, 50);
                var y00 =  random(-50, 50);
                var w00 = Math.random() * 2 + 2;
                ctx2p.push({
                x: j, // 原始地址x
                y: i, // 原始地址y
                x00:x00,
                y00:y00,
                x0: x00, // 初始偏移值
                y0: y00, // 初始偏移值
                w00: w00,
                w: w00, // 初始大小
                opacity: 0, // 初始透明度
                color: 'rgb('+Math.floor(random(100,255))+','+Math.floor(random(100,255))+','+Math.floor(random(100,255))+')',
            });
          }
        }
        
    }
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
}

var tip = 0;
function drow2(){
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    for(var i=0;i<ctx2p.length;i++){
       ctx2p[i].x0 =  ctx2p[i].x0 > 0 ? ctx2p[i].x0-ctx2p[i].x00/140 : 0;
       ctx2p[i].y0 = ctx2p[i].y0 > 0 ? ctx2p[i].y0-ctx2p[i].y00/140 : 0;
       ctx2p[i].w = ctx2p[i].w > 0.1? ctx2p[i].w - ctx2p[i].w00/140 : 0.1;
       if(ctx2p[i].w <= 0.1){
           continue;
       }
       if(tip>100){
        ctx2p[i].opacity = ctx2p[i].opacity > 0 ?  ctx2p[i].opacity-0.01 : 0;
       } else{
        ctx2p[i].opacity = ctx2p[i].opacity > 0.6 ? 0.6 : ctx2p[i].opacity+0.01;
       }

        ctx2.save();
        ctx2.fillStyle = ctx2p[i].color;
        ctx2.globalAlpha = ctx2p[i].opacity;
        ctx2.beginPath();
        ctx2.arc(ctx2p[i].x+ctx2p[i].x0,ctx2p[i].y+ctx2p[i].y0,ctx2p[i].w,0,2*Math.PI);
        ctx2.fill();
        ctx2.restore();
    }

    
    if(tip>120){
        ctx2.save();
        ctx2.fillStyle = '#f0f0f0';
        ctx2.globalAlpha = tip / 200;
        var h = 18;
        for(var k=0;k<words2.length;k++){
            if(k>0){
                if(k%2 === 0){
                    h = h+18+34;
                } else {
                    h = h+18+12;
                }
            }
            ctx2.fillText(words2[k],canvas2.width/2,h);
        }
        ctx2.restore();
    }
    
    
    tip++;

    if(tip>= 200){
        stopAnimate2();
    }
}

function animate2(){
    animate2Id = requestAnimationFrame(animate2);
    drow2();
}

function stopAnimate2(){
    console.log('停止了', animate2Id);
    if(animate2Id){
        cancelAnimationFrame(animate2Id);
        tip = 0;
    }
}