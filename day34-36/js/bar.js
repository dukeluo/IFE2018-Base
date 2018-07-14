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
    draw: function () {
        var xAxis,
            yAxis,
            barWidth,
            barSpace,
            pxDataRatio;

        xAxis = this.width - this.initAxisSpace;
        yAxis = this.height - this.initAxisSpace;
        barWidth = parseInt(xAxis/this.data.length*0.8);
        barSpace = parseInt(xAxis/this.data.length*0.2);
        pxDataRatio = yAxis / Math.max.apply(null, this.data);

        var histogram;

        histogram = document.createElementNS(this.SVGNS, "svg");
        histogram.setAttribute("version", "1.1");
        histogram.setAttribute("baseProfile", "full");
        histogram.setAttribute("width", this.width);
        histogram.setAttribute("height", this.height);
        histogram.setAttribute("xmlns", this.SVGNS);

        var line,
            x0,
            y0;

        x0 = 10;
        y0 = this.height - 10;
        line = document.createElementNS(this.SVGNS, "line");
        line.setAttribute("x1", x0);
        line.setAttribute("x2", x0+xAxis);
        line.setAttribute("y1", y0);
        line.setAttribute("y2", y0);
        line.setAttribute("stroke", this.axisColor);
        line.setAttribute("fill", "transparent");
        line.setAttribute("stroke-width", this.strokeWidth);
        histogram.appendChild(line);
        line = document.createElementNS(this.SVGNS, "line");
        line.setAttribute("x1", x0);
        line.setAttribute("x2", x0);
        line.setAttribute("y1", y0);
        line.setAttribute("y2", y0-yAxis);
        line.setAttribute("stroke", this.axisColor);
        line.setAttribute("fill", "transparent");
        line.setAttribute("stroke-width", this.strokeWidth);
        histogram.appendChild(line);

        var rect,
            xpos,
            ypos,
            i;

        for (xpos = 10 + barSpace/2, i = 0; i < this.data.length; i++, xpos += barSpace+barWidth) {
            ypos = 10 + yAxis - this.data[i] * pxDataRatio;
            rect = document.createElementNS(this.SVGNS, "rect");
            rect.setAttribute("x", xpos);
            rect.setAttribute("y", ypos);
            rect.setAttribute("height", this.data[i]*pxDataRatio);
            rect.setAttribute("width", barWidth);
            rect.setAttribute("stroke", this.barColor);
            rect.setAttribute("fill", this.barColor);
            rect.setAttribute("stroke-width", this.strokeWidth);
            histogram.appendChild(rect);
        }
        return histogram;
    },
    set: function (a) {
        this.data = a;
        document.querySelector("#"+this.wrapperId).appendChild(this.draw());
    }
}
