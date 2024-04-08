# typescript実行方法
1. コマンドラインから実行する場合
typescriptを実行するには`node main.ts`では不可。
[参考](https://qiita.com/yurihyp/questions/4485e09b8185c10c2733)

初回実行時はts-nodeのインストールを求められる
```
npx ts-node main.ts
```

2. WebStormを使う場合
一度typescriptをjavascriptにコンバートする必要がある
[参考](https://pleiades.io/help/webstorm/compiling-typescript-to-javascript.html#ts_compiler_compile_code)

メニューのsettings > Languages & Frameworks > TypeScriptから`Recompile on changes`にチェックを入れると
自動でjsが生成されるようになる
