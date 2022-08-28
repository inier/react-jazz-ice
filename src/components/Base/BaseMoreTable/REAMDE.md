# 组件名称及作用

表格优化组件 集成表格完整功能

# 引入

`import BaseMoreTable from '@/components/Base/BaseMoreTable`

## 使用

<BaseMoreTable content onOk={} visible SetVisible={}/>

## 参数

: any[]; // 表格 colum 项
?: {}; // 传入参数
: any[]; // table 数据源
: (value?: any) => void;
: BaseFormFilter[]; // 该属性传空数组，不显示高级筛选按钮
: string; // 输入框 placeholder
: string; // 输入框参数
?: (value?: any, type?: string) => void;
total: number; // 总条数
node?: ReactNode;
fixHeight?: number; // 页面离底部高度
propCurrent?: number; // 页码

```bash
# 表格column项 -- Array
columns
# 请求方法的传入参数 -- Object
param
# 修改请求方法的传入参数 -- Function
SetParam
# 获取table数据源的方法 -- Function
getTable
# table数据源 -- Array
tableData
# 高级筛选组件的参数（传空数组将不显示高级筛选按钮） -- Array
formList
# 搜索框占位符 -- String
placeholder
# 搜索框参数 -- String
searchValue
# 调用输入框确定方法（选传） -- Function
handleSubmit
# 数据源总条数 -- number
total
# 搜索栏左侧标签（选传） -- ReactNode
node
# 表格离页面底部高度 -- number
fixHeight
# 表格页码 -- number
propCurrent
# Table组件方法其他属性通用
```
