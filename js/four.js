$(function(){
    function test(telv){
        let reg = /^1\d*$/ig;
        if(telv.length > 11){
            $('#tel').val(telv.substr(0,11));
        }
        //let telValue = parseInt(telv);
        if(!(reg.test(telv))){ 
            $('#tel').val('');
            //alert("请输入正确的手机号码");
        }
    };
    $('#tel').on('input',function(event){
        test(event.target.value);
    });
    $('.left-add').on('click',function(){
        let leftScore = $('.left-score').html();
        let newLeftScore = parseInt(leftScore) + 1;
        if(newLeftScore > 9) {
            return;
        }
        $('.left-score').html(newLeftScore);
    });
    $('.left-reduce').on('click',function(){
        let leftScore = $('.left-score').html();
        let newLeftScore = parseInt(leftScore) - 1;
        if(newLeftScore < 0) {
            return;
        }
        $('.left-score').html(newLeftScore);
    });
    $('.right-add').on('click',function(){
        let rightScore = $('.right-score').html();
        let newRightScore = parseInt(rightScore) + 1;
        if(newRightScore > 9) {
            return;
        }
        $('.right-score').html(newRightScore);
    });
    $('.right-reduce').on('click',function(){
        let rightScore = $('.right-score').html();
        let newRightScore = parseInt(rightScore) - 1;
        if(newRightScore < 0) {
            return;
        }
        $('.right-score').html(newRightScore);
    });
    var Ajax={
        get: function(url, fn) {
            // XMLHttpRequest对象用于在后台与服务器交换数据   
            var xhr = new XMLHttpRequest();            
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                // readyState == 4说明请求已完成
                if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
                    // 从服务器获得数据 
                    fn.call(this, xhr.responseText);  
                }
            };
            xhr.send();
        },
        // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
        post: function (url, data, fn) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            // 添加http头，发送信息至服务器时内容编码类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                    fn.call(this, xhr.responseText);
                }
            };
            xhr.send(data);
        }
    }
    $('.submit-con').on('click',function(){
        let userName = $('#userName').val();
        let tel = $('#tel').val();
        let score = $('.left-score').html() + ':' + $('.right-score').html();
        if(tel.length < 11){
            alert('请您完善电话号码！');
        }else{
            // Ajax.get('http://120.78.68.167:8080/man/update?name='+userName+'&phoneNum='+tel+'&score='+score+'&t='+new Date().getTime(),function(result){
            //     console.log(result);
            //     alert('提交成功');
            // });
            $.ajax({
                url: 'http://120.78.68.167:8080/man/update?t='+new Date().getTime(),
                type: 'get',
                dataType: 'json',
                async: false,
                data: {
                    name: userName,
                    phoneNum: tel,
                    score: score
                },
                success: function(result){
                    if(result){
                        alert('提交成功');
                    }
                }
            });
        }
    });
});