const itemsModel = require("../models/itemsModel");

// 메인 페이지 렌더링
const itemsMainPage = async (req, res) => {
  const items = await itemsModel.getAll();
  const category = await itemsModel.categoryAll();
  res.render("items/main", { items, category });
};

// 카테고리 클릭시 필터링
const categoryData = async (req, res) => {
  const categoryId = req.params.categoryid; // URL 파라미터로 카테고리 ID 받기

  // 카테고리별 아이템을 반환하는 쿼리 작성 (선택적으로 if 문을 사용해 필터링)
  const items = await itemsModel.getItemsByCategory(categoryId);

  if (items.length === 0) {
    // res.render("items/main", { message: "No items found for this category" });
    return res.json({ message: "No items found for this category", items: [] });
  } else {
    // 렌더링을 다시 해주면 axios then{(res.data)}가 HTML 전체를 가져온다.
    // res.render("items/main", { items, category: categoryId });
    return res.json({ items });
  }

  // res.json(filteredItems); // JSON 형식으로 클라이언트에 응답
};

// 아이템 등록 페이지 렌더링
const itemAll = async (req, res) => {
  const items = await itemsModel.getAll();

  const category = await itemsModel.categoryAll();
  res.render("items/register", { items, category });
};

const itemOne = async (req, res) => {
  const itemOne = await itemsModel.getOne(req.params.id);
  res.render("items/itemOne", { itemOne });
};

// 데이터 등록
const createTest = async (req, res) => {
  // const createData = await itemsModel.postData(req.body);

  try {
    // 클라이언트에서 넘어온 텍스트 데이터
    const { userid, name, content, category } = req.body;

    // 이미지가 업로드되었는지 확인
    const url = req.file ? `/uploads/${req.file.filename}` : null;

    // 필수 항목 체크: 빈 값이면 반환
    if (!userid || !name || !content || !category) {
      return;
    }

    // userid 중복 검사
    const userIdData = await itemsModel.userIdOne(userid);

    if (userIdData.length === 0) {
      const createData = await itemsModel.postData({
        userid,
        name,
        content,
        url, // 이미지 URL 추가
        category,
      });

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
  await itemsModel.deleteRow(req.params.id);
  res.send("200");
};

// 해당 아이디 수정 페이지로
const moveWrite = async (req, res) => {
  const itemOne = await itemsModel.getOne(req.params.id);

  const category = await itemsModel.categoryAll();

  res.render("items/itemWrite", { itemOne, category });
};

// 수정페이지: 데이터 업데이트
const dataUpdate = async (req, res) => {
  // await itemsModel.updateRow(req.body);

  try {
    const { id, userid, name, content, category } = req.body;

    // 이미지가 업로드되었는지 확인
    const url = req.file ? `/uploads/${req.file.filename}` : null;

    // 필수 항목 체크: 빈 값이면 반환
    if (!userid || !name || !content || !category) {
      return;
    }

    // userid 중복 검사
    const userIdData = await itemsModel.userIdOne(userid);
    console.log(userIdData);
    if (userIdData.length === 0) {
      const upData = await itemsModel.updateRow({
        id,
        userid,
        name,
        content,
        url,
        category,
      });

      res.status(200).send({ upData });
    } else {
      res.status(201).send("데이터 중복");
    }
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
  categoryData,
};
