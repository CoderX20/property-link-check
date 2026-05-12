class PropertyCheckResult{
  type:string | null=null
  value:any=null
  exist_index:number=-1
}

/**
 * 判断一个对象中的深度属性是否存在，根据数组中的属性值依次调用并返回结果
 * @param obj 待确定的对象
 * @param properties 需要确定的属性名称，按调用的链式排序
 * @returns 返回调用的结果，包含属性类型、属性值、最后一个存在的属性索引
 */
export function checkProperty(obj:any,properties:string[]):PropertyCheckResult{
  const result=new PropertyCheckResult()
  if(!obj){
    result.type=typeof obj
    result.value=obj
    return result
  }
  if(!Array.isArray(properties)){
    throw new Error(`${properties} is not an array`)
  }
  let current_obj=obj
  properties.forEach((key:string,index:number)=>{
    const property_keys= Object.getOwnPropertyNames(current_obj)
    if(property_keys.includes(key)){
      result.type=typeof current_obj[key]
      result.value=current_obj[key]
      result.exist_index=index
      current_obj=current_obj[key]
    }
    else{
      result.type=typeof current_obj[key]
      result.value=current_obj[key]
      return result
    }
  })
  return result
}