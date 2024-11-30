# 趣说HTTP协议

### 1、浏览器背后的故事

1. HTTP: 超文本传输协议，是一种通信协议，允许将超文本标记语言（HTML）文档从web服务器传送到客户端的浏览器
2. HTTP是一个属于应用层的面向对象的协议。

3. web是一种基于超文本和JHTTP的、全球性的、动态交互的、跨平台的分布式图像信息系统；建立再互联网上的一种网络服务，为浏览者在互联网上查找和浏览信息提供了图形化的、易于访问的直观界面，其中的文档及超级链接将互联网上的信息节点组织成一个互为关联的网状结构

访问网页
![image](https://github.com/1684838553/http-project/assets/41181666/af38811d-0922-48cc-a3f1-a9d07d2f6e8c)

### 2、 通过TCP/IP看HTTP

#### 1、 TCP/IP 协议族

1. TCP/IP协议其实是一系列与互联网相关的协议集合起来的总称
2. 分层管理是TCP/IP协议的重要特征
3. TCP/IP协议族分为四层：应用层、传输层、网络层、数据链路层
   ![image](https://github.com/1684838553/http-project/assets/41181666/4d6919fe-a1a2-46c0-bc59-df05c9eb892b)

    - 应用层： 一般是我们编写的应用程序，决定了向用户提供的应用服务。可以通过系统调用与传输层进行通信。HTTP
    - 传输层： 通过系统调用向应用层提供处于网络连接中的两台计算机之间的数据传输功能。在该层，有两个性质不同的协议：TCP(面向连接) 和 UDP(无连接)
    - 网络层： 处理在网络上流动的数据包，数据包是网络传输的最小数据单位。该层规定了通过怎样的路径到达对方计算机，并把数据包传输给对方
    - 链路层： 用来处理网络的硬件部分，包括控制操作系统、硬件设备驱动、网络适配器及光纤物理可见部分。
  
   ![image](https://github.com/1684838553/http-project/assets/41181666/72cc5bab-7b9d-47d5-838f-620a205e649b)

#### 2、传输层：TCP的三次握手

目的： 确认客户端和服务端收发信息的能力正常

第一次握手：客户端发送带有 SYN 标志的连接请求报文段，然后进入 SYN_SEND（发送完成） 状态，等待服务端的确认。 `服务端确认客户端的发送能力正常，服务端的接收能力正常`

第二次握手：服务端接口到客户段发送的 SYN 报文后，需要发送一个 ACK 信息对这个报文进行确认。同时，还要发送自己的 SYN 请求信息。服务端会将上述的信息放到一个报文段（SYN + ACK报文段）中，一并发送给客户端，服务器进入 SYN_RECV 状态 `客户端知道自己和服务端的收发都正常`

第三次握手：客户端收到服务端的SYN + ACK报文段，向服务端发送确认报文，这个报文发送完毕后，两者都进入 Established 状态，完成三次握手  `服务端知道客户端的接收能力正常`

![image](https://github.com/1684838553/http-project/assets/41181666/74248da7-db81-43c9-aa35-5ed5816b0628)

- CLOSED：这是连接的初始状态，当一个设备（称为客户端）尝试与另一个设备（称为服务器）建立连接时，连接处于这个状态。

- SYN-SENT：在这个状态下，客户端已经发送了一个连接请求给服务器，但还没有收到服务器的确认。

- SYN-RECEIVED：在这个状态下，服务器已经收到了客户端的连接请求，但还没有发送确认。

- ESTABLISHED：在这个状态下，客户端和服务器都已经确认了对方的连接请求，数据可以开始传输。

### 3、 DNS域名解析

DNS: 提供域名到IP地址之间的解析服务  (协议，域名，端口)

![image](https://github.com/1684838553/http-project/assets/41181666/690085e2-0ebd-4695-a369-69d51e202b03)

DNS（Domain Name System，域名系统）是互联网的电话簿，它将人们容易记住的网站名称（如`http://www.google.com`）转换成计算机可以识别的IP地址（如`192.168.1.1`）。DNS域名解析主要包括以下几个步骤：

 1. 客户端（如浏览器）接收到用户输入的网址，并将其发送给本地DNS服务器。
    
 2. 本地DNS服务器首先检查自己的缓存，看看是否已经解析过这个域名。如果已经解析过，就直接返回结果。
    
 3. 如果本地DNS服务器没有缓存这个域名，就向根DNS服务器发送查询请求。
    
 4. 根DNS服务器返回一个负责管理该域名的顶级DNS服务器的地址。
    
 5. 本地DNS服务器再向这个顶级DNS服务器发送查询请求。
    
 6. 顶级DNS服务器返回一个负责管理该域名的权威DNS服务器的地址。
    
 7. 本地DNS服务器最终向权威DNS服务器发送查询请求，并得到网站的IP地址。
    
 8. 本地DNS服务器将这个IP地址返回给客户端，客户端就可以通过这个IP地址访问网站。
    
 9. 同时，本地DNS服务器将这个查询结果缓存下来，以便下次查询时可以直接使用。
    
总的来说，DNS域名解析就是通过一系列的查询和返回，将域名转换为IP地址，以便客户端可以访问网站。

![image](https://github.com/1684838553/http-project/assets/41181666/6b18b13c-4bf6-4a73-802b-eedcbc80889b)

![image](https://github.com/1684838553/http-project/assets/41181666/2a36bd48-7b23-4625-bd31-0bc8bd8db675)

### 4、HTTP 基本功能

#### 1、 协议特点

1. 支持客户/服务器模式
   
   工作方式是有客户端向服务端发送请求，服务端相应请求，并进行相应服务

   ![image](https://github.com/1684838553/http-project/assets/41181666/d0531dd7-9152-4087-a8ac-03598a0b8c9f)

2. 简单快速

   - 请求时，只需传送`请求方法和路径`
   - 请求方法有：`get, post, put, delete, head`
     
3. 通信快
   http协议简单，所以http服务器的程序规模小，`通信快`

4. 灵活
   HTTP可以传输`任意类型的数据`

5. 无连接

   - 含义是限制每次连接`只处理一个请求`
   - 服务器处理完客户的请求，并收到客户端的应答后，即断开连接
  
6. 无状态

   - HTTP协议是无状态协议
   - `无状态`是指`协议对事务处理没有记忆能力`。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这导致每次连接传送的数据量增大
   

#### 2、URI 和 URL

![image](https://github.com/1684838553/http-project/assets/41181666/068d0829-b93f-4667-a8aa-bff562269529)

1. URI: 统一资源标识符

2. URL: 统一资源定位符 ；格式（三部分组成）： 方案://服务器位置/路径

   方案：说明访问资源所使用的协议类型，通常是 http 协议（http://）

   服务器的位置 (www.baidu.com)

   资源路径，指定 web 服务器上的某个资源 （/demo.html）

3. URN: 统一资源名，作为特定内容的唯一名称使用，与目前的资源所在地无关

#### 3、报文结构

![image](https://github.com/1684838553/http-project/assets/41181666/a55498f0-c96e-4f24-b262-9e20258821cb)

![image](https://github.com/1684838553/http-project/assets/41181666/c7bb35c5-4e31-4238-a549-7fed856b0716)

1. 通用报文头

   ![image](https://github.com/1684838553/http-project/assets/41181666/a2640f3f-a84c-43ac-b70a-79cb02ba4eb6)

3. 请求报文头

   ![image](https://github.com/1684838553/http-project/assets/41181666/9884430f-b0c2-434e-8e32-c0b52558416e)

5. 响应报文头

    ![image](https://github.com/1684838553/http-project/assets/41181666/1d7dda72-8703-4146-8159-041ef928de65)

7. 实体报文头

   ![image](https://github.com/1684838553/http-project/assets/41181666/71c5f23e-560c-4393-a409-e4c3fe75fd02)

#### 4、请求方法

1. get：请求访问已被URI识别的资源

   - 指定资源经服务器端解析后返回相应内容
   - 数据放在URL上，能直接看到数据内容，数据大小有限制
     
2. post: 一般用来传输实体的主体

   - 主要目的不是获取相应主体的内容

3. put: 从客户端向服务端传送的数据取代指定的文档内容

   - post和put最大的不同是：put是幂等的，post是不幂等的 `幂等：不管进行多少次重复操作，都是实现相同的结果`
  
4. head: 类似get, 只不过返回的响应中没有具体的内容，用于获取报头

5. delete: 请求服务器删除指定资源
   
6. options: 用来查询针对请求URI指定的资源支持方法

7. trace: 回显服务收到的请求，主要用于测试或诊断

8. connect: 开启一个客户端与请求资源之间的双向沟通的通道，它可以用来创建隧道

#### 5、状态码

![image](https://github.com/1684838553/http-project/assets/41181666/81238440-1296-4be8-8e78-979f850543bd)

1. 2xx
   
   - `200` ok 请求已成功，请求所希望的相应头或数据体将随此相应返回
   - `202` accepted 已接受请求，但未处理完成
   - `206` partial content 部分内容，服务器成功处理了部分get请求
     
2. 3xx

   - `301` moved permanently 永久移动，请求的资源已被永久的移动到新的URI,返回信息会包括新的URI,浏览器会自动定向到新的URI
   - `302` found 临时移动，类似301.但资源只是临时被移动，客户端应继续使用原有资源
   - `304` not modified 与本地缓存一致，没有修改,可使用本地缓存
  
3. 4xx

   - `400` bad request 客户端请求的语法错误，服务端无法理解
   - `401` unauthorized 请求要求用户的身份认证
   - `403` forbidden 服务器理解客户端的请求，但拒绝执行此请求
   - `404` not found 服务器无法根据客户端的请求找资源
     
4. 5xx

   - `500` internal server error 服务器内部错误，无法完成请求
   - `502` bad gateway 充当网关或代理的服务器，从远端服务器接收到一个无效的请求
  
#### 6、Cookie和Session

##### 1、Cookie

![image](https://github.com/1684838553/http-project/assets/41181666/3de42bf1-a700-47f7-90bb-2f7c808594f9)

1. Cookie 是一小段的文本信息。客户端请求服务器，如果服务器需要记录该用户状态，就向客户端浏览器办法一个Cookie

2. 客户端浏览器会将Cookie保存起来。当浏览器在请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态

![image](https://github.com/1684838553/http-project/assets/41181666/be275ef2-0b6a-4ce9-a26b-969d6b348e9d)

##### 2、Session

1. Session是另一种记录客户状态的机制，保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上
   
2. 客户端浏览器再次访问时，只需要从该session中查找该客户的状态就可以了

![image](https://github.com/1684838553/http-project/assets/41181666/bd9654ae-c027-4c84-8f8b-651c542447ee)

**保存Session ID的方式**
1. Cookie

2. URL重写
   - 直接赋值在url路径的后面 `http://.../xxx;Sessionid=session`
   - 作为查询字符串 `http://.../xxx?Sessionid=session`
  
3. 隐藏表单

**Session的有效期**

1. Session超时失效
2. 程序调用HttpSession.invalidate()
3. 服务器进程被停止

##### 3、Cookie和Session区别

1. 存放位置不同： Cookie存在客户端，Session保存在服务端
   
2. 安全性（隐私策略）不同: Session比Cookie更安全，因为它不会在用户的计算机上保存任何数据
   - Cookie存在浏览器中，对客户可见，客户端的程序可能会覆盖或修改Cookie内容
   - Session存在服务器上，对客户透明，不存在泄露风险

3. 有效期不同
   Session的有效期通常比Cookie的有效期短，因为Session在服务器上存储，而Cookie在用户的计算机上存储。

4. 数据大小: `Session`可以存储更大的数据，因为它不受`Cookie`的大小限制

5. 对服务器的压力不同：Session存在服务端，对服务器的压力更大

### 5、HTTP 功能

#### 1、编码和解码

[encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

1. `encodeURI()`: 通过将特定字符的每个实例替换为转义序列来对统一资源标识符 (URI) 进行编码
   
2. `decodeURI()`: 能解码由encodeURI 创建或其他流程得到的统一资源标识符（URI）

3. `encodeURIComponent()`: 通过将特定字符的每个实例替换成代表字符的 UTF-8 编码的转义序列来编码 URI。与 encodeURI() 相比，此函数会编码更多的字符，包括 URI 语法的一部分。

4. `decodeURIComponent()`: 用于解码由 encodeURIComponent 方法或者其他类似方法编码的部分统一资源标识符（URI）。

#### 2、基本认证

身份认证信息：
1. 密码
2. 动态令牌
3. 数字证书
4. 生物认证
5. IC卡等

常见的认证方式：

1. basic（基本）认证

   什么是基本认证？

   ![image](https://github.com/1684838553/http-project/assets/41181666/2ee1cdbe-b59e-4517-ab6d-c5439faf269b)

   用户名，密码是明文，有安全隐患

2. Digest(数字)认证

   同样使用质询、响应的方式，但不会像 basic 认证那样直接发送明文密码。

   ![image](https://github.com/1684838553/http-project/assets/41181666/898a9e8f-a275-40ca-9624-7bc36ba4e4b0)

3. ssl客户端认证

   借由https的客户端证书完成认证的方式。凭借客户端认证证书，服务器可确认访问是否来自已登录的客户端
  
4. 基于表单的认证

   - 并不是再http协议中定义。
   - 使用由web程序各自实现基于表单的认证方式
   - 通过Cookie和Session的方式来保持用户的状态

#### 4、长连接和短连接

- http协议是基于请求/响应模式的，因此只要服务端给了响应，本次http就结束
- http的长连接和短链接本质是TCP长连接和短链接
- HTTP/1.0默认短连接，即浏览器和服务器每进行一次http操作，就建立一次连接，结束就中断
- HTTP/1.1默认长连接，用以保持连接特性

![image](https://github.com/1684838553/http-project/assets/41181666/8c370389-ae62-43fb-9fb9-e71b5740e35a)


#### 5、代理

![image](https://github.com/1684838553/http-project/assets/41181666/50d11a7b-cdf1-4ea5-a65d-7bfa1e10c257)

- 对客户端来说，代理服务器是服务器
- 对服务端来说，代理服务器是客户端

**作用**

1. 隐蔽性：HTTP代理可以隐藏客户端的真实IP地址，防止恶意攻击。

2. 负载均衡：HTTP代理可以帮助服务器进行负载均衡，分担服务器的压力。

3. 缓存：HTTP代理可以对资源进行缓存，减少网络的带宽消耗。

4. 过滤：HTTP代理可以对访问的网站进行过滤，防止访问不合适的内容。

5. 安全：HTTP代理可以对数据进行加密，保护数据的安全。


#### 6、网关

可以作为某种翻译器使用，是资源和应用程序之间的粘合剂，扮演的角色是"协议转换器"的角色。

![image](https://github.com/1684838553/http-project/assets/41181666/caf57df7-9b3f-4772-99ef-086fc2bd0bfc)

代理： 相同协议

网关：不同协议。网关再一侧使用http协议，再另一侧使用另一种协议

      `<客户端协议>/<服务器协议>`

      类型：
      - 服务器网关（HTTP/*）：通过HTTP协议与客户端对话，通过其它协议与服务器对话
      - 客户端网关（*/HTTP）：通过其它协议与客户端对话，通过HTTP协议与服务器对话，


**常见网关类型：**
- （HTTP/*）服务器端web网关
- （HTTP/HTTPS）服务器端安全网关
- （HTTPS/HTTP）客户端安全加速器网关
- 资源网关

#### 7、缓存

##### 1、 为什么要使用http缓存

1. 减少带宽消耗：通过缓存，客户端可以直接从本地加载资源，而不需要再次向服务器请求，这样可以大大减少网络的带宽消耗。

2. 提高响应速度：如果资源已经被缓存，那么客户端可以直接从本地加载，这样可以大大提高响应速度。

3. 减少服务器压力：通过缓存，服务器不需要为每一个请求都生成新的资源，这样可以大大减少服务器的压力。

4. 提高用户体验：如果资源已经被缓存，那么用户可以更快地加载网页，这样可以提高用户的体验。

##### 2、 缓存内容是什么

缓存内容主要包括以下几种：

- 网页内容：包括HTML、CSS、JavaScript等。

- 图片和视频：包括静态图片、动态GIF、视频文件等。

- 字体：包括系统字体、web字体等。

- 样式表：包括CSS文件等。

- 脚本：包括JavaScript文件等。

- 音频和视频：包括音频文件、视频文件等。

- 网络请求：包括API请求、Ajax请求等。

- 网站图标：包括favicon.ico等。

总的来说，缓存内容主要是网页中的静态资源和一些网络请求。


##### 3、缓存头部字段

1. Cache-Control

   请求/响应头，缓存控制字段
   
   - `no-store`: 所有内容都不缓存
   - `no-cache`: 缓存，但是浏览器使用缓存前，都会请求服务器判断缓存资源是否是最新的
   - `max-age=x`: 单位秒，请求缓存后的x秒不在发起请求
   - `s-maxage=x`: 单位秒，代理服务器请求资源站缓存后的x秒不在发起请求，只对CDN缓存有效
   - `public`: 客户端和代理服务器CDN都可以缓存
   - `private`: 只有客户端可以缓存

2. Expires： 响应头，代表资源过期时间，由服务器返回提供，是http1.0的属性，在与max-age共存的情况下，优先级要低。

3. Last-Modified： 响应头，资源最新修改时间，由服务器告诉浏览器。

4. if-Modified-Since：请求头，资源最新修改时间，由浏览器告诉服务器，和Last-Modified是一对，它俩会进行对比

5. Etag: 响应头，资源标识，由服务器告诉浏览器
   
6. if-None-Match: 请求头，缓存资源标识，由浏览器告诉服务器（其实就是上次服务器给的Etag），和Etag是一对，它俩会进行对比

##### 4、缓存工作方式

1. 场景一：让服务器与浏览器约定一个文件过期时间 `Expires`

   ![image](https://github.com/1684838553/http-project/assets/41181666/95a691e9-3233-4d86-8f78-7bde2a3ff318)

2. 场景二：让服务器与浏览器约定一个文件过期时间的基础上，在加上一个文件最新修改时间的对比`Last-Modified`与`if-Modified-Since`

   ![image](https://github.com/1684838553/http-project/assets/41181666/0bb41336-7429-4589-99f6-d6c52ca88d8a)
   
   - `Expires`没过期，浏览器使用本地缓存
   - `Expires`过期，请求时带上`if-Modified-Since`，与服务器的`Last-Modified`对比，如果不相等，返回最新的信息，如果相等，返回304，告诉浏览器使用本地缓存

3. 场景三：让服务器与浏览器约定一个文件过期时间`Expires + Last-Modified`的基础上，增加一个文件内容唯一对比标识`Etag` 和 `if-None-Match`。 `Expires`不稳定，再加一个`max-age`来加以代替（ `Expires`优先级比`max-age`低）

   ![image](https://github.com/1684838553/http-project/assets/41181666/094fc86b-1834-447e-a79b-a0ab9b69a23c)

##### 5、缓存改进方案

1. md5/hash缓存
   
   通过不缓存html，为静态文件添加MD5或者hash标识，解决浏览器无法跳过缓存过期时间主动感知文件变化的问题

2. CDN缓存
   
   ![image](https://github.com/1684838553/http-project/assets/41181666/3c11f1db-a0b7-46af-b622-65df62a05798)

   ![image](https://github.com/1684838553/http-project/assets/41181666/9e3a4558-3c26-4664-ab5e-304a1ae3fbb5)
   
   ![image](https://github.com/1684838553/http-project/assets/41181666/1d5740e7-e4f0-450e-9ba4-c90527bc000f)

##### 6、浏览器操作对HTTP缓存的影响

![image](https://github.com/1684838553/http-project/assets/41181666/cbceda87-7ffe-4a5c-ac4f-6c57a86f3a83)

#### 8、协商缓存

#### 9、断点续传和多线程下载

HTTP是通过在Header里两个参数实现的，客户端发请求时对应的是`Range`，服务器端响应时对应的是`Content-Range`

- `Range`: 用于请求头，指定第一个字节的位置和最后一个字节的位置，一般格式 `Range:(unit=first byte pos) - [last byte pos]`  

 ![image](https://github.com/1684838553/http-project/assets/41181666/8d2be9cc-9cbe-4f65-930d-a1ca5aa39219)

![image](https://github.com/1684838553/http-project/assets/41181666/81c4f023-5291-4224-acc8-ecb0b6ef3080)


### 5、HTTPS 概述

`HTTPS = HTTP + TLS`

TLS: 传输层加密协议

![image](https://github.com/1684838553/http-project/assets/41181666/427d85f9-cf91-49de-a085-f77dcddaae3f)

**功能：**

- 内容加密：非对称密钥交换、对称内容加密（分组加密）
- 身份认证：数字证书
- 数据完整性


**使用成本：**

- 证书的费用及更新维护
- HTTPS降低用户访问速度
- 消耗CPU资源，需要增加大量机器


**对性能的影响：**

- 协议交互所增加的网络 RTT（全称Round Trip Time，中文名“往返时延”，是从发送数据到收到数据的全过程时间）

   ![image](https://github.com/1684838553/http-project/assets/41181666/4d295749-d809-4279-ab46-bffd1229edbd)
   
   ![image](https://github.com/1684838553/http-project/assets/41181666/229cdde6-4df5-45f1-b15f-d123c6fd916d)

- 计算耗时（浏览器和服务端计算耗时，加解密耗时等）


**HTTPS常见问题**

- http加密，是不是需要我在电脑上安装证书/保存密码？
- https是不是在http后面加个s，很难吗？
- https解决了所有的劫持问题吗？没有，没有绝对的安全，但是，可以尽量降低风险。

### 6、HTTP瓶颈及升级

**瓶颈：**

- 一条连接上只可发送`一个`请求（非持久化）
- 请求只能`从客户端开始`。客户端不可以接受除相应外的指令
- 请求/响应头部`不经压缩`就发送
- 每次互相发送`相同`的头部造成的浪费较多
- 非强制压缩发送


#### 1、双工通信WebScocket

![image](https://github.com/1684838553/http-project/assets/41181666/3447398b-c2da-479a-8927-b435486bcc7e)

![image](https://github.com/1684838553/http-project/assets/41181666/b8c72a5e-786f-4c50-94bf-9b9a0a75cd30)


- ajax轮询：隔一段时间向服务器发送请求获取新响应
- long poll: 客户端发起连接，一直等到有响应在关闭连接

**WebScocket**
![image](https://github.com/1684838553/http-project/assets/41181666/8fd04b6c-d5d6-4966-b357-abbe154b3143)

有很明显的性能优势:

- 真正的`全双工方式`
- 减少`通信量`

#### 2、HTTP2

![image](https://github.com/1684838553/http-project/assets/41181666/460f04e9-1f15-473e-ba64-e089ca24136d)

**特点：**

- 二进制分帧：将HTTP消息分解为一系列独立的帧，然后再通过二进制格式发送。优点是可以更高效地发送和接收数据，因为每个帧都包含了足够的信息，接收端可以立即知道如何解码和处理它

   ![image](https://github.com/1684838553/http-project/assets/41181666/8c740404-06dd-4997-bdff-b58c0cd0efcb)

- 多路复用

  ![image](https://github.com/1684838553/http-project/assets/41181666/693f28b1-1446-41ca-9e79-078517927a98)

- 并行双向字节流的请求和响应

   ![image](https://github.com/1684838553/http-project/assets/41181666/3d165a57-e045-4971-bfac-ac536e2c5d2d)

  1. 并行交错的发送`请求`，`请求`之间互不影响
  2. 并行交错的发送`响应`，`响应`之间互不影响
  3. 只使用`一个连接`即可并行发送多个请求和响应
  4. 消除不必要的`延迟`，减少页面加载的时间

- 请求有限级
   1. 高优先级的流都应该优先发送
   2. 优先级不是绝对的
   3. 不同优先级混合也是必须的
  
**单链接多资源的优势：**

- 可以`减少服务链接压力`，内存占用减少，链接吞吐量变大

- 由于TCP连接减少而使`网络拥塞状况`得以改观

- 慢启动时间减少，`拥塞`和`丢包`恢复速度更快


### 7、web安全攻击

web应用安全威胁分为六大类：

1. `Authentication(验证)`：用来确认某用户、服务或应用身份的攻击手段
2. `Authorization(授权)`：用来决定是否某用户、服务或应用具有执行请求动作必要权限的攻击手段
3. `clent-side-attacks(客户端攻击)`：用来扰乱或探测web站点用户的攻击手段
4. `command execution(命令执行)`：在web站点上执行远程命令的攻击手段
5. `information disclosure(信息泄露)`：用来获取web站点具体系统信息的攻击手段
6. `logical attacks(逻辑性攻击)`:用来扰乱或探测web应用逻辑流程的攻击手段

#### 1、会话管理机制

![image](https://github.com/1684838553/http-project/assets/41181666/9d7289fa-27b3-47f6-8b5e-6ee2a025c76a)

![image](https://github.com/1684838553/http-project/assets/41181666/d1e0c795-ed15-42af-8b5d-205ad06eeae8)

![image](https://github.com/1684838553/http-project/assets/41181666/780dbecb-af19-409c-beb3-d6c9ac155d56)

#### 2、SQL注入

几乎每一个web应用都需要使用`数据库`来保存操作所需的各种信息，所以，web程序经常会建立用户提交数据的`SQL语句`，如果建立这种语句的方法`不安全`，就很容易收到SQL注入的攻击。

攻击者通过`SQL注入`读取甚至修改数据库中保存的所有数据，用户可以提交一段`数据库查询代码`，根据程序返回的结果，获取某些他想得到的数据。这就是`SQL注入`

![image](https://github.com/1684838553/http-project/assets/41181666/8663d047-42b0-47ff-988e-053a6e365c33)


**危害：**

1. `探知数据库`的具体解构，为进一步攻击做准备
2. `泄露数据`，尤其是机密信息、账户信息等
3. `取得更高权限`，来修改表数据甚至内部结构

**防御：**

参数化查询：对SQL注入根本性的防御策略，也叫预处理语句，在建立一个包含用户输入的SQL语句时分两步
   1. 指定查询结构，用户输入预留占位符
   2. 指定占位符的内容

#### 3、跨站脚本攻击 xss

它允许恶意web用户将代码植入到提供给其他用户使用的页面中，其他用户在观看页面时，恶意脚本就会执行。

通常通过注入HTML或js等脚本发动攻击。攻击成功后，攻击者可以得到私密网页内容和cookie

**危害：**

1. `盗取各类用户账号`，如机器登录账号，用户网银账号，各类管理员账号
2. `控制数据`，包括读取、篡改、添加、删除企业敏感数据的能力

- 盗窃企业重要的具有`商业价值`的资料
- 非法转账
- 强制发送网站挂马
- 控制受害者机器向其他受害者发起攻击

**sxx分类：**

1. 反射式： 非永久性xss
   ![image](https://github.com/1684838553/http-project/assets/41181666/691afb9e-b885-4ecd-ae45-546c63a12ceb)

2. 存储式：永久性xss

   ![image](https://github.com/1684838553/http-project/assets/41181666/f02054cf-1041-4269-bbd5-45434c441bae)

3. 基于dom的xss
   ![image](https://github.com/1684838553/http-project/assets/41181666/7747e704-e391-4573-868e-e72cd64524e6)

#### 4、跨站请求伪造 CSRF

- CSRF的破坏力依赖于受害者的权限
- 如果受害者只是一个普通用户，则一个成功的CSRF攻击会危害用户的数据以及一些功能；如果具有管理员权限，可能会危害整个网站。

