### keyup, keypress, keydown以及oninput

`keydown`： 当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。
`keypress`： 当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。按下ESC键也会触发这个事件。
`keyup`： 当用户释放键盘上的键时触发。
`oninput`： 当`<input>`或`<textarea>`元素的值发生改变时触发。

### XSS  
跨站脚本攻击(Cross Site Scripting)，缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

### HTML转义与反转义  

```javascript
//HTML转义
function HTMLEncode(html) {
    var temp,
        output;

    temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    output = temp.innerHTML;
    temp = null;
    return output;
}

//HTML反转义
function HTMLDecode(text) {
    var temp,
        output;

    temp = document.createElement("div");
    temp.innerHTML = text;
    output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}
```

