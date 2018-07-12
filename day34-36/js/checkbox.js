// 全局变量, 保存所有checkbox的wrapper id
var CHECKBOXSET_IDS;
CHECKBOXSET_IDS = ["region-radio-wrapper", "product-radio-wrapper"];

/**
 * @param  {string} wrapperId
 * @param  {Array} configInfo     配置对象的一个数组
 * @return {void}
 */
function createCheckBox(wrapperId, configInfo) {
    var checkBoxHTML,
        wrapper,
        keys,
        i;

    checkBoxHTML = '';
    checkBoxHTML += '<section><input type="checkbox" id="select-all" name= ' + configInfo[0].name + ' value="select-all" checkbox-type="all">';
    checkBoxHTML += '<label for="select-all">全选</label></section>';
    for (i = 0; i < configInfo.length; i++) {
        keys = Object.keys(configInfo[i]);
        if (keys.indexOf("id") === -1 || keys.indexOf("name") === -1 || keys.indexOf("value") === -1 || keys.indexOf("text") === -1) {
            console.log("WARNING! Wrong Config!");
            return ;
        }
        checkBoxHTML += '<section><input type="checkbox" id= ' + configInfo[i].id + ' name= ' + configInfo[i].name + ' value= ' + configInfo[i].value + ' checkbox-type="single">';
        checkBoxHTML += '<label for=' + configInfo[i].value + '>' + configInfo[i].text + '</label></section>';
    }
    wrapper = document.querySelector("#"+wrapperId);
    wrapper.innerHTML = checkBoxHTML;
    wrapper.onclick = function (event) {
        var targetElement,
            selectAllCheckbox,
            singleCheckboxsArray,
            alreadySelectedCheckboxsArray,
            i;

        targetElement = event.target;
        selectAllCheckbox = document.querySelector("#"+wrapperId+" input[checkbox-type='all']");
        singleCheckboxsArray = Array.apply(null, document.querySelectorAll("#"+wrapperId+" input[checkbox-type='single']"));
        alreadySelectedCheckboxsArray = singleCheckboxsArray.filter(function (item, index, array) {
          return item.checked === true;
        });
        if (targetElement.nodeName.toLowerCase() === "input") {
            if (targetElement === selectAllCheckbox) {
                if (alreadySelectedCheckboxsArray.length === singleCheckboxsArray.length) {
                    event.preventDefault();
                }
                singleCheckboxsArray.forEach(function (item, index, array) {
                    item.checked = true;
                });
            } else {
                if (alreadySelectedCheckboxsArray.length === 0) {
                    event.preventDefault();
                    targetElement.checked = true;
                } else if (alreadySelectedCheckboxsArray.length === singleCheckboxsArray.length) {
                    selectAllCheckbox.checked = true;
                } else {
                    selectAllCheckbox.checked = false;
                }
            }
        }
    }
}

// 取得根据checkbox所选值筛选后的sourceData
function getData() {
    var data,
        checkboxValue,
        i,
        j;

    data = sourceData;
    for (i = 0; i < CHECKBOXSET_IDS.length; i++) {
        checkboxValue = getCheckboxValue(CHECKBOXSET_IDS[i]);
        if (CHECKBOXSET_IDS[i] === "region-radio-wrapper") {
            data = data.filter(function (item, index, array) {
                for (j = 0; j < checkboxValue.length; j++) {
                    if (item.region === checkboxValue[j]) {
                        return true;
                    }
                }
                return false;
            });
        }
        if (CHECKBOXSET_IDS[i] === "product-radio-wrapper") {
            data = data.filter(function (item, index, array) {
                for (j = 0; j < checkboxValue.length; j++) {
                    if (item.product === checkboxValue[j]) {
                        return true;
                    }
                }
                return false;
            });
        }
    }
    return data;
}

// 取得一个wrapper下的checkbox所选值
function getCheckboxValue(id) {
    var checkboxs,
        res,
        i;

    res = [];
    id = "#" + id + " input[checkbox-type='single']";
    checkboxs = document.querySelectorAll(id);
    for (i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
            res.push(checkboxs[i].value);
        }
    }
    return res;
}

// 展开嵌套数组
function flatten2d(a) {
    var res,
        i;

    res = [];
    for (i = 0; i < a.length; i++) {
        res = res.concat(a[i]);
    }
    return res;
}
