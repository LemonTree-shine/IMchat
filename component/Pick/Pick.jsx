import React from 'react';
import ReactDOM from 'react-dom';
import "./Pick.less";
import "./Pick.css"

export default class Pick extends React.Component{
    render(){
        var transClassName="content-box c-content-trans";
        switch(this.mode){
            case "up":
                break;
            case "left":
                transClassName = "content-box c-content-trans-left";
                break;
            case "right":
                transClassName = "content-box c-content-trans-right"
                break;
            default:
                break;
        }
        return <div className={this.mask?"c-pick-mask":"c-pick-mask mask-none"} onClick={(e)=>{this.handleClose(e)}} ref={(el)=>{this.dialogElem = el}}>
            <div className={transClassName}>
                <div className="close-btn" onClick={this.close}>
                    <img src={this.closeIconUrl?this.closeIconUrl:"https://medicalpop.oss-cn-hangzhou.aliyuncs.com/ssapp/images/icon/close-pick.png"} alt=""/>
                </div>
                <div className="c-pick-transbox">
                    <div className="title-box">
                        <div className="title">{this.title}</div>
                        {this.subTitle?<div className="sub-title">{this.subTitle}</div>:null}
                    </div>
                    <div className="content">{this.content}</div>
                </div>
            </div>
        </div>
    }

    constructor(){
        super()
    }

    componentDidMount(){

    }

    //定义弹窗内容
    content = "";
    
    //标题
    title = "提示";

    //副标题
    subTitle = "";

    //是否需要遮罩层
    mask = true;
    
    //关闭icon图片
    closeIconUrl = "";

    //模式:up表示从下面弹出，left表示从左边弹出，right表示从右边弹出
    mode = "up";

    //展示弹窗
    show = (title,subTitle,content,CLASSNAME,option)=>{
        if(title) this.title = title;
        if(subTitle) this.subTitle = subTitle;
        if(content) this.content = content;

        var option = option||{};

        if(option.closeIconUrl) this.closeIconUrl = option.closeIconUrl;
        if(typeof option.mask==="boolean") this.mask = option.mask;

        if(option.mode) this.mode = option.mode;

        var odiv = document.createElement("div");
        if(CLASSNAME){
            odiv.className=CLASSNAME;
        }
        document.body.appendChild(odiv);

        ReactDOM.render(this.render(),odiv,()=>{
            this.transForm();
        });
    }

    transForm = ()=>{
        if(this.mode==="up"){
            var box = document.querySelector(".c-content-trans");
            var heightBox = box.querySelector(".c-pick-transbox").offsetHeight;
            var paddingHeight = box.offsetHeight;
            box.style.height = heightBox+paddingHeight+"px"; 
        }else if(this.mode==="left"){
            var box = document.querySelector(".c-content-trans-left");
            setTimeout(()=>{
                box.style.transform = "translateX(0)"; 
            },80)
           
        }else if(this.mode==="right"){
            var box = document.querySelector(".c-content-trans-right");
            setTimeout(()=>{
                box.style.transform = "translateX(0)"; 
            },80)
        }
         
    }

    //关闭弹窗的方法
    close = ()=>{
        var transTime = 300;

        if(this.mode==="up"){
            var box = document.querySelector(".c-content-trans");
            var paddingHeight = box.offsetHeight;
            setTimeout(()=>{
                box.style.transform = `translateY(100%)`;
            },0)
            
        }else if(this.mode==="left"){
            var box = document.querySelector(".c-content-trans-left");
            box.style.transform = "translateX(-100%)";
            transTime = 330; 
        }else if(this.mode==="right"){
            var box = document.querySelector(".c-content-trans-right");
            box.style.transform = "translateX(100%)";
            transTime = 330; 
        }

        box.style.transition = "transform .2s"
        
        setTimeout(()=>{
            this.dialogElem.parentNode.remove();
        },transTime)
    }

    //点击蒙层关闭弹窗
    handleClose = (e)=>{
        if(e.target.className.indexOf("c-pick-mask")!=-1){
            this.close();
        }
    }

    //弹窗组件静态方法
    static show(title,subTitle,content,CLASSNAME,option){
        var r = new Pick();
        //显示弹窗
        r.show(title,subTitle,content,CLASSNAME,option);
    }
}

