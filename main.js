// Linux: a window disabled by a modal child keeps showing the child's last cursor.
// Open a child from the parent, hover one of the child's cursor areas, then move the pointer over the parent.
const { app, BrowserWindow, ipcMain } = require('electron');

let parent;

function openChild(kind) {
  const frameless = kind.startsWith('frameless');
  const child = new BrowserWindow({
    parent,
    modal: !kind.endsWith('non-modal'),
    width: 560,
    height: 420,
    frame: !frameless,
    resizable: true,
    title: kind,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  child.loadFile('index.html', { query: { child: kind } });
}

app.whenReady().then(() => {
  parent = new BrowserWindow({ width: 980, height: 700, title: 'Parent', webPreferences: { nodeIntegration: true, contextIsolation: false } });
  parent.loadFile('index.html');
  ipcMain.on('open-child', (_event, kind) => openChild(kind));
});

app.on('window-all-closed', () => app.quit());
