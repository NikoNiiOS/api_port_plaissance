document.getElementById('createCatway').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/api/catways', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                catwayNumber: formData.get('catwayNumber'),
                type: formData.get('type'),
                catwayState: formData.get('catwayState')
            })
        });

        if (response.ok) {
            location.reload();
            alert('Catway ajouté')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});


document.getElementById('updateCatway').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/api/catways/${formData.get('catwayNumber')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                _id: formData.get('catwayNumber'),
                catwayNumber: formData.get('catwayNumber'),
                type: formData.get('type'),
                catwayState: formData.get('catwayState')
            })
        });

        if (response.ok) {
            location.reload();
            alert('Catway mis à jour')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});


document.getElementById('deleteCatway').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/api/catways/${formData.get('catwayNumber')}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            location.reload()
            alert('Catway supprimé')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});


document.getElementById('createUser').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        if (response.ok) {
            location.reload();
            alert('Utilisateur ajouté')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});

document.getElementById('updateUser').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/user/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const users = await response.json();

        const user = users.users.find(user => user.name === formData.get('name'));

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        const userId = user._id;

        const updateResponse = await fetch(`http://localhost:3000/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
            })
        });

        if (updateResponse.ok) {
            location.reload();
            alert('Utilisateur mis à jour')
        } else {
            const errorMessage = await updateResponse.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});

document.getElementById('deleteUser').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/user/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
    }
    const users = await response.json();

    const user = users.users.find(user => user.name === formData.get('name'));

    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    const userId = user._id;

    try {
        

        const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            location.reload()
            alert('Utilisateur supprimé')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});

async function fetchCatwaysAndPopulateSelect() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/catways', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catways');
        }

        const catways = await response.json();
        const selectElement = document.getElementById('catwayNumberSelect');

        catways.forEach(catway => {
            const option = document.createElement('option');
            option.value = catway.catwayNumber;
            option.textContent = catway.catwayNumber;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des catways:', error);
    }
}

fetchCatwaysAndPopulateSelect();

async function fetchUsersAndPopulateSelect() {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }

        const users = await response.json();
        const selectElement = document.getElementById('clientNameSelect');

        users.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.name;
            option.textContent = user.name;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
}

fetchUsersAndPopulateSelect();

document.getElementById('createReservation').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/api/catways/catwayNumber/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                catwayNumber: formData.get('catwayNumber'),
                clientName: formData.get('clientName'),
                boatName: formData.get('boatName'),
                checkIn: formData.get('checkInDate'),
                checkOut: formData.get('checkOutDate')
            })
        });

        if (response.ok) {
            location.reload();
            alert('Réservation ajoutée')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});

document.getElementById('deleteReservation').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData(event.target); 

    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/api/catways/reservations/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des réservations');
    }
    const reservations = await response.json();

    
    const reservation = reservations.reservations.find(reservation => reservation._id === formData.get('number'));

    if (!reservation) {
        throw new Error('Réservation non trouvée');
    }

    const reservationId = reservation._id;
    const catwayId = reservation.catwayNumber

    try {
        const response = await fetch(`http://localhost:3000/api/catways/${catwayId}/reservations/${reservationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            location.reload()
            alert('Réservation supprimée')
        } else {
            const errorMessage = await response.text();
            alert(errorMessage); 
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});