# 组件名称及作用

删除提示组件，可用于删除数据提示

# 引入

`import BaseDelete from '@/components/Base/BaseDelete`

## 使用

<BaseDelete content visible onOk={} SetVisible={} />

## 参数

```bash
# 控制是否显示 -- Boolean
visible
# 内容文字 -- string
content
# 标题（选传） -- string
title
# 点击确定按钮后的事件 -- Function
onOK
# 控制visible方法 -- Function
SetVisible
# Dialog组件方法其他属性通用
```
