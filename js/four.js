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
    $('.submit-con').on('click',function(){
        let userName = $('#userName').val();
        let tel = $('#tel').val();
        if(tel.length < 11){
            alert('请您完善电话号码！');
        }else{
            let str = `姓名：${userName}\n电话：${tel}\n确定提交吗？`
            alert(str);
        }
        // $.ajax({
        //     url: '',
        //     type: 'post',
        //     dataType: 'json',
        //     data: {
        //         userName: userName,
        //         tel: tel
        //     },
        //     success: function(result){

        //     }
        // });
    });
});