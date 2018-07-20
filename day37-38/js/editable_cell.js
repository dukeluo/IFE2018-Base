// 单元格进入编辑状态
function tdToEditableStatus(td) {
    var div;
    div = document.createElement("div");
    div.setAttribute("class", "edit-group");

    var input;
    input = document.createElement("input");
    input.type = "text";
    input.setAttribute("class", "edit-input");
    input.value = td.innerHTML;

    var checkedBtn;
    checkedBtn = document.createElement("button");
    checkedBtn.setAttribute("class", "checked-item");

    var deleteBtn;
    deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-item");

    var initVal = +td.innerHTML;
    div.appendChild(input);
    div.appendChild(checkedBtn);
    div.appendChild(deleteBtn);
    div.addEventListener("click", function (event) {
        return editingStatusTrigger(event, initVal);
    }, false);
    div.addEventListener("keyup", function (event) {
        return editingStatusTrigger(event, initVal);
    }, false);
    td.innerHTML = "";
    td.appendChild(div);
    td.setAttribute("class", "editable");
    input.focus();
}

// 单元格退出编辑状态
function editableStatusExit(div, val) {
    var td = div.parentNode;

    td.innerHTML = val;
    td.setAttribute("class", "sale");
}

// 编辑状态下的单元格状态切换
function editingStatusTrigger(event, initVal) {
    var eTarget = event.target,
        eType = event.type;
        input = document.querySelector("input.edit-input");

    if ((eType === "click" && eTarget.getAttribute("class") === "delete-item")
        || (eType === "keyup" && event.keyCode === 27)) {
        editableStatusExit(eTarget.parentNode, initVal);
    }
    if ((eType === "click" && eTarget.getAttribute("class") === "checked-item")
        || (eType === "keyup" && event.keyCode === 13)) {
        var val = input.value,
            td = eTarget.parentNode.parentNode,
            product = td.getAttribute("data-product"),
            region = td.getAttribute("data-region");

        if (isNaN(val)) {
            alert("Input is not a number!!!");
            input.focus();
        } else {
            updateLocalStorage(product, region,td.cellIndex-2, +val);
            editableStatusExit(eTarget.parentNode, val);
        }
    }
}
