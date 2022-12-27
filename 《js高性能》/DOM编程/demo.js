/**
 * domLoopFn
 */
function domLoopFn() {
  var coll = document.getElementsByTagName('div')
  //不推荐
  //   for (var i = 0; i < coll.length; i++) {}
  //推荐 (访问len的性能比直接访问coll.length要好)
  var len = coll.length
  for (var i = 0; i < len; i++) {}
}

/**
 * collectionFn
 */
function collectionFn() {
  var coll = document.getElementsByTagName('div')
  var len = coll.length //优化点1：缓存length属性
  var name = ''
  var el = null
  for (var i = 0; i < len; i++) {
    el = coll[i] //优化点2：比连续三次访问coll[i].xxx性能好
    name += el.nodeName
    name += el.nodeType
    name = el.tagName
  }
  return name
}
