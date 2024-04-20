# SMS 验证

## 问题解决集合

### android studio 启动 app 之后，模拟器无法与 react-native 开发服务器连接

执行：`adb reverse tcp:8081 tcp:8081` 即可解决

## 安卓打包指令

`./gradlew assembleRelease`

`./gradlew clean`

`npx react-native config` 检查是否有配置错误
