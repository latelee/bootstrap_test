document.writeln("  <meta http-equiv=\'X-UA-Compatible\' content=\'IE=edge\'>");
document.writeln("  <meta name=\'viewport\' content=\'width=device-width, initial-scale=1\'>");
document.writeln("  <link href=\'favicon.ico\' rel=\'shortcut icon\' type=\'image/x-icon\'/>");
document.writeln("  <link rel=\'stylesheet\' href=\'css/main.css\'> ");
document.writeln("  <link href=\'css/bootstrap.min.css\' rel=\'stylesheet\'> ");
document.writeln("  <link rel=\'stylesheet\' href=\'css/font-awesome.min.css\'>");
document.writeln("  <script src=\'js/jquery-2.0.0.min.js\'></script><script src=\'js/bootstrap.min.js\'></script>");
document.writeln("  <script src=\'js/main.js\'></script>");
document.writeln("  <title>管理后台</title>");


function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        { 
            c_start=c_start + c_name.length+1 
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
}

function setCookie(name, value, day)
{
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires='+ date;
};

function checkCookie()
{
    //return 0
    username=getCookie('AxliF80Lp')
    console.log("name: ", username)
    //return 0;
    if (username!=null && username!="")
        return 0;
    else 
        window.location.href="login.html"
}
