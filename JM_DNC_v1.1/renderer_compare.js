const { ipcRenderer } = require('electron');
const fs = require('fs');
const leftText = document.getElementById('leftText');
const rightText = document.getElementById('rightText');
const result = document.getElementById('result');

// #region SlideMenu
function openSlideMenu() {
    result.innerText = '';
    result_string = '';
    document.getElementById('menu').style.width = '20%';
    document.getElementById('content').style.marginLeft = '20%';
}
function closeSlideMenu() {
    result.innerText = '';
    result_string = '';
    document.getElementById('menu').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
}
const menuDiv = document.getElementById('menuBtn');
menuDiv.addEventListener('click', () => {
    result.innerText = '';
    result_string = '';
    openSlideMenu();
});

const index_li = document.getElementById('index');
const compare_li = document.getElementById('compare');
const td_li = document.getElementById('3d');
const else_li = document.getElementById('else');
const setting_li = document.getElementById('setting');
index_li.addEventListener('click', () => {
    document.getElementById('index_a').click();
});
compare_li.addEventListener('click', () => {
    document.getElementById('compare_a').click();
});
td_li.addEventListener('click', () => {
    document.getElementById('3d_a').click();
});
else_li.addEventListener('click', () => {
    document.getElementById('else_a').click();
});
setting_li.addEventListener('click', () => {
    document.getElementById('setting_a').click();
});
// #endregion SlideMenu

// #region file Open/Close
const leftSearchBtn = document.getElementById('leftSearch');
const rightSearchBtn = document.getElementById('rightSearch');
leftSearchBtn.addEventListener('click', () => {
    result.innerText = '';
    result_string = '';
    ipcRenderer.invoke('fileOpen');
    ipcRenderer.on('fileOpenCode', (event, { path, contents }) => {
        leftText.value = contents;
    });
});
// 메인에서 왼쪽 오른쪽 따로 ipc관리
rightSearchBtn.addEventListener('click', () => {
    result.innerText = '';
    result_string = '';
    ipcRenderer.invoke('compareFileOpen');
    ipcRenderer.on('compareFileOpenCode', (event, { path, contents }) => {
        rightText.value = contents;
    });
});
// #endregion file Open/Close

//#region Btn
const sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', () => {
    rightText.scrollTop = parseInt(result_string);
})

const deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', () => {
    result.innerText = '';
    result_string = '';
    leftText.value = '';
    rightText.value = '';
})

const fileOpen = document.getElementById('fileOpen');
fileOpen.addEventListener('click', () => {
    result.innerText = '';
    result_string = '';
    ipcRenderer.invoke('compareFileOpen');
    ipcRenderer.on('compareFileOpenCode', (event, { path, contents }) => {
        rightText.value = contents;
    });
})

const fileSave = document.getElementById('fileSave');
fileSave.addEventListener('click', () => {
    result.innerText = '';
    result_string = '';
    ipcRenderer.invoke('fileSave');
});
ipcRenderer.on('fileSaveCode', (event, { path }) => {
    const currentText = rightText.value;
    fs.writeFileSync(path, currentText, 'utf-8');
});

var codeCheckStatus = true;
const codeCheck = document.getElementById('codeCheck');
var result_string = '';
var result_status = true;
codeCheck.addEventListener('click', () => {
    // 왼쪽과 오른쪽 코드를 한줄씩 비교
    const rightText_lines = rightText.value.split("\n");
    const leftText_lines = leftText.value.split("\n");
    console.log(leftText_lines);
    console.log(rightText_lines);
    let rightText_len = rightText_lines.length;
    let leftText_len = leftText_lines.length;
    let compare_len = rightText_len > leftText_len ? rightText_len : leftText_len;
    for(let i = 0; i< compare_len;i++){
        if(rightText_lines[i] != leftText_lines[i]){
            result_string += (i+1) + ',';
            result_status = false;
        }else {

        }
    }
    if(result_status == true) {
        result.innerText = '모두 일치!';
    }else {
        result.innerText = result_string + '번 줄이 다릅니다!';
        result_status = !result_status;
    }
});
//#endregion Btn

//#region InitFunction
function initFunction() {
    loadText()
}
function loadText() {
    const textdata = localStorage.getItem('textdata');
    const text = JSON.parse(textdata);
    leftText.value = text;
}
//#endregion InitFunction
