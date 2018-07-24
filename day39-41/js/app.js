// 初始化localStorage
initLocalStorage();

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

// 为checkbox添加事件，根据选择项绘制表格
function drawTableAccordingToCheckbox() {
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

document.querySelector("#radio-wrapper").addEventListener("change", drawTableAccordingToCheckbox, false);

// 为checkbox添加时间，根据选择项设置location hash
function setLoactionHashAccordingToCheckbox() {
    var selectedRegionItems = getCheckboxValue("region-radio-wrapper"),
        selectedProductItems = getCheckboxValue("product-radio-wrapper"),
        hash = location.hash || "region=&product=",
        regionHash = "region=",
        productHash = "product=";

    if (selectedRegionItems.length === 0 || selectedProductItems.length === 0) {
        return ;
    }
    regionHash += selectedRegionItems.join("+");
    productHash += selectedProductItems.join("+");
    hash = hash.split("&");
    if (regionHash.length !== 7) {
        hash[0] = regionHash;
    }
    if (productHash.length !== 8) {
        hash[1] = productHash;
    }
    location.hash = hash.join("&");
}

document.querySelector("#radio-wrapper").addEventListener("change", setLoactionHashAccordingToCheckbox, false);

// 为table添加事件，实时绘制直方图和折线图
function drawChartWhenHover(event) {
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
        histogram.setSingle(a);
        // 绘制折线图
        wrapper = document.querySelector("#chart-using-canvas");
        if (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }
        lineChart.wrapperId = "chart-using-canvas";
        lineChart.setSingle(a);
    }
}

document.querySelector("#table-wrapper").addEventListener("mouseover", drawChartWhenHover, false);

// 为table添加事件，绘制所有折线图和折线图
function drawAllCharts(event) {
    var rowVals,
        tb,
        wrapper,
        i;

    rowVals = [];
    colors = ["#d93a49", "#f47920", "#ffd400", "#45b97c", "#009ad6", "#145b7d", "#6f60aa", "#ef5b9c", "#87843b"];
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
    // 绘制直方图
    wrapper = document.querySelector("#chart-using-svg");
    if (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }
    histogram.wrapperId = "chart-using-svg";
    histogram.setGroup(rowVals, colors);
    // 绘制折线图
    wrapper = document.querySelector("#chart-using-canvas");
    if (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }
    lineChart.wrapperId = "chart-using-canvas";
    lineChart.setGroup(rowVals, colors);
}

document.querySelector("#table-wrapper").addEventListener("mouseout", drawAllCharts, false);

// 为table添加事件，点击单元格可对单元格编辑
function editTdOfTable(event) {
    if (event.target.nodeName.toLowerCase() === "td") {
          var td = event.target,
              editableCell = document.querySelector("div.edit-group");

          if (editableCell) {
              editableStatusExit(editableCell, editableCell.firstChild.value);
          }
          if (td.getAttribute("class") === "sale") {
              tdToEditableStatus(td);
          }
    }
}

document.querySelector("#table-wrapper").addEventListener("click", editTdOfTable, false);

// 为document添加事件，关闭多余的可编辑单元格
function cancelImproperEditableCell(event) {
    // 避免事件冲突，这是一个大坑，此处不是一个好的解决方法
    if ((event.target.nodeName.toLowerCase() !== "td")
        && (event.target.nodeName.toLowerCase() !== "button")) {
        var editableCell = document.querySelector("div.edit-group");

        if (editableCell) {
            editableStatusExit(editableCell, editableCell.firstChild.value);
        }
    }
}

document.querySelector("body").addEventListener("click", cancelImproperEditableCell, false);

// 为window添加事件，页面加载完毕后，根据location.hash值勾选checkbox
function changeCheckboxValueAccordingToHashState() {
    var hash = decodeURIComponent(location.hash).slice(1).split("&"),
        regionState = hash[0].slice(hash[0].indexOf("=")+1),
        productState = hash[1].slice(hash[1].indexOf("=")+1);

    if (regionState.length === 0 || productState.length === 0) {
        return ;
    }
    regionState = regionState.split("+");
    productState = productState.split("+");

    var regionCheckboxs = document.querySelectorAll("#region-radio-wrapper input[checkbox-type='single']"),
        productCheckboxs = document.querySelectorAll("#product-radio-wrapper input[checkbox-type='single']"),
        regionAllCheckboxs = document.querySelector("#region-radio-wrapper input[checkbox-type='all']"),
        productAllCheckboxs = document.querySelector("#product-radio-wrapper input[checkbox-type='all']"),
        i;

    // 当hash中选定值为3个时，勾上全选
    // 处理不妥，合理的情况下，应该是checkbox组绑定的事件处理全选与否
    // 因为checkbox组绑定的是click事件，通过js设置checked状态，并不会触发
    // 此处是偷懒行为，因为我不想重构了
    if (regionState.length === 3) {
        regionAllCheckboxs.checked = true;
    }
    if (productState.length === 3) {
        productAllCheckboxs.checked = true;
    }
    for (i = 0; i < regionState.length; i++) {
        if (regionState[i] === "华东") {
            regionCheckboxs[0].checked = true;
        }
        if (regionState[i] === "华南") {
            regionCheckboxs[1].checked = true;
        }
        if (regionState[i] === "华北") {
            regionCheckboxs[2].checked = true;
        }
    }
    for (i = 0; i < productState.length; i++) {
        if (productState[i] === "手机") {
            productCheckboxs[0].checked = true;
        }
        if (productState[i] === "笔记本") {
            productCheckboxs[1].checked = true;
        }
        if (productState[i] === "智能音箱") {
            productCheckboxs[2].checked = true;
        }
    }
}

window.addEventListener("load", function () {
    changeCheckboxValueAccordingToHashState();
    drawTableAccordingToCheckbox();
    drawAllCharts();
}, false);
