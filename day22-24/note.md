### 关于表单
`input.value`取到的值是字符串类型的。    

### 判断是不是数字  
```javascript
function isNumber(a) {
    if (a !== null && a !== "") {
        return !isNaN(a);
    }
    return false;
}
```

### 统计行数  
`var n = text.split(/\r|\r\n|\n/).length;`  
Unix系统里，每行结尾只有"<换行>"，即`\n`；Windows系统里面，每行结尾是"<回车><换行>"，即`\r\n`；Mac系统里，每行结尾是"<回车>"，即`\r`。  

### 全角空格与半角空格
在unicode编码中，全角空格为12288，半角空格为32。  
