## 单进程单线程（守护进程）
- 进程是计算机分配任务的基本单位
- 在我们的主进程中，可以开子进程，受主进程控制(工作进程)

> 工作进程是归主进程管理的 child_process

## 进程间的通信
- 进程之间默认情况下是不能通信的
- webworker

## 集群（很多个进程，多进程的实现）
- 多个进程开启同一个服务

## 桌面应用（electron）