/* 这个文件暂时不使用，但保留，方便对比 

使用如下：
<!-- <script type="text/javascript" src="foobar.js"></script> -->
<!-- 在页面加载时就执行 -->
<!-- <body onload="getSysInfo()"> -->
*/

function createXHR() 
{
    var xhr;

    try 
    {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } 
    catch (e) 
    {
        try 
        {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(E) 
        {
            xhr = false;
        }
    }

    if (!xhr && typeof XMLHttpRequest != 'undefined') 
    {
        xhr = new XMLHttpRequest();
    }

    return xhr;
}

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
            document.getElementById("sys_info").innerHTML = "got nothing";
            return;
        },
        // 应该是发送成功了，但不一定是真正的成功，要看data的值
        success: function(data)
        {
            document.getElementById("sys_info").innerHTML = data;
            //window.location.href = "index.html"; // 回到首页
        }
    });
}

// 原生js实现
function getSysInfo1() 
{
    xhr = createXHR();

    if(xhr)
    {
        // 如果不与后台交互，则这样做可以在页面上显示内容
        //document.getElementById("sys_info").innerHTML = '250';
        xhr.onreadystatechange=function()
        {
            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                var ret = xhr.responseText;

                if(ret != null && ret.length > 0)
                {
                    document.getElementById("sys_info").innerHTML = ret;
                }
            }
        }
        // 发送get请求给后台（cgi响应），返回值在onGetTime处理器
        //test.cgi后面跟个cur_time参数是为了防止Ajax页面缓存
        xhr.open("GET", "cgi-bin/test.cgi?sysinfo=" + new Date().getTime());
        xhr.send(null);
    }
    
    setInterval('getSysInfo', 1000);
}
