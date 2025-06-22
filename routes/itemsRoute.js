const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// 세부설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // 원본 파일명에서 확장자 추출
    const ext = path.extname(file.originalname); // 파일 확장자
    const originalName = path.parse(file.originalname).name; // 원본 파일 이름 (확장자 제외)

    // 현재 날짜 구하기 (YYYY_MMDD 형식)
    const today = new Date();
    const dateString =
      today.getFullYear() +
      "_" +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0");

    // 새로운 파일 이름 생성 (날짜_원본파일명.확장자)
    const newFilename = `${dateString}_${originalName}${ext}`;

    // 파일 이름 설정
    cb(null, newFilename);
  },
});
// Multer 미들웨어 생성
const upload = multer({ storage });

// 컨트롤러 가져오기
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.itemsMainPage);

router.get("/filter/:categoryid", itemsController.categoryData);

router.get("/register", itemsController.itemAll);

router.get("/404", itemsController.item404);

router.get("/itemOne/:id", itemsController.itemOne);

router.get("/write/:id", itemsController.moveWrite);

// router.put("/update", itemsController.dataUpdate);
router.put("/update", upload.single("url"), itemsController.dataUpdate);

// router.post("/post/test", itemsController.createTest);
router.post("/post/test", upload.single("url"), itemsController.createTest);

router.delete("/delete/:id", itemsController.deleteData);

module.exports = router;
