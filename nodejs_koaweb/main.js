const Koa = require("koa");
const koa_bodyparser = require("koa-bodyparser");
const koastatic = require('koa-static');
const path = require('path');

const router = require("./router.js");

const SVR_HOST = "0.0.0.0";
const SVR_PORT = 9000;

let g_webServer = null;

const staticPath = '../myui';

function main()
{
    var app = new Koa();

    app.use(koa_bodyparser({
        enableTypes:["json","test","form"],
        onerror:function (err,ctx){
            console.log("webserver body parse error",err);
            ctx.throw(400,"body parse error");
        },
    }));

    // 设置主目录
    
    app.use(koastatic(path.join( __dirname, staticPath)));

    app.use(router.g_router.routes());

    g_webServer = app.listen({
        host:SVR_HOST,
        port:SVR_PORT,
    });

    console.log('webserver start listen on: ', SVR_PORT);

    app.on('error', err => {
        log.error('webserver error', err);
    });
}

main();