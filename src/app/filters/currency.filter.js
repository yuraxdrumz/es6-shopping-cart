export function currencyFilter(){
  return (item,cur)=>{
    if(typeof cur == 'undefined'){
      return item
    }else{
      return `${(item*cur[Object.keys(cur)]).toFixed(2)} ${Object.keys(cur)}`
    }
  }
}
