var SVGNS = "http://www.w3.org/2000/svg";

// 使用svg显示华东地区手机12个月的数据
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
    histogram.setAttribute("xmlns", "SVGNS");

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
