var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var express = require("express");
var path = require("path");
var fs = require("fs");
var hbs = require('hbs');

var {configProxy} = require("./proxyConfig");

var serverInfo = require("./serverConfig");

var app = express();

configProxy(app);

//配置handlebar模板
app.set('view engine','html');
app.engine('html',hbs.__express);
app.set('views',path.join(__dirname,'dist'));

//设置静态文件路径
app.use(express.static(path.join(__dirname,'dist')));

//所有路由请求都经过这里
app.get('*', function (req, res){
    //response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    res.render("index");
});

//默认配置webpack开发环境
webpackConfig.mode = "development";
let compiler = webpack(webpackConfig);

//监听事件
app.listen(serverInfo.environment.port,function(){
    console.log(`server run at ${serverInfo.environment.port}`);
    console.log(serverInfo);
    // compiler.watch({},function(err, stats){
    //     console.log(stats.toString({
    //         colors:true
    //     }));
    // });
});


