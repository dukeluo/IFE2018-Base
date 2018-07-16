// 创建系列checkbox
createCheckBox("product-radio-wrapper", [{
    id: "手机",
    name: "product",
    value: "手机",
    text: "手机"
}, {
    id: "笔记本",
    name: "product",
    value: "笔记本",
    text: "笔记本"
}, {
    id: "智能音箱",
    name: "region",
    value: "智能音箱",
    text: "智能音箱"
}]);

createCheckBox("region-radio-wrapper", [{
    id: "华东",
    name: "region",
    value: "华东",
    text: "华东"
}, {
    id: "华南",
    name: "region",
    value: "华南",
    text: "华南"
}, {
    id: "华北",
    name: "region",
    value: "华北",
    text: "华北"

}]);

// 为checkbox添加事件
document.querySelector("#radio-wrapper").onclick = function(event) {
    if (event.target.nodeName.toLowerCase() === "input") {
        var selectedRegionNum,
            selectedProductNum,
            table,
            i;

        createTable(getData());
        table = document.querySelector("#table-wrapper table");
        selectedRegionNum = getCheckboxValue("region-radio-wrapper").length;
        selectedProductNum = getCheckboxValue("product-radio-wrapper").length;
        if (selectedRegionNum === 1 && selectedProductNum !== 1) {
            for (i = 0; i < table.rows.length; i++) {
                exchCellValueOfOneRow(table, i, 0, 1);
            }
        }
        autoRowSpan(table, 1, 0);
    }
}

// 使用SVG绘制华东地区手机12个月数据直方图
// document.querySelector("#chart-using-svg").appendChild(drawHistogram(sourceData[0].sale));

// 使用canvas绘制华东地区手机12个月数据折线图
// document.querySelector("#chart-using-canvas").appendChild(drawLinechart(sourceData[0].sale));

// 为table添加事件，实时绘制直方图和折线图
document.querySelector("#table-wrapper").onmouseover = function (event) {
    if (event.target.nodeName.toLowerCase() === "td") {
        var cells,
            a,
            i;

        a = [];
        cells = event.target.parentElement.cells;
        for (i = 0; i < cells.length; i++) {
           a.push(+cells[i].innerHTML);
        }
        a = a.filter(function (item, index, array) {
            return !isNaN(item);
        });

        var wrapper;

        // 绘制直方图
        wrapper = document.querySelector("#chart-using-svg");
        if (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }
        histogram.wrapperId = "chart-using-svg";
        histogram.set(a);
        // 绘制折线图
        wrapper = document.querySelector("#chart-using-canvas");
        if (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }
        lineChart.wrapperId = "chart-using-canvas";
        lineChart.setSingle(a);
    }
}

// 为table添加事件，绘制所有折线图
document.querySelector("#table-wrapper").onmouseout = function (event) {
    var rowVals,
        tb,
        wrapper,
        i;

    rowVals = [];
    colors = ["#d93a49", "#f47920", "#ffd400", "#45b97c", "#009ad6", "#145b7d", "#6f60aa", "#80752c", "#87843b"];
    tb = document.querySelector("table");
    for (i = 1; i < tb.rows.length; i++) {
        var cells;

        cells = Array.prototype.map.call(tb.rows[i].cells, function (item, index, array) {
            return +item.innerHTML;
        });
        cells = cells.filter(function (item, index, array) {
            return !isNaN(item);
        });
        rowVals.push(cells);
    }
    wrapper = document.querySelector("#chart-using-canvas");
    if (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }
    lineChart.wrapperId = "chart-using-canvas";
    lineChart.setGroup(rowVals, colors);
}
