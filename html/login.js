$(document).ready(function(){

function Base64() {  
   
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    }  
   
    // public method for decoding  
    this.decode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
    }  
   
    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
} 

$(function(){
 $("#test11").click(function(){
    var account =$("#account").val();
    var passwd =$("#passwd").val();
    document.getElementById("login_ret").innerHTML = "ok"+account+" "+passwd;
});
});

$('#mylogin').click(function(){
    //document.getElementById("login_ret").innerHTML = "failed111";
    // for test
    //parent.document.cookie = 'AxliF80Lp=' + "passwd"; //passwd; 
    checkCookie()
    var str = $("#loginid").serialize()
    console.log("serial: ", str)
    //return        
    $.ajax({
        cache: false,
        type: "POST",
        url: "login",
        data: $("#loginid").serialize(), //"account=" + account + "&passwd=" + passwd,
        async: true,
        error: function(request)
        {
            document.getElementById("login_ret").innerHTML = "failed111";
            // for test
            parent.document.cookie = 'AxliF80Lp=' + "passwd"; //passwd; 
            //window.parent.window.location.href = "index.html"; // 回到首页
            return;
        },
        // 应该是发送成功了，但不一定是真正的成功，还要看data的值
        success: function(data)
        {
            document.getElementById("login_ret").innerHTML = data;
            if (data == '0')
            {
                var base = new Base64();
                passwd1 = base.encode(passwd);
                for (var i = 0; i < passwd1.length; i++)
                {
                    passwd1[i] = (passwd1[i] + 0x1) % 64;
                }
                parent.document.cookie = 'AxliF80Lp=' + passwd1; //base.encode(passwd2); //passwd; 
                window.parent.window.location.href = "index.html"; // 回到首页
            }
            else
                window.parent.document.getElementById("login_ret").innerHTML = "账号或密码错误";
        }
    });
})
});