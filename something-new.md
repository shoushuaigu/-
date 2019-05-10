#PWA相关
(相关介绍及demo)[https://blog.csdn.net/qq_19238139/article/details/77531191]
>渐进式的网页应用程序
PWA 可以添加在用户的主屏幕上(Safari 支持度的问题，ios不行)
技术关键：
                Service Worker（ ps：就叫做服务工厂吧，文章最后一条 URL 是 SW 的全面进阶，可以研究研究哦 ）
               
                Manifest （应用清单）

                Push Notification（推送通知）PWA的消息推送走的是 GCM（ FCM ）通道。而国内 Google 是无法访问的。
必须是https  
demo用Node 和 Ngrok搭建服务。使用 ngrok 这个工具，进行内网穿透，可映射到外网生产http和https链接。(ngrok使用)[https://blog.csdn.net/tomcat_2014/article/details/68944066]
