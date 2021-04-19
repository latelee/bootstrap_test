$(document).ready(function(){
    getSysInfo();
    setInterval(getSysInfo, 3000); // 间隔执行，以定时刷新时间
    function getSysInfo()
    {
        $.ajax({
            cache: false,
            type: "GET",
            url: "cgi-bin/test.cgi",
            data: "sysinfo=" + new Date().getTime(),
            async: true,
            error: function(request)
            {
                $("#sys_info").text("got nothing");
                return;
            },
            // 应该是发送成功了，但不一定是真正的成功，要看data的值
            success: function(data)
            {
                //var kerLen = data.substr(0, 4);
                //var kerVersion = data.substr(4, kerLen);
                // document.getElementById("sys_info").innerHTML = data;
                $("#sys_info").html(data);
                //$("#sys_info").text(data);
            }
        });
    }

$('#resetInfo').click(function(){

    $.ajax({
        cache: false,
        type: "GET",
        url: "cgi-bin/test.cgi",
        data: "resetInfo=",
        async: true,
        error: function(request)
        {
            return;
        },
        // 应该是发送成功了，但不一定是真正的成功，还要看data的值
        success: function(data)
        {
            if (data == '0')
                $("#reset_info").text("设置成功");
            else
                $("#reset_info").text("设置失败");
        }
    });
})

// 在js中使用升级，不成功
$('#upload').click(function(){
var form = $('#upload');  
var formdata = new FormData(form);
    $.ajax({
        cache: false,
        type: "POST",
        url: "cgi-bin/upload.cgi",
        data: formdata,
        async: false,  
        cache: false,  
        contentType: false,  
        processData: false,
        error: function(request)
        {
            return;
        },
        // 应该是发送成功了，但不一定是真正的成功，还要看data的值
        success: function(data)
        {
            if (data)
                $("#reset_info").text("设置成功");
        }
    });
})

});