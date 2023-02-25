
const koa = require("koa");
const path = require("path");
const render = require("koa-ejs");
const koaRouter = require("koa-router");
const axios = require("axios");
const {fromFile} = require("./SpeechRecognition")
const app = new koa();
const router = new koaRouter();
const fs = require('fs');

render(app, {
    root: path.join(__dirname, "views"),
    layout: "index",
    viewExt: "html",
});

router.post("/", (ctx) => {
    
    console.log(ctx.request.body)
    const wavUrl = audioFile
    const buffer = Buffer.from(
        wavUrl.split('base64,')[1],  // only use encoded data after "base64,"
        'base64'
    )
    fs.writeFileSync('./audio.wav', buffer)
    console.log(`wrote ${buffer.byteLength.toLocaleString()} bytes to file.`)
    fromFile(audioFile)
});

router.get("users", "/users", async (ctx) => {
    const result = await axios.get("https://randomuser.me/api?results=5");

    return ctx.render("index", {
        users: result.data.results,
    });
});


app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));