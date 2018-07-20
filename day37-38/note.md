1.性能差异

对比border:0;与border:none;之间的区别在于有渲染和没渲染；

【border:0;】把CSS中的border设为“0”像素虽然在页面上看不见，但按border默认值理解，浏览器依然对border-width/border-color进行了渲染，即已经占用了内存值。
【border:none;】把CSS中的border设为“none”即没有，浏览器解析“none”时将不作出渲染动作，即不会消耗内存值。

2.兼容性差异

兼容性差异只针对浏览器IE6、IE7与标签button、input而言，在win、win7、vista的XP主题下均会出现此情况。

parentElement is new to Firefox 9 and to DOM4, but it has been present in all other major browsers for ages.

In most cases, it is the same as parentNode. The only difference comes when a node's parentNode is not an element. If so, parentElement is null.
