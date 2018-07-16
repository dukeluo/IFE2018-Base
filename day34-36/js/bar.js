/*
// 解耦之前
// 使用svg显示华东地区手机12个月的数据
var SVGNS = "http://www.w3.org/2000/svg";
function drawHistogram(data) {
    var width,
        height,
        xAxis,
        yAxis,
        barWidth,
        barSpace,
        barColor,
        axisColor,
        strokeWidth,
        max,
        pxDataRatio;

    width = 800;
    height = 400;
    xAxis = width - 20;
    yAxis = height - 20;
    barWidth = parseInt(xAxis/data.length*0.8);
    barSpace = parseInt(xAxis/data.length*0.2);
    barColor = "#37A2DA"
    axisColor = "#000";
    strokeWidth = "2";
    max = Math.max.apply(null, data);
    pxDataRatio = yAxis / max;

    var histogram;

    histogram = document.createElementNS(SVGNS, "svg");
    histogram.setAttribute("version", "1.1");
    histogram.setAttribute("baseProfile", "full");
    histogram.setAttribute("width", width);
    histogram.setAttribute("height", height);
    histogram.setAttribute("xmlns", SVGNS);

    var line;

    line = document.createElementNS(SVGNS, "line");
    line.setAttribute("x1", 10);
    line.setAttribute("x2", 10+xAxis);
    line.setAttribute("y1", height-10);
    line.setAttribute("y2", height-10);
    line.setAttribute("stroke", axisColor);
    line.setAttribute("fill", "transparent");
    line.setAttribute("stroke-width", strokeWidth);
    histogram.appendChild(line);
    line = document.createElementNS(SVGNS, "line");
    line.setAttribute("x1", 10);
    line.setAttribute("x2", 10);
    line.setAttribute("y1", height-10);
    line.setAttribute("y2", 10);
    line.setAttribute("stroke", axisColor);
    line.setAttribute("fill", "transparent");
    line.setAttribute("stroke-width", strokeWidth);
    histogram.appendChild(line);

    var rect,
        xpos,
        ypos,
        i;

    for (xpos = 10 + barSpace/2, i = 0; i < data.length; i++, xpos += barSpace+barWidth) {
        ypos = 10 + yAxis - data[i] * pxDataRatio;
        rect = document.createElementNS(SVGNS, "rect");
        rect.setAttribute("x", xpos);
        rect.setAttribute("y", ypos);
        rect.setAttribute("height", data[i]*pxDataRatio);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("stroke", barColor);
        rect.setAttribute("fill", barColor);
        rect.setAttribute("stroke-width", strokeWidth);
        histogram.appendChild(rect);
    }
    return histogram;
}
*/

histogram = {
    SVGNS: "http://www.w3.org/2000/svg",
    wrapperId: "",
    data: [],
    width: 800,
    height: 400,
    initAxisSpace: 20,
    axisColor: "#000",
    barColor: "#37A2DA",
    strokeWidth: "2",
    chart: null,
    x0: 0,
    y0: 0,
    xAxis: 0,
    yAxis: 0,
    barWidth: 0,
    barSpace: 0,
    pxDataRatio: 0,
    initBarSpace: 10,
    barNumOfOneGroup: 1,
    init: function () {
        this.x0 = 10;
        this.y0 = this.height - 10;
        this.xAxis = this.width - this.initAxisSpace;
        this.yAxis = this.height - this.initAxisSpace;
        this.chart = document.createElementNS(this.SVGNS, "svg");
        this.chart.setAttribute("version", "1.1");
        this.chart.setAttribute("baseProfile", "full");
        this.chart.setAttribute("width", this.width);
        this.chart.setAttribute("height", this.height);
        this.chart.setAttribute("xmlns", this.SVGNS);

        var line;

        line = document.createElementNS(this.SVGNS, "line");
        line.setAttribute("x1", this.x0);
        line.setAttribute("x2", this.x0+this.xAxis);
        line.setAttribute("y1", this.y0);
        line.setAttribute("y2", this.y0);
        line.setAttribute("stroke", this.axisColor);
        line.setAttribute("fill", "transparent");
        line.setAttribute("stroke-width", this.strokeWidth);
        this.chart.appendChild(line);
        line = document.createElementNS(this.SVGNS, "line");
        line.setAttribute("x1", this.x0);
        line.setAttribute("x2", this.x0);
        line.setAttribute("y1", this.y0);
        line.setAttribute("y2", this.y0-this.yAxis);
        line.setAttribute("stroke", this.axisColor);
        line.setAttribute("fill", "transparent");
        line.setAttribute("stroke-width", this.strokeWidth);
        this.chart.appendChild(line);
    },
    drawSingle: function () {
        var barWidth,
            barSpace,
            pxDataRatio;

        barWidth = this.barWidth || parseInt(this.xAxis/this.data.length*0.8);
        barSpace = this.barSpace || parseInt(this.xAxis/this.data.length*0.2);
        pxDataRatio = this.pxDataRatio || this.yAxis/Math.max.apply(null, this.data);

        var rect,
            x,
            y,
            i;

        for (x = this.initBarSpace + barSpace/2, i = 0; i < this.data.length; i++, x += barSpace+barWidth*this.barNumOfOneGroup) {
            y = 10 + this.yAxis - this.data[i] * pxDataRatio;
            rect = document.createElementNS(this.SVGNS, "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("height", this.data[i]*pxDataRatio);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("stroke-width", 0);   // 坑，不为0,复杂很多
            rect.setAttribute("fill", this.barColor);
            this.chart.appendChild(rect);
        }
    },
    setSingle: function (data) {
        this.init();
        this.data = data;
        this.drawSingle();
        document.querySelector("#"+this.wrapperId).appendChild(this.chart);
    },
    setGroup: function (arrayOfData, arrayOfColor) {
        var maxVal,
            prevColor,
            prevRatio,
            prevSpace,
            prevWidth,
            prevInitBarWidth,
            prevBarNumOfOneGroup;

        maxVal = arrayOfData.map(function (item, index, array) {
            return Math.max.apply(null, item);
        });
        prevColor = this.barColor;
        prevWidth = this.barWidth;
        prevSpace = this.barSpace;
        prevRatio = this.pxDataRatio;
        prevInitBarSpace = this.initBarSpace;
        prevBarNumOfOneGroup = this.barNumOfOneGroup;

        this.init();
        this.barNumOfOneGroup = arrayOfData.length;
        this.barWidth = parseInt(this.xAxis/arrayOfData[0].length*0.8/this.barNumOfOneGroup);     // 此处取整数造成小的合并并不等于大的宽度
        this.barSpace = parseInt(this.xAxis/arrayOfData[0].length*0.2);
        this.pxDataRatio = this.yAxis / Math.max.apply(null, maxVal);

        var i;

        for (i = 0; i < arrayOfData.length; i++) {
            this.data = arrayOfData[i];
            this.barColor = arrayOfColor[i];
            this.initBarSpace = 10 + i*this.barWidth;
            this.drawSingle();
        }
        document.querySelector("#"+this.wrapperId).appendChild(this.chart);
        this.barColor = prevColor;
        this.barWidth = prevWidth;
        this.barSpace = prevSpace;
        this.pxDataRatio = prevRatio;
        this.initBarSpace = prevInitBarSpace;
        this.barNumOfOneGroup = prevBarNumOfOneGroup;
    }
}
