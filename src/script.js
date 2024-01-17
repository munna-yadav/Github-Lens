function getUserInfo() {
  const userName = document.getElementById("search-box").value;

  if (!userName) {
    alert("invalid username");
    return;
  }
  const apiUrl = "https://api.github.com/users/" + userName;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      displayUserInfo(data);
    })
    .catch((error) => {
      console.error("Error fetching GitHub user data:", error.message);
      alert(
        "Error fetching GitHub user data. Please check the username and try again."
      );
    });
}
function displayUserInfo(user) {
  console.log(user);
  document.getElementById("username").innerText = `${user.name}`;
  const favicon = document.getElementById("favicon");
  favicon.href = user.avatar_url;

  const userInfoDiv = document.getElementById("userInfo");
  userInfoDiv.innerHTML = `
        <img src=${user.avatar_url}>
        <h2>${user.login}</h2>
        <p>Name: ${user.name || "Not available"}</p>
        <p>Location: ${user.location || "Not available"}</p>
        <p>Public Repositories: ${user.public_repos}</p>
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
        <p>Profile URL: <a href="${user.html_url}" target="_blank"> ${
    user.html_url
  } </a> </p>
        <p>Repo URL: <a href="${
          user.html_url + "?tab=repositories"
        }" target="_blank">${user.html_url + "?tab=repositories"}</a></p>
      `;
}
