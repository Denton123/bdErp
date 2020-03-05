// 基准大小
const baseSize = 32
// 设置 rem 函数
function setRem () {
  var width = 1200
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    width = 375
    // 当前页面宽度相对于 375 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / width
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'

  } else {
    document.documentElement.style.fontSize = baseSize + 'px'
  }
}

// 初始化
setRem()
