// 解耦之前
// 使用canvas显示华东地区手机12个月的数据
/*
function drawLinechart(data) {
    var width,
        height,
        initAxisSpace,
        xAxis,
        yAxis,
        axisColor,
        pointSpace,
        pointRadius,
        pointColor,
        lineColor,
        strokeWidth,
        max,
        pxDataRatio;

    width = 800;
    height = 400;
    initAxisSpace = 20;
    xAxis = width - initAxisSpace;
    yAxis = height - initAxisSpace;
    axisColor = "#000";
    pointSpace = parseInt(xAxis/data.length);
    pointRadius = "3";
    pointColor = "transparent";
    lineColor = "#37A2DA";
    strokeWidth = "2";
    max = Math.max.apply(null, data);
    pxDataRatio = yAxis / max;

    var lineChart;

    lineChart = document.createElement("canvas");
    lineChart.setAttribute("width", width);
    lineChart.setAttribute("height", height);
    lineChart.innerHTML = "A drawing of a line chart.";

    var context,
        x0,
        y0;

    x0 = 10;
    y0 = height - 10;
    context = lineChart.getContext("2d");
    context.strokeStyle = axisColor;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x0, y0-yAxis);
    context.moveTo(x0, y0);
    context.lineTo(x0+xAxis, y0);
    context.stroke();

    var i,
        x,
        y,
        tx,
        ty;

    context.fillStyle = pointColor;
    context.strokeStyle = lineColor;
    for (x = x0, i = 0; i < data.length; i++, x += pointSpace) {
        y = y0 - data[i] * pxDataRatio;
        context.beginPath();
        context.arc(x, y, pointRadius, 0, 2*Math.PI, false);
        context.stroke();
        if (i) {
            context.beginPath();
            context.moveTo(tx, ty);
            context.lineTo(x, y);
            context.stroke();
        }
        tx = x;
        ty = y;
    }
    return lineChart;
}
*/

lineChart = {
    wrapperId: "",
    data: [],
    width: 800,
    height: 400,
    initAxisSpace: 20,
    axisColor: "#000",
    pointRadius: "3",
    pointColor: "transparent",
    lineColor: "#37A2DA",
    strokeWidth: "2",
    chart: document.createElement("canvas"),
    x0: 0,
    y0: 0,
    init: function () {
        var xAxis,
            yAxis,
            context;

        this.x0 = 10;
        this.y0 = this.height - 10;
        this.chart.setAttribute("width", this.width);
        this.chart.setAttribute("height", this.height);
        this.chart.innerHTML = "A drawing of a line chart.";
        xAxis = this.width - this.initAxisSpace;
        yAxis = this.height - this.initAxisSpace;
        context = this.chart.getContext("2d");
        context.strokeStyle = this.axisColor;
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x0, y0-yAxis);
        context.moveTo(x0, y0);
        context.lineTo(x0+xAxis, y0);
        context.stroke();
    }


    init: function () {
        var xAxis,
            yAxis,
            pointSpace,
            pxDataRatio;

        xAxis = this.width - this.initAxisSpace;
        yAxis = this.height - this.initAxisSpace;
        pointSpace = parseInt(xAxis/this.data.length);
        pxDataRatio = yAxis / Math.max.apply(null, this.data);

        var lineChart;
        lineChart = document.createElement("canvas");
        lineChart.setAttribute("width", this.width);
        lineChart.setAttribute("height", this.height);
        lineChart.innerHTML = "A drawing of a line chart.";

        var context,
        x0,
        y0;

        x0 = 10;
        y0 = this.height - 10;
        context = lineChart.getContext("2d");
        context.strokeStyle = this.axisColor;
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x0, y0-yAxis);
        context.moveTo(x0, y0);
        context.lineTo(x0+xAxis, y0);
        context.stroke();
    },
    drawSingle: function () {

        var i,
            x,
            y,
            tx,
            ty;

        context.fillStyle = this.pointColor;
        context.strokeStyle = this.lineColor;
        for (x = x0, i = 0; i < this.data.length; i++, x += pointSpace) {
            y = y0 - this.data[i] * pxDataRatio;
            context.beginPath();
            context.arc(x, y, this.pointRadius, 0, 2*Math.PI, false);
            context.stroke();
            if (i) {
                context.beginPath();
                context.moveTo(tx, ty);
                context.lineTo(x, y);
                context.stroke();
            }
            tx = x;
            ty = y;
        }
        return lineChart;
    },
    // drawGroup: function ()
    setSingle: function (data) {
        this.data = data;
        document.querySelector("#"+this.wrapperId).appendChild(this.drawSingle());
    }
    setGroup: function (arrayOfData, arrayOfColor) {
        var i;

        for (i = 0; i < arrayOfData.length; i++) {
            this.data = arrayOfData[i];
            this.lineColor = arrayOfColor[i];
            this.drawSingle();
        }

    }
}
