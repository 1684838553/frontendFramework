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
          click: (_, focusWindow) => {
            focusWindow?.reload();
          },
        },
        {
          label: '重启',
          accelerator: 'Ctrl+Alt+R',
          click: () => {
            app.relaunch();
            app.exit();
          }
        },
        {
          label: '关闭窗口',
          accelerator: 'Alt+F4',
          click: (_, focusWindow) => {
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
