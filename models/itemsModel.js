const mysql = require("mysql2/promise");

// DB 연결
const pool = mysql.createPool({
  host: "localhost", // DB가 설치된 호스트 IP주소
  user: "root", // DB 접속 유저이름
  password: "120306", // DB 접속 비밀번호
  database: "product", // DB 이름
});

// 모든 데이터 가져오기
const getAll = async () => {
  // const query = "SELECT * FROM items";
  // 아이템이랑 카테고리 테이블을 조인하고 조인할때 아이템의 카테고리 컬럼이랑 카테고리 테이블의 아이디 컬럼을 가져온다.
  // join은 보여주는 용도로 실제 테이블이 합쳐져 데이터가 바뀌는 것은 아니다.
  const query =
    "SELECT I.*, C.categoryName FROM items I join category C on I.category = C.id";
  const [rows] = await pool.query(query);
  return rows;
};

// 해당 데이터 하나만 가져오기
const getOne = async (Id) => {
  const query = `SELECT * FROM items WHERE id = ${Id}`;
  const [rows] = await pool.query(query);
  return rows;
};

// 해당 userid 하나만 가져오기 (중복확인을 하기 위해)
const userIdOne = async (userId) => {
  const query = `SELECT * FROM items WHERE userid = ${userId}`;
  const [rows] = await pool.query(query);
  return rows;
};

// category 가져오기
const categoryAll = async () => {
  const query = "SELECT * FROM category";
  const [rows] = await pool.query(query);
  return rows;
};

// 등록하기
const postData = async (data) => {
  try {
    const query = `INSERT INTO items (userid, name, content, url, category) VALUES (?, ?, ?, ?, ?)`;
    await pool.query(query, [
      data.userid,
      data.name,
      data.content,
      data.url,
      data.category,
    ]);
    return "데이터가 성공적으로 등록되었습니다.";
  } catch (e) {
    console.log("error", e);
    throw new Error("데이터 등록 실패");
  }
};

// 해당 아이디를 가진 모든 데이터 삭제
const deleteRow = async (id) => {
  const query = `DELETE FROM items WHERE id = ${Number(id)}`;
  // 시도가 되면 처리하고 안되면 에러 처리를 하게 된다는 의미
  try {
    await pool.query(query, [id]);
  } catch (e) {
    console.log("삭제 실패");
  }
};

// 해당 아이디를 가진 데이터 수정
const updateRow = async (data) => {
  // 직접 넣으면 읽지 못함.(js에서는 직접 넣지만 sql에서는 안됨)
  // const query = `UPDATE items SET name = ${data.name}, content = ${
  //   data.content
  // } WHERE id =${Number(data.id)}`;
  // const query = `UPDATE items SET  userid = ?, name = ?, content = ?, url = ? WHERE id = ?`;

  // url의 유무에 따라 값이 달라지므로 동적으로 실행
  let query = ""; // SQL 쿼리를 저장할 빈 문자열
  const param = []; // 쿼리 실행에 필요한 파라미터들을 저장할 빈 배열

  if (data.url) {
    // url 값이 있을 경우
    query = `UPDATE items SET userid = ?, name = ?, content = ?, url = ?, category = ? WHERE id = ?`;
    // 여기서 param 은 SQL 쿼리에서 ? 자리에 들어갈 실제 값을 저장하는 배열
    param.push(
      data.userid,
      data.name,
      data.content,
      data.url,
      data.category,
      Number(data.id)
    );
  } else {
    // url 값이 없을 경우
    query = `UPDATE items SET userid = ?, name = ?, content = ?, category = ? WHERE id = ?`;
    param.push(
      data.userid,
      data.name,
      data.content,
      data.category,
      Number(data.id)
    );
  }
  // if (data.url) {
  //   // url 값이 있을 경우
  //   query = `UPDATE items I
  //            JOIN category C ON I.category = C.id
  //            SET I.userid = ?, I.name = ?, I.content = ?, I.url = ?, I.category = ?
  //            WHERE I.id = ?`;
  //   param.push(
  //     data.userid,
  //     data.name,
  //     data.content,
  //     data.url,
  //     data.category,
  //     Number(data.id)
  //   );
  // } else {
  //   // url 값이 없을 경우
  //   query = `UPDATE items I
  //            JOIN category C ON I.category = C.id
  //            SET I.userid = ?, I.name = ?, I.content = ?, I.category = ?
  //            WHERE I.id = ?`;
  //   param.push(
  //     data.userid,
  //     data.name,
  //     data.content,
  //     data.category,
  //     Number(data.id)
  //   );
  // }

  console.log(query, param);

  try {
    await pool.query(query, param);
    // await pool.query(query, [
    //   data.userid,
    //   data.name,
    //   data.content,
    //   data.url,
    //   Number(data.id),
    // ]);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getAll,
  getOne,
  postData,
  deleteRow,
  updateRow,
  userIdOne,
  categoryAll,
};
