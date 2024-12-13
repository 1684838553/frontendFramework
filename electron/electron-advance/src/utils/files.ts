const fs = window.require('fs');
const path = window.require('path');

export interface IDirectory {
  path: string;
  isDirectory: boolean;
}

function readDirectory(projectPath: string): IDirectory[] {
  const dir: IDirectory[] = [];

  try {
    const files = fs.readdirSync(projectPath);
    files.forEach((file: string) => {
      const tempPath = path.join(projectPath, file);
      const stats = fs.statSync(tempPath);

      const fileObj: IDirectory = {
        path: tempPath,
        isDirectory: false,
      };

      fileObj.isDirectory = stats.isDirectory();
      dir.push(fileObj);
    });
    return dir;
  } catch (err) {
    return [];
  }
}

function readFileContent(filePath: string) {
  try {
    return fs.readFileSync(filePath, { encoding: 'utf-8'});
  } catch (err) {
    return '';
  }
}

export const file = {
  readDirectory,
  readFileContent
};
