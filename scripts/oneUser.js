async function fetchOneUser(userId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }

    const user = await response.json();

    const userDetails = document.getElementById("userDetails");

    const details = document.createElement("p");
    details.textContent = `Nom: ${user.user.name} - Mail: ${user.user.email}`;

    userDetails.appendChild(details);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.addEventListener("DOMContentLoaded", function () {
  const userId = getParameterByName("userId");
  fetchOneUser(userId);
});

document.addEventListener("DOMContentLoaded", async function () {
  const userId = getParameterByName("userId");

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des détails de l'utilisateur"
      );
    }

    const user = await response.json();

    document.getElementById("name").value = user.user.name;
    document.getElementById("email").value = user.user.email;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'utilisateur :",
      error
    );
  }
});

document
  .getElementById("updateUser")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = getParameterByName("userId");
    const formData = new FormData(event.target);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
        }),
      });

      if (response.ok) {
        location.reload();
        alert("Utilisateur mis à jour");
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

document
  .getElementById("deleteUser")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = getParameterByName("userId");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.location.href = "/views/users.html";
        alert("Utilisateur supprimé");
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
