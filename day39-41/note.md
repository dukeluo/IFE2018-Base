### `encodeURI()`与`encodeURIComponent()`
`encodeURI()`主要用于整个URI，而`encodeURIComponent()`主要用于对URI中的某一段进行编码。  
它们的主要区别在于，`encodeURI()`不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而`encodeURIComponent()`则会对它发现的任何非标准字符进行编码。  
一般来说,我们使用`encodeURIComponent()`方法的时候要比使用`encodeURI()`更多，因为在实践中更常见的是对查询字符串参数而不是对基础URL进行编码。

### change事件
change事件在`<input>`, `<select>`, 和`<textarea>`元素的值更改时触发；与input事件不同，change事件不一定会对元素值的每次更改触发。
触发情景：  
 - `<input type="radio">`和`<input type="checkbox">`的默认选项被修改时，例如：通过点击或者键盘事件；
 - 当用户完成提交动作时，例如：点击了`<select>`中的一个选项，从`<input type="date">`标签选择了一个日期，通过`<input type="file">`标签上传了一个文件等；
 - 当标签的值被修改并且失焦后，但并未进行提交，例如：对`<textarea>`或者`<input type="text">`的值进行编辑后。

### History对象
[History 对象](https://javascript.ruanyifeng.com/bom/2.html)   
**`history.pushState()`会增加历史记录的条目，但是不会触发`hashchange`和`popstate`；`hashchange`也可以增加历史记录的条目，但是它却可以触发`popstate`。**    

### Ajax
[JavaScript教程 Ajax](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499861493e7c35be5e0864769a2c06afb4754acc6000)
