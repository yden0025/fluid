downTime();

header();

news();

banner();

// 倒计时的思路
// 1- 指定目标时间, 用目标时间 减去时间, 得到时间差值, 把差值时分秒
// 2- 把时分秒显示在 span标签中
function downTime() {
  var spans = document.querySelectorAll(".time span:nth-child(odd)");

  //指定目标时间
  var target = new Date("2020-09-30 03:30:30");

  var timer = setInterval(function () {
    // 获取当前时间
    var now = new Date();

    // 获取时间差值
    var t = (target - now) / 1000;

    if (t <= 0) {
      //清空定时器
      clearInterval(timer);
      return;
    }

    // 把时间差值转成时分秒
    var h = Math.floor(t / 3600); //小时
    var m = Math.floor((t % 3600) / 60); //分钟
    var s = Math.floor(t % 60); // 秒

    //把时间转成00:00:00 格式
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    //渲染
    spans[0].innerText = h;
    spans[1].innerText = m;
    spans[2].innerText = s;
  }, 1000);
}

// 头部滚动变色思路
// 1- 监听页面滚动事件, 在页面滚动后, 获取页面卷曲高度, 用高度 和指定高度（500px）做对比, 比值设置为头部透明度
function header() {
  window.onscroll = function () {
    var head = document.querySelector(".jd-header");
    //获取页面顶部滚出去的高度
    // document.body.scrollTop
    // document.documentElement.scrollTop
    // window.pageYoffset(推荐使用)
    // 页面卷曲的高度
    var top = window.pageYOffset;
    // 指定目标值
    var target = 500;
    //获取比值
    var value = top / target;

    if (value > 0.8) {
      value = 0.8;
    }
    console.log(value);
    //给头部设置透明度
    head.style.backgroundColor = "rgba(222, 24, 27, " + value + ")";
  };
}

//快报无缝滚动
// 1-使用定时器切换 列表
// 2-实现无缝滚动
function news() {
  //记录当前显示索引值
  var index = 0;
  //获取ul
  var ul = document.querySelector(".cut ul");
  var lis = ul.querySelectorAll("li");
  console.log(lis);

  // 定时器
  setInterval(function () {
    index++;
    //判断
    //添加过渡
    setTransition();
    //根据index 让ul进行移动
    var y = -index * 30;
    setTranslateY(y);
  }, 2000);

  //在每次ul移动结束瞬间进行判断
  ul.addEventListener("transitionend", function () {
    check();
  });
  ul.addEventListener("webkitTransitionEnd", function () {
    check();
  });

  // 添加过渡
  function setTransition() {
    ul.style.transition = "transform .4s";
    ul.style.webkitTransition = "transform .4s";
  }
  // 删除过渡
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }
  //ul位移
  function setTranslateY(y) {
    ul.style.transform = "translateY(" + y + "px)";
    ul.style.webkitTransform = "translateY(" + y + "px)";
  }

  function check() {
    if (index >= lis.length - 1) {
      index = 0; //复位
      //去掉动画
      removeTransition();
      //瞬间跳回第一个进行重合
      setTranslateY(0);
    }
  }

  //onreadystatechagne  keyup  mousemove
  // mozTransitionEnd  webkitAnimationEnd
}

