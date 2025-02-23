// int imageBox
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
      placeholder.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
};

// 등록 버튼
const createData = () => {
  const fileInput = document.getElementById("url");
  const file = fileInput.files[0]; // 선택된 파일
  const userId = document.getElementById("userId").value;
  const names = document.getElementById("name").value;
  const contents = document.getElementById("content").value;

  const category = document.getElementById("category").value;

  //   let data = {
  //     userid: userId.value,
  //     name: names.value,
  //     content: contents.value,
  //   };

  console.log(file, "112");

  const formData = new FormData();
  formData.append("userid", userId);
  formData.append("name", names);
  formData.append("content", contents);
  formData.append("category", category);

  if (file) {
    formData.append("url", file); // 이미지 파일도 함께 전송
  }

  // FormData의 내용을 확인하기 위해 forEach 사용
  formData.forEach((value, key) => {
    console.log(key, value); // key와 value를 출력
  });

  axios({
    method: "post",
    url: "/items/post/test",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data", // 파일을 전송할 때는
      //  multipart/form-data 타입이어야 합니다.
    },
  })
    .then((res) => {
      console.log(res.data, "fdfsfdfsdfsfsfdd");
      if (res.status === 200) {
        alert("등록 성공");
        // console.log(res, "받았어???");
        window.location.reload(); // 등록 성공하면 새로고침
      } else if (res.status === 201) {
        alert("유저ID 중복");
      } else {
        alert("오류");
      }
    })
    .catch((e) => {
      console.error(e);
      alert("error");
    });
};

// 삭제 버튼
const deleteItem = (id) => {
  axios({
    method: "delete",
    url: `/items/delete/${id}`,
  })
    .then(() => {
      alert("삭제 성공");
      window.location.reload(); // 삭제 성공 후 새로고침
    })
    .catch((e) => {
      console.error(e);
    });
};

// 수정 버튼 => 수정페이지로 이동
const updatePage = (id) => {
  window.location.href = `/items/write/${id}`;
};
