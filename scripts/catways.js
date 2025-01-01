async function fetchCatways() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/catways", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catways");
    }

    const catways = await response.json();

    const catwayList = document.getElementById("catwayList");

    catways.forEach((catway) => {
      const catwayId = catway._id;
      const listItem = document.createElement("li");
      const catwayLink = document.createElement("a");
      catwayLink.textContent = `Catway ${catway.catwayNumber}`;
      catwayLink.href = `/views/catway_detail.html?catwayId=${catway._id}`;

      listItem.appendChild(catwayLink);
      catwayList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catways :", error);
  }
}

fetchCatways();
