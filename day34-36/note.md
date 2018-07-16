### SVG
可缩放矢量图形，即SVG，是W3C XML的分支语言之一，用于标记可缩放的矢量图形。   

### 创建一个SVG元素
`var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");`

### `mouseleave`和`mouseout`
`mouseleave`在位于元素上方的鼠标光标移动到元素范围之外时触发，不冒泡，而且光标移动到后代元素上不会触发。   
`mouseout`在鼠标光标位于一个元素上方，用户将其移入另一个元素时触发。又移入的另一个元素可能位于前一个元素的外部，也可能是这个元素的子元素，会冒泡。
