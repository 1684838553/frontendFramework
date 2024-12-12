## electron-advance

### 1. 使用CMD编写命令常见问题

1. 使用同步方式执行CMD命令

使用`execSync`方法可以同步地执行`CMD`命令。但这种同步方式会导致主进程阻塞，使应用程序的响应变慢，甚至崩溃。因此，我们应该尽可能地使用异步方式执行`CMD`命令。

```js
const { execSync } = require('child_process');
const result = execSync('ipconfig');
console.log(result.toString());
```

2. 忽略命令执行的错误

在执行CMD命令时，可能会出现各种错误，例如命令不存在、参数错误、权限不足等。如果忽略这些错误，可能会导致应用程序崩溃或产生不可预料的结果。

```js
const { exec } = require('child_process');
// 使用了不存在的命令notexistcommand。如果我们忽略了error参数，应用程序将继续执行，并输出undefined
exec('notexistcommand', (error, stdout, stderr) => {
  console.log(stdout);
});

// 检查了error参数，并输出了相应的错误信息
exec('notexistcommand', (error, stdout, stderr) => {
  if(error) {
    console.error(`执行命令出错：${error}`);
  } else {
    console.log(stdout);
  }
});

```

3. 不考虑跨平台兼容性

- **路径分隔符：** 在Windows中，路径分隔符为反斜杠（\）；在macOS和Linux中，路径分隔符为斜杠（/）。为了保证跨平台兼容性，我们应该使用Node.js的path模块来处理路径，例如path.join方法和path.sep属性。

- **命令参数：** 不同操作系统可能支持不同的命令参数。为了保证跨平台兼容性，我们应该使用具有通用性的命令参数，或者根据操作系统类型选择不同的命令参数。

- **命令输出格式：** 不同操作系统的命令输出格式可能不同。为了保证跨平台兼容性，我们应该使用具有通用性的命令输出格式，或者根据操作系统类型选择不同的解析方式。
