const api = `https://randomuser.me/api`;

const addUserBtn = document.getElementById("addUser-btn");
const sortAscBtn = document.getElementById("sort-desc");
const sortDescBtn = document.getElementById("sort-asc");

const userList = document.getElementById("list-of-user");
const searchBox = document.getElementById("searchBox");
const userDataArr = [];

addUserBtn.addEventListener("click", async function () {
  const fetchUserData = await fetch(api, {
    method: "GET"
  });
  const jsonUserData = await fetchUserData.json();
  //console.log(jsonUserData.results);
  const user = jsonUserData.results[0];
  userDataArr.push(user);
  renderDom(userDataArr);
});

searchBox.addEventListener("keyup", (e) => {
  const searchBoxData = searchBox.value;
  const filteredArr = userDataArr.filter(
    (userData) =>
      userData.name.first.toLowerCase().includes(searchBoxData.toLowerCase()) ||
      userData.gender.toLowerCase().includes(searchBoxData.toLowerCase()) ||
      userData.email.toLowerCase().includes(searchBoxData.toLowerCase()) ||
      userData.name.last.toLowerCase().includes(searchBoxData.toLowerCase())
  );

  renderDom(filteredArr);
});

sortAscBtn.addEventListener("click", sortDesc);

sortDescBtn.addEventListener("click", sortAsc);

function sortDesc() {
  const userDataArrCopy = [...userDataArr];

  userDataArrCopy.sort((a, b) => (a.name.first < b.name.first ? 1 : -1));

  renderDom(userDataArrCopy);
}

function sortAsc() {
  const userDataArrCopy = [...userDataArr];

  userDataArrCopy.sort((a, b) => (a.name.first < b.name.first ? -1 : 1));

  renderDom(userDataArrCopy);
}

const renderDom = (userDataArr) => {
  userList.innerHTML = null;
  userList.innerHTML = `<div id="heading">
      <span>Name</span>
      <span>Gender</span>
      <span>Email</span>
  </div>`;
  userDataArr.forEach((userData) => {
    userList.innerHTML += `<div class="userRow">
  <span id="userName">${userData.name.title.toUpperCase()}. ${userData.name.first.toUpperCase()} ${userData.name.last.toUpperCase()}</span> 
  <span id="userGender">${userData.gender.toUpperCase()}</span> 
  <span id="userEmail">${userData.email.toUpperCase()}</span>
  </div>`;
  });
};
