# SnowApp

## 相关链接

- [github](https://github.com/Jimmylxue)

- [B 站](https://space.bilibili.com/304985153?spm_id_from=333.1007.0.0)

## 环境

环境需要，jdk11、AndroidSDK、node、npm、yarn

配置文档地址: https://reactnative.cn/docs/0.70/environment-setup

选择自己的电脑，做好前期的环境配置。

## 问题解决集合

### android studio 启动 app 之后，模拟器无法与 react-native 开发服务器连接

执行：`adb reverse tcp:8081 tcp:8081` 即可解决

## 安卓打包指令

`./gradlew assembleRelease`

`./gradlew clean`

`npx react-native config` 检查是否有配置错误

### 下载速度慢

```
find node_modules/ -type f \( -name "*.kts" -o -name "*.gradle" \) -exec sed -i 's|mavenCentral()|maven { url = uri("https://maven.aliyun.com/repository/central") }\n    maven { url = uri("https://maven.aliyun.com/repository/public") }\n    maven { url = uri("https://maven.aliyun.com/repository/google") }\n    maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }\n    maven { url = uri("https://maven.aliyun.com/repository/jcenter") }\n    mavenCentral()|g' {} +
```

![参考链接](https://juejin.cn/post/7428128754571296807)
