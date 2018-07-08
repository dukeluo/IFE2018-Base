### 设置表格边框合并为一个单一边框  
`<table border="1" cellspacing="0" bordercolor="#000000" width = "80%" style="border-collapse:collapse;">`    
`border-collapse`是表格样式，而不是表格的属性，故应该表格`style`属性中指定。

### 展开嵌套一层的数组    
```javascript
function flatten2d(a) {
    var res,
        i;

    res = [];
    for (i = 0; i < a.length; i++) {
        res = res.concat(a[i]);
    }
    return res;
}
```

### 转化`NodeList`对象为数组
`array = Array.apply(null, nodeList);`     

### 汉字根据拼音排序
```javascript
function hansSortByAccent(a, b) {
    return a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'});
}
```    

### 表格相同单元格合并   
```javascript
// 在表格tb的col列从row行开始根据单元格内容自动添加rowspan
function autoRowSpan(tb, row, col) {
    var lastValue,
        currValue,
        count,
        i;

    lastValue = "";
    currValue = "";
    count = 0;
    for (i = row; i < tb.rows.length; i++) {
        currValue = tb.rows[i].cells[col].innerHTML;
        if (currValue === lastValue) {
            tb.rows[i].deleteCell(col);
            tb.rows[i-row-count].cells[col].rowSpan = row + count + 1;
            count++;
        } else {
            lastValue = currValue;
            count = 0;
        }
    }
}
```     
