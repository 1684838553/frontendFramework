import { App, BrowserWindow, MenuItem, MenuItemConstructorOptions } from 'electron';

export default (app: App, mainWindow: BrowserWindow): ((MenuItemConstructorOptions) | (MenuItem))[] => [
  {
    label: '窗口',
    submenu: [
      {
        label: '重载',
        accelerator: 'Ctrl+R',
        click: (_, focusWindow): void => {
          if (!focusWindow) {
            return;
          }
          focusWindow.reload();
        },
      },
      {
        label: '重启',
        click: (): void => {
          app.relaunch();
          app.exit();
        },
      },
      {
        label: '关闭窗口',
        accelerator: 'Alt+F4',
        click: (_, focusWindow): void => {
          if (!focusWindow) {
            return;
          }
          focusWindow.destroy();
        },
      },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '切换开发者工具',
        click: (): void => {
          mainWindow.webContents.openDevTools();
        },
      },
    ],
  },
];
