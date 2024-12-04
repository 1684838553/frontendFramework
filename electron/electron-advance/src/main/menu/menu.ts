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
          console.log(focusWindow, 'focusWindow');
        },
      },
    ],
  },
];
