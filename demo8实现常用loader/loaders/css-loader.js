function loader(source) {
  return source;
  // const reg = /url\(.+?\)/g
  // source = source.replace(reg, function(str,b, c) {
  //     const url = str.slice(4, -1)
  //     return `'url('+require(${url}) + ')'`
  // })
  // return source
  // let pos = 0;
  // let current;
  // let arr = ['let list = [];'];
  // while(current = reg.exec(source)) {
  //     let [matchUrl] = current;
  //     const url = matchUrl.slice(4, -1)
  //     console.log(current)
  //     let last = reg.lastIndex - matchUrl.length;
  //     arr.push(`list.push(${JSON.stringify(source.slice(pos, last))});`)
  //     pos = reg.lastIndex;
  //     arr.push(`list.push('url'+require(${url})+')';`);

  // }
  // arr.push(`list.push(${JSON.stringify(source.slice(pos))});`)
  // arr.push(`module.exports=list.join('')`)
  // console.log(arr.join('\r\n'))
  // return arr.join('')
}
module.exports = loader;
