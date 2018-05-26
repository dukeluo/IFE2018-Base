### Position相关概念及使用Postion进行布局的场景和方法？
- `position: static`静态定位，将元素放入普通流中的正常位置，是每个元素获取的默认值  

- `position: relative`相对定位，与静态定位非常相似，占据在普通流中，并且可以修改它的最终位置，通常只使用`top`和`left`属性移动；元素原来占据的空间没有被回收，其他元素也没有任何变化，因此有可能与其他元素重叠  

- `position: absolute`绝对定位，元素不再存在于普通流中，有自己的定位方式；元素原来占据的空间被回收；定位上下文是最近的“positioned”祖先元素，如果“positioned”祖先元素不存在，则相对于文档的`body`元素，并且它会随着页面滚动而移动；**一个“positioned”元素是指`position`值不是`static`的元素**   

- `position: fixed`固定定位，与绝对定位的工作方式完全相同，区别在于相对于浏览器视口本身  

定位用来覆盖普通流行为，以产生有趣的效果，比如创建一个浮动在页面其他部分顶部的UI元素。  
### Flexbox相关概念及使用Flexobx进行布局的场景和方法？
弹性盒子是一种新技术，如今各个浏览器都广泛支持，允许快速创建曾经被证明用CSS很难实现的一些复杂，灵活的布局和功能。  
[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)  
[Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)  

### 掌握常用的两栏、三栏布局的各种方式？
使用Float、Position或者Flexbox都可以传建两栏、三栏布局，应灵活应用，见课程编码任务。
