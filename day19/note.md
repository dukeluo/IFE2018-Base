| 属性                     | 解释                                                                     |
| :---                    | :---                                                                     |
| getElementById()        | 接受一个表示目标id的字符串，返回匹配id的`Element`对象，如不存在，返回`null`        |
| getElementsByTagName()  | 接受一个表示目标标签名的字符串，返回匹配标签名的`Element`对象，如不存在，返回`null`  |
| childNodes              | `Node`类型的一个只读属性，保存着一个`Nodelist`实例，包含了指定元素的子结点         |
| parentNode              | `Node`类型的一个只读属性，保存着指定元素的父结点                                |
| querySelector()         | 接收一个合法的css选择器，返回与该模式匹配的第一个元素，如果没有匹配的元素，则返回null;`Element`类型调用时，选择器首先会应用到整个文档，来创建一个可能有匹配元素的初始列表，然后从结果元素中检查它们是否是基础元素的后代元素，返回第一个匹配的元素|
| querySelectorAll()      | 接收一个合法的css选择器，返回一个`Nodelist`实例，包含与该模式匹配的所有元素         |
