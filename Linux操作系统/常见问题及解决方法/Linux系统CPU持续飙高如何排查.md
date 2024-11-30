## Linux系统CPU持续飙高，如何排查

若一台服务器CPU使用率持续处于一个高峰值，可能导致如：无法ssh链接、操作卡顿、用户访问超时等问题

### 1. 查看CPU使用情况

1. `top`命令常用于分析内存指标使用情况

    ![](https://i-blog.csdnimg.cn/blog_migrate/34973c4126c98318a8adb044744fcc69.png)

2. `htop`命令更直观于`top`

    ![](https://i-blog.csdnimg.cn/blog_migrate/64256384add90f8785a15d55ff4985fc.png)

当CPU达到70%-80%以上时，使用率已过高需要处理

### 2. 找出CPU占用高的内存

![](https://i-blog.csdnimg.cn/blog_migrate/b4eb3f1c2f9633e602b02e401bac1e01.png)

### 3. 进一步分析进程，什么原因导致的CPU使用率高

`perf top -p PID`

perf是一个比较强大的系统性能分析工具，分析进程中有哪些系统调用、哪些模块占用、CPU分配情况

![](https://i-blog.csdnimg.cn/blog_migrate/23071159546fcd081aec464e59f3d285.png)

后续可将内存占用大的提供给开发端进行处理

若进程为多线程时，可进一步分析线程，了解活动状态可使用`top -H`

### 4. 解决办法

1. 情况一

    应用程序访问较少，CPU占用率较高，可能原因是应用程序自身bug（例如：死锁没有及时释放，无法继续执行；存在无限循环，未正常退出）

    其中内存型应用程序（例如java，初始值及限制值较小，会导致产生大量的GC）

2. 情况二
        
    应用程序访问量大，处理每一个请求都会申请CPU资源，导致占用率较高，需要增加服务器硬件配置，或者组建服务器集群

