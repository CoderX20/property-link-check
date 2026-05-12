declare class PropertyCheckResult {
    type: string | null;
    value: any;
    exist_index: number;
}
/**
 * 判断一个对象中的深度属性是否存在，根据数组中的属性值依次调用并返回结果
 * @param obj 待确定的对象
 * @param properties 需要确定的属性名称，按调用的链式排序
 * @returns 返回调用的结果，包含属性类型、属性值、最后一个存在的属性索引
 */
export declare function checkProperty(obj: any, properties: string[]): PropertyCheckResult;
export {};
//# sourceMappingURL=index.d.ts.map