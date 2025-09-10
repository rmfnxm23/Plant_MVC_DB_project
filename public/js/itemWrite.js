const move_url = (type) => {
  if (type === "main") {
    window.location.href = "http://localhost:3000/items";
  }
};

const alert_show = () => {
  alert("준비중입니다");
};

const updateForm = (id, event) => {
  event.preventDefault(); // 기본 동작을 막음 (예: 폼 제출, 링크 이동 등) //

  //   console.log(id, "0000000");
  const form = document.forms["updateData"];
  //   console.log(form["name"].value, "111111111111");

  const userId = form["userId"].value.trim();
  const name = form["name"].value.trim();
  const contents = editor.getMarkdown().trim();
  const category = form["category"].value;
  const file = form["url"].files[0];

  // 필수 항목 체크
  if (!userId) {
    alert("유저아이디를 입력해주세요.");
    return;
  }
  if (!name) {
    alert("이름을 입력해주세요.");
    return;
  }
  if (!contents) {
    alert("내용을 입력해주세요.");
    return;
  }
  if (!category) {
    alert("카테고리를 선택해주세요.");
    return;
  }

  const data = new FormData();
  // console.log("id:" + id);
  data.append("id", id);
  data.append("userid", form["userId"].value);
  data.append("name", form["name"].value);
  data.append("content", contents);
  data.append("category", form["category"].value);

  if (file) {
    data.append("url", file);
  }

  // // FormData의 내용을 확인하기 위해 forEach 사용
  // data.forEach((value, key) => {
  //   console.log(key, value);
  // });

  axios({
    // 업데이트 할 때는 method를 put으로 사용
    method: "put",
    url: "/items/update",
    data: data,
    headers: {
      "Content-type": "multipart/form-data",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        alert("수정 성공");
        // window.location.reload();
        window.location.href = "/items/register"; //수정완료 시 아이템 등록페이지로 자동 이동
      }
    })
    .catch((e) => {
      if (e.response?.status === 409) {
        alert("유저ID 중복");
      } else {
        console.error(e);
        alert("수정 중 오류 발생");
      }
    });
};

// 파일 이미지 선택시 미리보기 기능
// 파일 입력을 트리거하는 함수
const triggerFileInput = () => {
  document.getElementById("url").click();
};

// 파일을 선택했을 때 미리보기 이미지를 업데이트하는 함수
const fileInputField = (event) => {
  const file = event.target.files[0]; // 선택된 파일
  const previewImage = document.getElementById("previewImage");
  const placeholder = document.getElementById("placeholder");

  if (file) {
    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
};
