async function fetchUsers() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catways");
    }

    const users = await response.json();

    const userList = document.getElementById("userList");

    users.users.forEach((user) => {
      const listItem = document.createElement("li");
      const userLink = document.createElement("a");
      userLink.textContent = `${user.name}`;
      userLink.href = `../views/user_details.html?userId=${user._id}`;

      listItem.appendChild(userLink);
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utlisateurs :", error);
  }
}

fetchUsers();

document
  .getElementById("createUser")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (response.ok) {
        location.reload();
        alert("Utilisateur ajouté");
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert(
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard."
      );
    }
  });
