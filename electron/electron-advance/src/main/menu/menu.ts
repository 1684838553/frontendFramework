import { App, BrowserWindow, MenuItem, MenuItemConstructorOptions } from 'electron';

export const getMenus = (
  app: App,
  mainWindow: BrowserWindow,
): ((MenuItemConstructorOptions) | (MenuItem))[] => [
  {
    label: '窗口',
    submenu: [
      {
        label: '重载',
        accelerator: 'Ctrl+R',
        click: (item, focusWindow) => {
            focusWindow?.reload();
        },
      },
      {
        label: '关闭窗口',
        accelerator: 'Alt+F4',
        click: (item, focusWindow) => {
          focusWindow?.destroy();
        },
      },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '切换开发者工具',
        accelerator: 'Ctrl+Shift+I',
        click: () => {
          mainWindow.webContents.openDevTools();
        },
      }
    ],
  }
];
