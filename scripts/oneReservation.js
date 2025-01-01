async function fetchOneReservation(reservationId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/catways/reservations/${reservationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des réservations');
        }

        const reservation = await response.json();

        const reservationDetails = document.getElementById('reservationDetails');


        const catwayNb = document.createElement('p');
        const clientNm = document.createElement('p');
        const boatNm = document.createElement('p')
        const checkInDate = document.createElement('p')
        const checkOutDate = document.createElement('p')

        catwayNb.textContent = `Catway ${reservation.reservation.catwayNumber}`;
        clientNm.textContent = `Client : ${reservation.reservation.clientName}`;
        boatNm.textContent = `Bateau : ${reservation.reservation.boatName}`
        checkInDate.textContent = `Date d'arrivée : ${reservation.reservation.checkIn}`
        checkOutDate.textContent = `Date d'arrivée : ${reservation.reservation.checkOut}`

        

        reservationDetails.appendChild(catwayNb);
        reservationDetails.appendChild(clientNm);
        reservationDetails.appendChild(boatNm);
        reservationDetails.appendChild(checkInDate);
        reservationDetails.appendChild(checkOutDate);

    } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function () {
    const reservationId = getParameterByName('reservationId');
    fetchOneReservation(reservationId);
});