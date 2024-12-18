const { exec } = window.require('child_process');

export interface IExecOptions {
  // 子进程的当前工作目录
  cwd?: string;
  // 环境变量键值对
  env?: Record<string, any>;
  // 默认为 'utf8'， 为buffer时，回调函数的 stdout 和 stderr 是 Buffer 类型
  encoding?: string;
  // 执行命令的 shell。在 UNIX 上默认为 '/bin/sh'，在 Windows 上默认为 process.env.ComSpec
  shell?: string;
  // 默认为 0
  timeout?: number;
  // stdout 或 stderr 允许的最大字节数。默认为 200*1024。如果超过限制，则子进程会被终止
  maxBuffer?: number;
  // 默认为 'SIGTERM'
  killSignal?: string | number;
  // 设置进程的用户标识
  uid?: number;
  // 设置进程的用户标识
  gid?: number;
  // 隐藏子进程的控制台窗口，常用于 Windows 系统。默认为 false
  windowsHide?: boolean;
}

function nodeExec(command: string, option?: IExecOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, option, (error: null | Error, stdout: string | Buffer, stderr: string | Buffer) => {
      if (error) {
        // console.log(stderr.toString(), '错误');
        reject(stderr.toString());
      } else {
        console.log(command, option, stderr.toString(), '成功');
        resolve(stdout.toString());
      }
    });
  });
}

export const process = {
  nodeExec,
};
