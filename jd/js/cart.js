// 需求：
// 1-点击删除按钮，
// 桶盖打开  加open
// 模态框显示  dispay: block
// 删除盒子做动画  加bounceInDown

var dels = document.querySelectorAll(".del");
var winBox = document.querySelector(".win-box");
var delBox = document.querySelector(".del-box");
var cancel = document.querySelector(".btn-cancel");

dels.forEach(function (v, i) {
  v.onclick = function () {
    // 桶盖打开
    this.classList.add("open");
    // 模态框出现
    winBox.classList.add("show");
    // 删除盒子做动画
    delBox.classList.add("bounceInDown");
  };
});

// 点击取消按钮
// 模态框隐藏  去掉show;
// 去掉删除盒子类名   去掉bounceInDown
// 桶盖闭合   去掉 open

cancel.onclick = function () {
  winBox.classList.remove("show");
  delBox.classList.remove("bounceInDown");
  //把打开桶盖 进行闭合即可
  document.querySelector(".open").classList.remove("open");
};
