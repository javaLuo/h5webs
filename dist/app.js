var swiper1;
var audio1 = document.getElementById('audio1');
var playing = 1; // 是否在播放中
var video1 = document.getElementById('video1');
var videoPlaying = 0; // 视频是否在播放中
var which = 0; // 该哪一个文字了
var isIpad = navigator.userAgent.indexOf('iPad') > -1; // ipad特殊处理
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
var canvas1 = document.getElementById('canvas1'); // stars
var ctx = canvas1.getContext('2d');
var dpi = CanvalHD(ctx);
var swBack = document.getElementById('sw-back');
var stars = []; // 所有的星星
var s1 = document.getElementById('s1');
var s2 = document.getElementById('s2');

window.onload = function() {
  swiper1 = new Swiper('#swiper', {
    direction: 'vertical', // 方向
    parallax: true, // 视差
    on: {
      slideChange: function() {
        onPageChange(this.activeIndex);
      },
    },
  });
  init();
};

// 页码改变
function onPageChange(index) {
  $('#swiper-wrapper>.swiper-slide').removeClass('show');
  $('#share-model').removeClass('show');
  switch (index) {
    case 0:
      showA();
      return;
    case 1:
      showB();
      return;
    case 2:
      showC();
      return;
    case 3:
      showD();
      return;
    case 4:
      showE();
      return;
    case 5:
      showF();
      return;
    case 6:
      showG();
      return;
  }
}
function showA() {
  $('#page-a').addClass('show');
}
function showB() {
  $('#page-b').addClass('show');
}
function showC() {
  $('#page-c').addClass('show');
}
function showD() {
  $('#page-d').addClass('show');
}
function showE() {
  $('#page-e').addClass('show');
}
function showF() {
  $('#page-f').addClass('show');
}
function showG() {
  $('#page-g').addClass('show');
  $('#share-model').addClass('show');
}

// 替换月亮上的字
function createMoonWords() {
  var words = {
    a: ['下雨了不要淋湿', '大夏天多喝水不要中暑', '晚上早点休息，没事做点运动', '喜欢什么就买，工作不要太累', '我会自己赚钱了', '你们不用那么拼着养我了'],
    b: ['爸爸你要好好照顾妈妈', '妈妈你要多体谅爸爸', '我会照顾好自己的', '我爱你们'],
    c: ['我是真的很爱你们', '只是我不会表达', '其实爱你们远比表面上的多啊'],
    d: ['小时候你们养我', '现在我长大了我养你们', '真的很爱你们'],
  };
  var k = words.a;
  switch (which) {
    case 0:
      k = words.a;
      break;
    case 1:
      k = words.b;
      break;
    case 2:
      k = words.c;
      break;
    case 3:
      k = words.d;
      break;
  }
  var w = [];
  for (var i = 0; i < k.length; i++) {
    w.push('<li>' + k[i] + '</li>');
  }
  $('#moon-words-box').html(w.join(''));
  which++;
  if (which > 3) {
    which = 0;
  }
}
// 初始化
function init() {
  $('body').one('touchstart click', toggleSound);
  // 绑定music控制
  $('#music').on('click', toggleMusic);
  // 绑定video控制
  $('#video-mark').on('click', toggleVideo);
  // 点击生成祝福，跳转下一页
  $('#light-btn1').on('click', function() {
    createMoonWords();
    swiper1 && swiper1.slideTo(6, 300);
  });
  // 绑定share
  $('#share-model').on('click', function() {
    $(this).removeClass('show');
  });
  // 初始化ul 数字
  $('.anime_3').each(function() {
    var $t = $(this);
    $t.css('height', 36 * 3 + 'px');
    $t.html(createLi(3));
  });
  $('.anime_5').each(function() {
    var $t = $(this);
    $t.css('height', 36 * 5 + 'px');
    $t.html(createLi(5));
  });
  $('.anime_7, .anime_7_two').each(function() {
    var $t = $(this);
    $t.css('height', 36 * 7 + 'px');
    $t.html(createLi(7));
  });
  $('.anime_50').each(function() {
    var $t = $(this);
    $t.css('height', 36 * 50 + 'px');
    $t.html(createLi(50));
  });
  $('.anime_78').each(function() {
    var $t = $(this);
    $t.css('height', 36 * 78 + 'px');
    $t.html(createLi(78));
  });
  $(window)
    .on('resize', function() {
      canvas1.height = swBack.clientHeight * dpi;
      canvas1.width = swBack.clientWidth * dpi;
    })
    .resize();
  initStars();
  // initCanvasAnimate(); // 初始化文字粒子
  $('#loading').addClass('hide');
  setTimeout(function() {
    $('#loading').remove();
  }, 1000);
  showA();
}

// 初始化星空所需
function initStars() {
  var files = [s1, s2];

  for (var i = 0; i < 600; i++) {
    var ran = Math.floor(Math.random() * 2);
    var width;
    var route = 0;
    var opacity = 0.5;
    // 随机大小
    if (ran === 0) {
      width = random(10, 40);
      route = random(0, 360);
      opacity = random(0, 1); // 初始透明度
    } else {
      width = random(5, 15);
      opacity = random(0, 0.5); // 初始透明度
    }

    stars.push({
      dom: files[ran],
      width: width * dpi,
      flash: true, // 是否闪烁
      opacity: opacity,
      route: route, // 旋转角度
      x: random(-20, canvas1.width + 20),
      y: random(-20, canvas1.height + 20),
    });
  }

  animate();
}

// 绘制一帧
var hu = Math.PI / 180;

function drow() {
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  for (var i = 0; i < stars.length; i++) {
    var t = stars[i];
    ctx.save();
    ctx.globalAlpha = t.opacity;
    ctx.rotate(t.rotate * hu);

    ctx.drawImage(t.dom, t.x, t.y, t.width, t.width);
    ctx.restore();

    // 需要闪烁的星星随机调整亮度
    if (t.flash) {
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
  return Math.random() * (max - min) + min;
}

function createLi(num) {
  var map = [];
  for (var i = 0, k = 0; i <= num; i++, k++) {
    if (k > 9) {
      k = 0;
    }
    map.push('<li>' + k + '</li>');
  }
  return map.join('');
}
/** music **/
function play() {
  audio1.play();
  playing = 1;
  $('#music').addClass('playing');
}
function pause() {
  audio1.pause();
  playing = 0;
  $('#music').removeClass('playing');
}

function toggleMusic(e) {
  e.stopPropagation();
  if (playing === 0) {
    play(); //没有就播放
  } else {
    pause();
  }
}

// 首次加载时 解决不能自动播放问题
function toggleSound() {
  try {
    if (audio1.paused) {
      //判读是否播放
      play(); //没有就播放
    }
  } catch (e) {
    console.log('不支持mp3');
  }
}

/** 视频控制 **/
function videoPlay() {
  video1.play();
  // pause(); // 音乐暂停
  $('#video-mark').addClass('hide');
  videoPlaying = 1;
}

function videoPause() {
  video1.pause();
  play(); // 音乐播放
  $('#video-mark').removeClass('hide');
  videoPlaying = 0;
}
function toggleVideo() {
  if (videoPlaying) {
    videoPause();
  } else {
    videoPlay();
  }
}

/** 获取屏幕像素密度比 **/
function CanvalHD(ctx) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  if (isAndroid || isIpad) {
    return devicePixelRatio / backingStorePixelRatio;
  } else {
    return (devicePixelRatio / backingStorePixelRatio) * 2;
  }
}
