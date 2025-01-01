async function fetchCReservations() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/api/catways/reservations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des reservations");
    }

    const reservations = await response.json();

    const reservationsList = document.getElementById("reservationsList");

    reservations.reservations.forEach((reservation) => {
      const reservationId = reservation._id;
      const listItem = document.createElement("li");
      const reservationLink = document.createElement("a");
      reservationLink.textContent = `Catway ${reservation.catwayNumber}, Reservation n°${reservation._id}`;
      reservationLink.href = `/views/reservation_details.html?reservationId=${reservationId}`;

      listItem.appendChild(reservationLink);
      reservationsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des catways :", error);
  }
}

fetchCReservations();
