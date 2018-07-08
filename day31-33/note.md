<table border="1" cellspacing="0" bordercolor="#000000" width = "80%" style="border-collapse:collapse;">

function flatten2d(a) {
    var res,
        i;

    res = [];
    for (i = 0; i < a.length; i++) {
        res = res.concat(a[i]);
    }
    return res;
}
      singleCheckboxsArray = Array.apply(null, document.querySelectorAll("#"+wrapperId+" input[checkbox-type='single']"));

      ['张三','李四','王五'].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'}))
