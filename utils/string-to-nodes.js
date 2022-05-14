export default function(keyword,searchValue){
    // 把遍历出来的关键字进行节点切割
      // console.log(keyword);
      let nodes=[];
      // 判断起始位置存不存在相匹配的字符串
      if(keyword.toUpperCase().startsWith(searchValue.toUpperCase())){
        const key1=keyword.slice(0,searchValue.length);
        const node1={
          name:"span",
          attrs:{
            style:"color:#00b26a;font-size:13px;"
          },
          children:[{
            type:'text',
            text:key1
          }]
        };
        nodes.push(node1);
        const key2=keyword.slice(searchValue.length);
        const node2={
          name:"span",
          attrs:{
            style:"color:black;font-size:13px;"
          },
          children:[{
            type:'text',
            text:key2
          }]
        };
        nodes.push(node2);
      }else{
        const node={
          name:"span",
          attrs:{
            style:"color:black;font-size:13px;"
          },
          children:[{
            type:"text",
            text:keyword
          }]
        }
        nodes.push(node)
      }
      return nodes
}