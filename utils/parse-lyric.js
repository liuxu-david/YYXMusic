// 解析歌词工具
const timeRegExp=/\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
export function parseLyric(lyricString){
  const luricInfos=[]
  const luricStrings=lyricString.split("\n");
 for(let lineString of luricStrings){
  //  ======================时间获取======================
 //  进行正则匹配
 const timeResult= timeRegExp.exec(lineString);
//  如果匹配不到就继续下次匹配
 if(!timeResult) continue
 const minite=timeResult[1]*60*1000;
 const second=timeResult[2]*1000;
 const millisecond=timeResult[2].length===2?timeResult[2]*10:timeResult[2]*1;
 const time=minite+second+millisecond;
//  console.log(time);
//  ======================歌词文本获取======================
// 把前面的时间替换成空的字符串
 const text=lineString.replace(timeRegExp,"");
//  console.log(text);
luricInfos.push({time,text});
 }
  return luricInfos
}