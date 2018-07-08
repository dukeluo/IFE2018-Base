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
