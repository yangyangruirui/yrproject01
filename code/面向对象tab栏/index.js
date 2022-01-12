var that;
class Tab{
    constructor(id){
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector(".add");
        this.ul = this.main.querySelector(".top ul:first-child");
        this.content = this.main.querySelector(".content");
        this.init();
    }
    init(){
        this.updateNode();
        //初始化操作,让相关的元素绑定事件
        for(var i = 0; i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            // this.delete[i].index = i;
            this.delete[i].onclick = this.deleteTab;
            this.spans[i].ondblclick = this.editTab;
            this.section[i].ondblclick = this.editTab;
        }
        this.add.onclick = this.addTab;
    }
    updateNode(){
        //获取元素列表
        this.lis = this.main.querySelectorAll("li");
        this.section  = this.main.querySelectorAll("section");
        this.delete = this.main.querySelectorAll(".delete");
        this.spans = this.main.querySelectorAll(".top li span:first-child");
    }
    //1.切换功能
    toggleTab(){
        that.clearClass();
        // console.log(this.index);
        this.className = "licurrent";
        that.section[this.index].className = "current";
       
    }
    clearClass(){
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = "";
            this.section[i].className = "";
        }
    }
    //2.添加功能
    addTab(){
        that.clearClass();
        var random = parseInt(Math.random()*10);
        // console.log("add");
        //1.创建li 元素和section元素
        var addli = "<li  class=\"licurrent\"><span>标签"+random+"</span><span class=\"delete\">删除</span></li>";
        var addsection = "<section class=\"current\">内容"+random+"</section>";
        //2.把这两个元素追加到界面
        that.ul.insertAdjacentHTML("beforeend",addli);
        that.content.insertAdjacentHTML("beforeend",addsection);
        that.init();
    }
    //3.删除功能
    deleteTab(e){
        // console.log(this.index);
        e.stopPropagation(); //阻止冒泡.防止触发li的切换
        var index  = this.parentNode.index;
        //根据索引号index 删除对应的li 和section
        that.lis[index].remove();
        that.section[index].remove();
        that.init();
        //当我们删除的不是选定状态的li时,原来选中的状态不需要更改
        if(document.querySelector(".licurrent")) return;
        //当我们删除了选定状态的li 和section 让他的前一个li和section处于选定状态
        // that.clearClass();
        // that.lis[index-1].className = "licurrent";
        // that.section[index-1].className="current";
        index--;
        //手动调用点击事件,不需要使用鼠标触发 
        //&& 如果前面条件为真再执行后面的代码 
        //否则不执行 
        that.lis[index] && that.lis[index].click();
    }
    //4.编辑功能
    editTab(){
        // console.log("dbclick");
        var str = this.innerHTML;
        //双击禁止选中文字
        window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
        this.innerHTML = "<input type=\"text\"/>";
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        }
        //按下回车键也可以把值给文本框
        input.addEventListener("keyup",function(e){
            if(e.key =="Enter"){
                this.blur();
            }
        });
    }
}
new Tab("#tab");