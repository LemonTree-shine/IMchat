var fs = require("fs");
var proxy = require("http-proxy");

var packageInfo = fs.readFileSync("./package.json",{
    encoding:"utf-8"
});

function configProxy(app){
    var getTarget = JSON.parse(packageInfo).target;

    if(!getTarget){
        return;
    }
    
    var Proxy = proxy.createProxyServer({
        changeOrigin: true
    });

    app.use("/api/*",function(req,res){
        //console.log(req);
        Proxy.web(req,res,{
            //转发请求
            target:getTarget+req.originalUrl
        })
    });

    Proxy.on('proxyReq', function (proxyReq, req, res, options) {
        //同步cookie
        proxyReq.setHeader("cookie", req.headers.cookie || '');
    });
    Proxy.on('error',(e)=>{
        console.log(e);
    })
}

module.exports = {
    configProxy:configProxy
}