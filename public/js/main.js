const move_url = (type) => {
  if (type === "main") {
    window.location.href = "http://localhost:3000/items";
  }
};

const alert_show = () => {
  alert("준비중입니다");
};

function categoryItem(categoryid) {
  // 버튼 클릭 시, 해당 카테고리 ID를 서버로 전송
  axios({
    method: "get",
    url: `/items/filter/${categoryid}`,
  })
    .then((response) => {
      console.log(response.data.items, "2222222222");
      if (response.data.items.length > 0) {
        // 서버에서 반환한 아이템 목록을 화면에 업데이트
        updateProductCards(response.data.items);

        // alert("good");
      } else {
        alert("NOT FOUND");
      }
    })
    .catch((error) => {
      console.error("Error fetching filtered items:", error);
      alert("error");
    });

  // // 카테고리 클릭 시, 해당 카테고리 ID로 필터링
  // function categoryItem(categoryId) {
  //   // 로컬 스토리지에 선택된 카테고리 ID 저장
  //   localStorage.setItem("selectedCategory", categoryId);

  //   // 모든 아이템을 가져옴
  //   const productCards = document.querySelectorAll(".productCard");

  //   // 각 아이템을 확인하며, 카테고리 ID가 일치하는 아이템만 표시
  //   productCards.forEach((card) => {
  //     const itemCategory = card.getAttribute("data-category");

  //     if (itemCategory === categoryId) {
  //       card.style.display = "block"; // 일치하는 아이템을 보이게
  //     } else {
  //       card.style.display = "none"; // 일치하지 않으면 숨김
  //     }
  //   });
  // }

  // // 페이지가 로드될 때 로컬 스토리지에서 선택된 카테고리 정보를 가져옴
  // window.addEventListener("load", () => {
  //   const selectedCategory = localStorage.getItem("selectedCategory");

  //   if (selectedCategory) {
  //     // 로컬 스토리지에서 선택된 카테고리가 있다면 해당 카테고리로 필터링
  //     categoryItem(selectedCategory);
  //   }
  // });
}

// 화면에 아이템 목록을 업데이트하는 함수
function updateProductCards(items) {
  const productCardsContainer = document.querySelector(".mainItems");
  productCardsContainer.innerHTML = ""; // 기존 아이템들을 지웁니다

  // 새로운 아이템 목록을 화면에 추가
  items.forEach((item) => {
    const productCard = document.createElement("div");
    productCard.classList.add("productCard");
    productCard.innerHTML = `
    <a href="/items/itemOne/${item.id}">
      <div class="cardContent">
        <img class="img" src="${item.url}" alt="card_image" />
        <div class="productInfo">
          <div class="productId">${item.userid}</div>
          <div class="productName">${item.name}</div>
        </div>
      </div>
      <div class="arrow">
        <span>&rarr;</span>
      </div>
    </a>
  `;
    productCardsContainer.appendChild(productCard);
  });
}
