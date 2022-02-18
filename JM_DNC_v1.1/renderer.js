const { ipcRenderer } = require('electron');
const serialport = require('serialport');
const fs = require('fs');

const text = document.getElementById('text');
const pathtext = document.getElementById('path');
const sendBtn = document.getElementById('sendBtn');
const portBtn = document.getElementById('portBtn');
const fileOpen = document.getElementById('fileOpen');
const fileSave = document.getElementById('fileSave')
const deleteBtn = document.getElementById('delete');

const portStatus = document.getElementById('portStatus');
const portStatusIcon = document.getElementById('portStatusIcon');

//#region SerialPort
let portBool = false;
let port;
var portname, baudrate, databits, stopbits, Parity, RTSCTS;

portBtn.addEventListener('click', () => {
    if(portBool === false) {
        portOpen();
        console.log(portBool);
        port.open(function (err) {
            if (err) {
                console.log(err);
            } else {
                //read
                port.on('data', function (data) {
                    text.value += data;
                    text.scrollTop = text.scrollHeight;
                    console.log(data);
                });
                //write
                sendBtn.addEventListener('click', () => {
                    port.write(text.value);
                });
            }
        })
    } else {
        portClose();
        console.log(portBool);

    }
});

//#endregion SerialPort

//#region DeleteBtn
deleteBtn.addEventListener('click', () => {
    text.value = '';
});
//#endregion DeleteBtn

//#region fileOpen, fileSave
fileOpen.addEventListener('click', () => {
    ipcRenderer.invoke('fileOpen');
})
ipcRenderer.on('fileOpenCode', (event, { path, contents }) => {
    pathtext.innerText = path;
    text.value = contents;
});

fileSave.addEventListener('click', () => {
    ipcRenderer.invoke('fileSave');
})
ipcRenderer.on('fileSaveCode', (event, { path }) => {
    const currentText = text.value;
    fs.writeFileSync(path, currentText, 'utf-8');
});
//#endregion fileOpen, fileSave

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

//#region InitFunction
function initFunction() {

}
//#endregion InitFunction

//#region CloseFunction
function closeFunction() {
    getText()
}
function getText() {
    localStorage.setItem('textdata', JSON.stringify(text.value));
}

//#endregion CloseFunction

//#region SerialPort Open/Close
function getSerial() {
    const serialdata = localStorage.getItem('serialdata');
    const data = JSON.parse(serialdata);
    portname = data.portName;
    baudrate = parseInt(data.baudRate);
    databits = parseInt(data.dataBits);
    stopbits = parseInt(data.stopBits);
    Parity = data.parity;
    RTSCTS = (data.RTSCTS === 'true');
    console.log(portname, baudrate, databits, stopbits, Parity, RTSCTS);
}

var setting_a = document.getElementById('setting_a')

function portOpen() {
    portBool = !portBool;
    getSerial();
    port = new serialport(portname, {
        baudRate: baudrate,
        dataBits: databits,
        stopBits: stopbits,
        parity: Parity,
        rtscts: RTSCTS,
        autoOpen: false,
    });
    portStatus.innerText = '포트 : ON';
    portStatus.style.color = '#00c853';
    portStatusIcon.style.opacity = 0.5;
    console.log('port open!');
    setting_li.style.opacity = 0;
}
function portClose() {
    port.close();
    portBool = !portBool;
    portStatus.innerText = '포트 : OFF';
    portStatus.style.color = 'white';
    portStatusIcon.style.opacity = 1;
    console.log('port close!');
    setting_li.style.opacity = 1;
}
//#endregion SerialPort Open/Close
