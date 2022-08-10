const html_users = document.querySelector(".users-list");

fetch("https://62f3b187a84d8c968129c2fb.mockapi.io/onios/users")
  .then((response) => response.json())
  .then((users_array) => {
    users_array.forEach((user_obj) => {
      html_users.insertAdjacentHTML(
        "afterbegin",
        `<li>
          <p>ID: ${user_obj.id}</p>
          <p>CreatedAt: ${user_obj.createdAt}</p>
          <p>Name: ${user_obj.name}</p>
          <img src="${user_obj.avatar}"/>
        </li>`
      );
    });
  });
