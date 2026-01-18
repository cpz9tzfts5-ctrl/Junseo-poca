// ===== 포카 데이터 =====
const albumCards = [
  { id: "album1", name: "EUPHORIA Ver.1", img: "images/album1.jpg" },
  { id: "album2", name: "EUPHORIA Ver.2", img: "images/album2.jpg" },
  { id: "album3", name: "EUPHORIA Ver.3", img: "images/album3.jpg" }
];

const eventCards = [
  { id: "event1", name: "미공포 1", img: "images/event1.jpg" },
  { id: "event2", name: "미공포 2", img: "images/event2.jpg" }
];

// ===== 저장 불러오기 =====
let owned = JSON.parse(localStorage.getItem("ownedCards")) || [];

// ===== 렌더 함수 =====
function renderCards(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  list.forEach(card => {
    const div = document.createElement("div");
    div.className = "card" + (owned.includes(card.id) ? "" : " locked");

    div.innerHTML = `
      <img src="${card.img}" alt="${card.name}">
      <div class="card-name">${card.name}</div>
    `;

    div.onclick = () => toggleCard(card.id);
    container.appendChild(div);
  });
}

// ===== 체크 토글 =====
function toggleCard(id) {
  if (owned.includes(id)) {
    owned = owned.filter(c => c !== id);
  } else {
    owned.push(id);
  }
  localStorage.setItem("ownedCards", JSON.stringify(owned));
  update();
}

// ===== 카운트 =====
function updateCounter() {
  const total = albumCards.length + eventCards.length;
  document.getElementById("counter").innerText =
    `보유 ${owned.length} / ${total}`;
}

// ===== 전체 업데이트 =====
function update() {
  renderCards(albumCards, "albumCards");
  renderCards(eventCards, "eventCards");
  updateCounter();
}

update();
