const { ipcRenderer } = require("electron");
const serialport = require('serialport');

const portName = document.getElementById('portNameid');
const baudRate = document.getElementById('baudRateid');
const dataBits = document.getElementById('dataBitsid');
const stopBits = document.getElementById('stopBitsid');
const Parity = document.getElementById('parityid');
const RTSCTS = document.getElementById('RTSCTSid');

const index_li = document.getElementById('index');
const compare_li = document.getElementById('compare');
const td_li = document.getElementById('3d');
const else_li = document.getElementById('else');
const setting_li = document.getElementById('setting');

const exitBtn = document.getElementById('exitBtn');

//#region exitBtn
exitBtn.addEventListener('click', () => {
    ipcRenderer.invoke('exitBtn');
});
//#endregion

// #region SlideMenu
function openSlideMenu() {
    document.getElementById('menu').style.width = '20%';
    document.getElementById('content').style.marginLeft = '20%';
}
function closeSlideMenu() {
    document.getElementById('menu').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
}
const menuDiv = document.getElementById('menuBtn');
menuDiv.addEventListener('click', () => {
    openSlideMenu();
});

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

//#region Init Function
function initFunction() {
    loadSerial();
}
function closeFunction() {
    getSerial();
}
function getSerial() {
    let portname = portName.value;
    let baudrate = baudRate.value;
    let databits = dataBits.value;
    let stopbits = stopBits.value;
    let parity = Parity.value;
    let rtscts = RTSCTS.value;
    let serialdata = {
        'portName': portname,
        'baudRate': baudrate,
        'dataBits': databits,
        'stopBits': stopbits,
        'parity': parity,
        'RTSCTS': rtscts,
    }
    localStorage.setItem('serialdata', JSON.stringify(serialdata));
};
function loadSerial() {
    const serialdata = localStorage.getItem('serialdata');
    const data = JSON.parse(serialdata);
    let portname = data.portName;
    let baudrate = data.baudRate;
    let databits = data.dataBits;
    let stopbits = data.stopBits;
    let parity = data.parity;
    let rtscts = data.RTSCTS;

    portName.value = portname;
    baudRate.value = baudrate;
    dataBits.value = databits;
    stopBits.value = stopbits;
    Parity.value = parity
    RTSCTS.value = rtscts;
}
//#endregion Init Function
