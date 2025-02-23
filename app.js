const express = require("express");
const path = require("path");
const ejs = require("ejs"); // 페이지 로딩을 위해 필수
const app = express();
const port = 3000;

// 라우터 분리
const itemsRoute = require("./routes/itemsRoute");

// JS CSS 연결하기 위해
// static 이라는 정적인 폴더를 생성하여 사용 (괄호안에 파일명)
app.use("/public", express.static("public"));
// 정적 파일 서빙 (업로드된 파일 접근을 위해)
app.use("/uploads", express.static("uploads"));

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/items", itemsRoute);

app.set("view engine", "ejs");
app.set("views", "./views");

// app.post("/post/test", upload.single("url"), (req, res) => {
//   // console.log("받은 데이터:", req.body); // 텍스트 데이터 확인
//   // console.log("받은 파일:", req.file); // 파일 데이터 확인
//   const { userid, name, content } = req.body;

//   // 이미지 파일이 존재한다면, URL을 만들어 응답
//   const url = req.file ? `/uploads/${req.file.filename}` : null;

//   // console.log("업로드된 이미지 URL:", url); // 이미지 URL 확인
//   const data = { userid, name, content, url };
//   // res.send({
//   //   userid,
//   //   name,
//   //   content,
//   //   url, // 이미지 URL
//   // }); // 응답 확인
//   res.json(data);
// });

app.listen(port, () => {
  console.log(`http://localhost:3000 / Example app listening on port ${port}`);
});

// app.get('/', (req, res) => {
//   res.render('index');
// })
