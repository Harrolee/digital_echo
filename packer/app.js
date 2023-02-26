const koa = require("koa");
const path = require("path");
const render = require("koa-ejs");
const koaRouter = require("koa-router");
const { koaBody } = require("koa-body");
const { fromFile } = require("./scripts/SpeechRecognition");
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
  // console.log(ctx.request.body);
  // ctx.body = JSON.stringify(ctx.request.body);
  const wavBlob = ctx.request.body;
  console.log(wavBlob);
  const b64 = JSON.parse(wavBlob);
  console.log(b64);
  const buffer = Buffer.from(
    wavBlob.split("base64,")[1], // only use encoded data after "base64,"
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
