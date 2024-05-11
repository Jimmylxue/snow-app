# SnowApp

用于记录开发 app 时的所有知识点与问题解决方案

## 相关链接

- [Jimmy 知识星球](http://www.jimmyxuexue.top)

- [B 站](https://space.bilibili.com/304985153?spm_id_from=333.1007.0.0)

## 问题解决集合

### android studio 启动 app 之后，模拟器无法与 react-native 开发服务器连接

执行：`adb reverse tcp:8081 tcp:8081` 即可解决

## 安卓打包指令

`./gradlew assembleRelease`

`./gradlew clean`

`npx react-native config` 检查是否有配置错误

## IOS 相关

### 每次 pod install

In iOS Folder go to Pods/Pods.xcodeproj/xcuserdata/project.pbxproj

Change all the 'IPHONEOS_DEPLOYMENT_TARGET = 11.0' to 'IPHONEOS_DEPLOYMENT_TARGET = 12.4'. save and run.
