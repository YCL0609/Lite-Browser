const { app, BrowserWindow, Menu } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    // 设置主窗口初始尺寸
    width: 1024,
    height: 600,
    // 设置主窗口最小尺寸
    minWidth: 1024,
    minHeight: 600
  })
  // 加载主页
  win.loadFile('index.html')
}
 
// 显示主窗口
app.whenReady().then(() => {
  createWindow( )
})
// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 自定义菜单
const menuTemplate = [{
  label: '编辑...',
  submenu: [{
    label: '剪切',
    accelerator: 'Ctrl+X',
    role: 'cut'
  }, {
    label: '复制',
    accelerator: 'Ctrl+C',
    role: 'copy'
  }, {
    label: '粘贴',
    accelerator: 'Ctrl+V',
    role: 'paste'
  }, {
    type: 'separator'
  }, {
    label: '撤销',
    accelerator: 'Ctrl+Z',
    role: 'undo'
  }, {
    label: '全选',
    accelerator: 'Ctrl+A',
    role: 'selectall'
  },]
}, {
  label: '刷新 (F5)',
  accelerator: 'F5',
  role: 'reload'
}, {
  label: '忽略缓存刷新 (shift+F5)',
  accelerator: 'shift+F5',
  role: 'forceReload'
}, {
  label: '全屏 (F11)',
  accelerator: 'F11',
  role: 'toggleFullScreen'
}, {
  label: '开发者工具 (F12)',
  accelerator: 'F12',
  role: 'toggleDevTools'
}]
const menuBuilder = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menuBuilder)