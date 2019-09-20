export function connentIm(){
    var self = this;
    return new Promise(function(resolve){
        self.nim = SDK.NIM.getInstance({
            appKey: "fd0a8cee8e5f33678eb327a7d592cfe7",
            account: self.account,
            token: self.token,
            onconnect: function () {
                console.log('SDK 连接成功');
                resolve();
            },
            ondisconnect: function (obj) {
                console.log('SDK 连接断开', obj)
            },
            onerror: function (error) {
                console.log('SDK 连接失败', error)
            },
            onmsg:function(msg){
                console.log(msg);
                var {msgList} = self.state;
                msgList.push(msg);

                self.setState({
                    msgList:msgList
                },()=>{
                    self.scrollToBottom();
                });
            },
            onofflinemsgs:function(obj){
                console.log(obj)
            },
            onroamingmsgs:function(obj){
                console.log(obj)
            },
        })
    });
}

