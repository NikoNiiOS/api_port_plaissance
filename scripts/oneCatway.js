async function fetchOneCatway(catwayId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/catways/${catwayId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catways');
        }

        const catway = await response.json();

        const catwayDetails = document.getElementById('catwayDetails');


        const details = document.createElement('p');
        details.textContent = `Catway ${catway.catway.catwayNumber} - Type: ${catway.catway.type} -  État: ${catway.catway.catwayState ? 'Libre' : 'Occupé'}`;

        catwayDetails.appendChild(details);

    } catch (error) {
        console.error('Erreur lors de la récupération des catways :', error);
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
    const catwayId = getParameterByName('catwayId');
    fetchOneCatway(catwayId);
});

document.addEventListener('DOMContentLoaded', async function () {
    const catwayId = getParameterByName('catwayId');

    try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await fetch(`http://localhost:3000/api/catways/${catwayId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des détails du catway');
        }

        const catway = await response.json();

        document.getElementById('catwayNumber').value = catway.catway.catwayNumber;
        document.getElementById('type').value = catway.catway.type;
        document.getElementById('catwayState').value = catway.catway.catwayState;

    } catch (error) {
        console.error('Erreur lors de la récupération des détails du catway :', error);
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

    const catwayId = getParameterByName('catwayId');

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/catways/${catwayId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            window.location.href = '/views/catways.html';
            alert('Catway supprimé')
        } else {
            const errorMessage = await response.text();
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
});