# property-link-check

## 中文说明

### 功能简介

当 API 返回的数据对象层级较深时，业务代码里常会出现连续取值：

```javascript
Data["key1"]["key2"]["key3"]
```

如果中间某一层不存在，或者值为 `null` / `undefined`，后续访问就可能报错。

`property-link-check` 用于按属性链逐级检查对象，并返回当前检查结果，帮助你在真正读取深层属性前先确认链路是否存在。

### 安装

```bash
npm install property-link-check
```

### 使用方式

```javascript
import { checkProperty } from "property-link-check";

const data = {
  id: "00",
  parent: {
    father: {
      name: "john",
    },
  },
};

const result = checkProperty(data, ["parent", "father", "name"]);

console.log(result);
```

输出示例：

```javascript
{
  type: "string",
  value: "john",
  exist_index: 2
}
```

### API

```ts
checkProperty(obj: any, properties: string[]): PropertyCheckResult
```

参数说明：

- `obj`: 要检查的目标对象
- `properties`: 属性链数组，按照访问顺序传入，例如 `["parent", "father", "name"]`

返回值 `PropertyCheckResult`：

```ts
{
  type: string | null
  value: any
  exist_index: number
}
```

字段说明：

- `type`: 当前命中值的 `typeof` 结果
- `value`: 当前命中的值
- `exist_index`: 最后一个成功命中的属性下标；如果一个属性都没命中，则为 `-1`

### 行为示例

1. 完整命中

```javascript
checkProperty(data, ["parent", "father", "name"]);
```

结果：

```javascript
{
  type: "string",
  value: "john",
  exist_index: 2
}
```

2. 中途属性不存在

```javascript
checkProperty(data, ["parent", "brother", "name"]);
```

结果：

```javascript
{
  type: "undefined",
  value: undefined,
  exist_index: 0
}
```

说明：

- `parent` 存在，所以 `exist_index` 是 `0`
- `brother` 不存在，因此返回该位置的 `undefined`

3. 属性值存在，但值本身为 `null`

```javascript
const data2 = { profile: null };

checkProperty(data2, ["profile"]);
```

结果：

```javascript
{
  type: "object",
  value: null,
  exist_index: 0
}
```

### 注意事项

- `properties` 必须是数组，否则会抛出异常
- 当前版本中，如果 `obj` 本身是 `undefined`、`null`、`false`、`0` 等假值，函数会直接返回，不继续校验属性链
- 当前实现使用的是对象自身属性检查，不会沿原型链查找

### 测试

项目已包含测试用例，可直接运行：

```bash
npm test
```

测试覆盖了完整命中、链路中断、`undefined` / `null` / `false` / `0`、非法参数等常见场景。

---

## English

### Overview

When an API returns a deeply nested object, application code often accesses properties like this:

```javascript
Data["key1"]["key2"]["key3"]
```

If any intermediate level is missing, or the value is `null` / `undefined`, the next access may throw an error.

`property-link-check` checks an object step by step using a property path and returns the current lookup result, so you can verify the path before reading deeply nested values.

### Installation

```bash
npm install property-link-check
```

### Usage

```javascript
import { checkProperty } from "property-link-check";

const data = {
  id: "00",
  parent: {
    father: {
      name: "john",
    },
  },
};

const result = checkProperty(data, ["parent", "father", "name"]);

console.log(result);
```

Example output:

```javascript
{
  type: "string",
  value: "john",
  exist_index: 2
}
```

### API

```ts
checkProperty(obj: any, properties: string[]): PropertyCheckResult
```

Parameters:

- `obj`: the target object to inspect
- `properties`: the property path in access order, for example `["parent", "father", "name"]`

Return type `PropertyCheckResult`:

```ts
{
  type: string | null
  value: any
  exist_index: number
}
```

Field meanings:

- `type`: the `typeof` result of the current matched value
- `value`: the current matched value
- `exist_index`: the index of the last successfully matched property; `-1` means no property was matched

### Behavior Examples

1. Full path exists

```javascript
checkProperty(data, ["parent", "father", "name"]);
```

Result:

```javascript
{
  type: "string",
  value: "john",
  exist_index: 2
}
```

2. Path breaks in the middle

```javascript
checkProperty(data, ["parent", "brother", "name"]);
```

Result:

```javascript
{
  type: "undefined",
  value: undefined,
  exist_index: 0
}
```

Notes:

- `parent` exists, so `exist_index` is `0`
- `brother` does not exist, so the function returns `undefined` at that point

3. Property exists but the value is `null`

```javascript
const data2 = { profile: null };

checkProperty(data2, ["profile"]);
```

Result:

```javascript
{
  type: "object",
  value: null,
  exist_index: 0
}
```

### Notes

- `properties` must be an array, otherwise the function throws an error
- In the current version, if `obj` itself is a falsy value such as `undefined`, `null`, `false`, or `0`, the function returns immediately without checking the property path
- The current implementation checks only own properties and does not walk the prototype chain

### Tests

The repository already includes test cases. Run:

```bash
npm test
```

The tests cover successful lookups, broken paths, `undefined` / `null` / `false` / `0`, invalid parameters, and other common cases.
