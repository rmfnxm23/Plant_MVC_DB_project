const itemsModel = require("../models/itemsModel");

// 메인 페이지 렌더링
const itemsMainPage = async (req, res) => {
  const items = await itemsModel.getAll();
  // console.log(items);
  const category = await itemsModel.categoryAll();
  console.log(category);
  res.render("items/main", { items, category });
};

// 카테고리 클릭시 필터링

// 아이템 등록 페이지 렌더링
const itemAll = async (req, res) => {
  const items = await itemsModel.getAll();
  // console.log(items, "--------");
  const category = await itemsModel.categoryAll();
  res.render("items/register", { items, category });
};

const itemOne = async (req, res) => {
  // console.log(req.params.id);
  const itemOne = await itemsModel.getOne(req.params.id);
  res.render("items/itemOne", { itemOne });
};

// 데이터 등록
const createTest = async (req, res) => {
  // console.log("createTest 함수 호출됨"); // 이 로그가 찍히는지 확인

  // const createData = await itemsModel.postData(req.body);

  try {
    // 클라이언트에서 넘어온 텍스트 데이터
    const { userid, name, content, category } = req.body;
    // console.log(req.body, "123123");

    // 이미지가 업로드되었는지 확인
    const url = req.file ? `/uploads/${req.file.filename}` : null;
    // console.log(url);
    // 텍스트 데이터와 이미지 URL을 함께 DB에 저장

    // userid 중복 검사
    const userIdData = await itemsModel.userIdOne(userid);
    console.log(userIdData);
    if (userIdData.length === 0) {
      const createData = await itemsModel.postData({
        userid,
        name,
        content,
        url, // 이미지 URL 추가
        category,
      });
      // console.log(createData, "createData");
      console.log(category);

      res.status(200).send({ createData }); // 성공적으로 처리되었음을 응답
    } else {
      res.status(201).send("데이터 중복");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 등록 실패");
  }
};

// 해당 아이디 삭제
const deleteData = async (req, res) => {
  // console.log(req.params, "삭제");
  await itemsModel.deleteRow(req.params.id);
  res.send("200");
};

// 해당 아이디 수정 페이지로
const moveWrite = async (req, res) => {
  // console.log(req.params, "수정");
  const itemOne = await itemsModel.getOne(req.params.id);
  // console.log(req.params.id);

  const category = await itemsModel.categoryAll();
  // console.log(itemOne, "1");
  console.log(category, "2");
  console.log(typeof itemOne.category, "1");
  console.log(typeof category.id, "2");

  res.render("items/itemWrite", { itemOne, category });
};

// 수정페이지: 데이터 업데이트
const dataUpdate = async (req, res) => {
  // console.log(req.body, "ddddddddd");
  // await itemsModel.updateRow(req.body);

  try {
    const { id, userid, name, content, category } = req.body;
    // console.log(userid, name, content, category);
    // console.log("-----------------------------");
    // 이미지가 업로드되었는지 확인
    const url = req.file ? `/uploads/${req.file.filename}` : null;
    const upData = await itemsModel.updateRow({
      id,
      userid,
      name,
      content,
      url,
      category,
    });

    console.log("update : ", upData);

    // res.send("200")
    res.status(200).send({ upData });
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 등록 실패");
  }
};
// 잘못된 경로
const item404 = (req, res) => {
  res.render("items/404");
};

module.exports = {
  itemsMainPage,
  itemAll,
  itemOne,
  item404,
  createTest,
  deleteData,
  moveWrite,
  dataUpdate,
};
