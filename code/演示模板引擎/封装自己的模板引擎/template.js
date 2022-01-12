function template(id,data){
    var str = document.getElementById(id).innerHTML;
    var pattern = /{{\s*([a-zA-Z]+)\s*}}/;

    var res = null;
    while(res = pattern.exec(str)){
        str = str.replace(res[0],data[res[1]])
    }
    return str;
}