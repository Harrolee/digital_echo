const koa = require("koa");
const path = require("path");
const render = require("koa-ejs");
const koaRouter = require("koa-router");
const { koaBody } = require("koa-body");
const { fromFile } = require("./SpeechRecognition");
const app = new koa();
const router = new koaRouter();
const fs = require("fs");

render(app, {
  root: path.join(__dirname, "views"),
  layout: "recorder",
  viewExt: "html",
});

router.get("/", (ctx) => {
  return ctx.render("recorder");
});

router.post("/transcribe", koaBody(), (ctx) => {
  console.log(ctx.request.body);
  ctx.body = JSON.stringify(ctx.request.body);
  const wavUrl = ctx.body;
  const buffer = Buffer.from(
    wavUrl.split("base64,")[1], // only use encoded data after "base64,"
    "base64"
  );
  const filePath = "audio.wav";
  fs.writeFileSync(filePath, buffer);
  console.log(`wrote ${buffer.byteLength.toLocaleString()} bytes to file.`);
  fromFile(filePath);
});

app.use(router.routes());
//.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
