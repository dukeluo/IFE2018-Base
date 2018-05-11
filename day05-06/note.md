### 盒模型的概念?
HTML文档中每一个元素在页面布局结构中均呈现为一个矩形的盒子， 可简化为下面这个模型，也就是盒模型：  
![](https://mdn.mozillademos.org/files/13647/box-model-standard-small.png)
标准盒模型的`width`和`height`设置了内容框的宽和高，盒模型的总宽度是它的`width` 、`padding-right`、`padding-left`、`border-right`和`border-left`属性之和。  
使用属性`box-sizing`可以调整盒模型，使用值`border-box`可将盒模型更改为下图新的模型：  
![](https://mdn.mozillademos.org/files/13649/box-model-alt-small.png)
新模型的总宽度就是属性`width`所设置的宽度，`padding`和`border`并没有添加到总宽度上，而是占用内容框的空间，使内容更小。  

### inline、block和inline-block的概念?
inline、block和inline-block是`display`属性的三个常用值。  
- 块框(block box)是定义为堆放在其他框上的框（例如：其内容会独占一行），而且可以设置它的宽高，是块级元素`display`属性的默认值。
- 行内框(inline box)与块框是相反的，它随着文档的文字（例如：它将会和周围的文字和其他行内元素出现在同一行，而且它的内容会像一段中的文字一样随着文字部分的流动而打乱），对行内盒设置宽高无效，设置padding， margin 和 border都会更新周围文字的位置，但是对于周围的的块框不会有影响；是行内元素`display`属性的默认值。
- 行内块状框(inline-block box)像是上述两种的集合：它不会重新另起一行但会像行内框一样随着周围文字而流动，而且他能够设置宽高，并且像块框一样保持了其块特性的完整性，它不会在段落行中断开。  

### 内外边距，宽度，高度，box-sizing等属性?
- `padding`家族属性设置内边距的宽度
- `border`家族属性设置边界的宽度、样式和颜色
- `margin`家族属性设置包围CSS盒子外部区域的宽度，这个属性推开布局中其他的CSS盒子
- `box-sizing`属性用于更改用于计算元素宽度和高度的默认的CSS盒子模型，可以使用此属性来模拟不正确支持CSS盒子模型规范的浏览器的行为

### 浮动，清除浮动?
CSS中有三种定位机制普通流、浮动和绝对定位，对元素设置`float`属性后就脱离了普通流，浮动的元素不会影响到块框的布局而只会影响行内框（通常是文本）的排列，文档中的普通流就会表现得和浮动框不存在一样；`float`属性最初只用于在成块的文本内浮动图像，但是现在它已成为在网页上创建多列布局的最常用工具之一。   
因为浮动的这种特性，导致本属于普通流中的元素浮动之后，包含框内部由于不存在其他普通流元素了，就表现出高度为0的现象，也就是高度塌陷。在实际布局中，往往这并不是我们所希望的，所以需要闭合浮动元素，也就是清除浮动，使其包含框表现出正常的高度。
清楚浮动有很多种办法，[这儿](https://stackoverflow.com/questions/211383/what-methods-of-clearfix-can-i-use)有很多方法，父级元素使用`overflow: auto`是在现代浏览器中清除浮动的最简单方式。  

### 如何使用浮动进行布局?
对各栏浮动，[这儿](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats)有相关介绍。