// 轮播图
// 定时器切换轮播图
// 触屏滑动轮播图
function banner() {
  // 1-找对象
  var banner = document.querySelector(".jd-banner");
  var ul = banner.querySelector("ul");
  var lis = ul.querySelectorAll("li");
  var points = banner.querySelectorAll("ol li");

  var w = banner.offsetWidth;

  // 2-定时器切换轮播图
  // 1-定义index 记录当前切换图片
  // 2-使用定时器累加index
  // 3-根据index推算出 ul移动距离 ： -index*轮播图宽度
  // 4-让ul进行移动， 加过渡
  // 5-小圆点同步切换

  var index = 1; //默认显示第二张图索引值为1

  // 2-使用定时器累加index
  var timer = setInterval(function () {
    //累加index
    index++;
    //计算ul移动距离 = -index * 一屏宽度
    var x = -index * w;
    // 添加过渡
    addTransition();
    // ul移动
    setTranslateX(x);
  }, 2000);

  //3-在每次动画结束后，判断index值是否越界
  ul.addEventListener("transitionend", function () {
    if (index >= lis.length - 1) {
      // 让index 设置为1
      index = 1;
      // 让ul瞬间跳到一个进行重合
      // 删除过渡
      // ul.style.transition = 'none';
      // // 移动
      // var x = -index * w;
      // ul.style.transform = 'translateX('+ x +'px)';
    }

    if (index <= 0) {
      index = 8;
      // 瞬间跳转进行重合
      //删除过渡
      // ul.style.transition = 'none';
      // // 移动
      // var x = -index * w;
      // ul.style.transform = 'translateX('+ x +'px)';
    }
    // 移除过渡
    removeTransition();
    // 移动
    var x = -index * w;
    setTranslateX(x);

    //经过上面的判断 index 一定是在指定范围内
    setPoint(index - 1);
  });

  //3-触屏滑动切换轮播图
  // 1-触屏开始
  // 1-清除定时器
  // 2-记录触屏起始位置
  // 2-触屏移动
  // 1-获取移动后坐标位置
  // 2-计算距离差值
  // 3-ul跟随手指移动， 移动距离 = 距离差
  // 3-触屏结束
  // 判断触屏滑动距离是否大于屏幕宽度1/3
  // 如果小于  不切换
  // 大于1/3 切换
  //判断左滑： 下一张 index++
  //判断右滑： 上一张 index --
  // 让轮播图进行切换
  // 数据重置
  // 开启定时器
  // 定义容器存储数据

  var startX = 0;
  var moveX = 0;
  var distanceX = 0;

  banner.ontouchstart = function (e) {
    clearInterval(timer); //清除定时器
    startX = e.targetTouches[0].clientX; //记录触屏起始坐标
  };

  banner.ontouchmove = function (e) {
    moveX = e.targetTouches[0].clientX; // 1-获取移动后坐标位置
    distanceX = moveX - startX; // 计算距离差
    // 3-ul跟随手指移动， 移动距离 = 之前的x坐标 + 距离差
    var x = -index * w + distanceX;
    setTranslateX(x);
  };

  banner.ontouchend = function (e) {
    console.log(distanceX);

    // 判断触屏滑动距离是否大于屏幕宽度1/3
    if (Math.abs(distanceX) > w / 3) {
      // 判断左滑还有右滑
      if (distanceX > 0) {
        //右滑 上一张
        index--;
      }
      if (distanceX < 0) {
        //左滑  下一张
        index++;
      }
    }
    //添加过渡
    addTransition();
    //根据index的变化，让ul移动
    var x = -index * w;
    setTranslateX(x);

    //数据重置
    startX = 0;
    moveX = 0;
    distanceX = 0;

    //开启定时器
    timer = setInterval(function () {
      //累加index
      index++;
      //计算ul移动距离 = -index * 一屏宽度
      var x = -index * w;
      // 添加过渡
      addTransition();
      // ul移动
      setTranslateX(x);
    }, 2000);
  };

  //切换小圆点
  // i 当前要高度小圆点索引值
  function setPoint(i) {
    // 排他： 先干掉所有人
    points.forEach(function (v, i) {
      v.classList.remove("current");
    });
    // 复活自己
    points[i].classList.add("current");
  }

  //当屏幕宽度变换时， 动态设置w的宽度
  // onresize 当浏览器可视区域宽度发生变化是触发
  window.onresize = function () {
    w = banner.offsetWidth;
    // 立即以最新屏幕宽度让ul调整位置
    var x = -index * w;
    //删除过渡
    removeTransition();
    // ul移动
    setTranslateX(x);
  };

  // 添加过渡
  function addTransition() {
    ul.style.transition = "transform .4s";
    ul.style.webkitTransition = "transform .4s";
  }
  // 删除过渡
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }
  // ul位移
  function setTranslateX(x) {
    ul.style.transform = "translateX(" + x + "px)";
    ul.style.webkitTransform = "translateX(" + x + "px)";
  }
}
