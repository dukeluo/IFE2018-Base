// 全局变量，用于查询存储在localStorage中的数据
var KEY = "LOCAL_DATA";

// localStorage初始化
function initLocalStorage() {
    var data = [];

    if (!getLocalStorage()) {
        data = sourceData.slice();
        data = JSON.stringify(data);
        localStorage.setItem(KEY, data);
    }
}

// 获取localStorage
function getLocalStorage() {
    return JSON.parse(localStorage.getItem(KEY));
}

// 更新localStorage
function updateLocalStorage(product, region, index, value) {
    var localData = getLocalStorage(),
        i;

    for (i = 0; i < localData.length; i++) {
        if (localData[i]["product"] === product
            && localData[i]["region"] === region) {
            localData[i]["sale"][index] = value;
            break;
        }
    }
    localStorage.setItem(KEY, JSON.stringify(localData));
}
