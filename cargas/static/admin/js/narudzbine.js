window.addEventListener("load", function() {
    loadData();
    setupEventListeners();
});


function loadData() {
    fetch('http://localhost:9001/gorivo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            populateSelect('goriva', data);
        })
        .catch(error => console.error('Error loading goriva:', error));

    fetch('http://localhost:9001/usluga')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Usluge data:", data);
            populateSelect('usluge', data);
        })
        .catch(error => console.error('Error loading usluge:', error));

    fetch('http://localhost:9001/proizvod')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Proizvodi data:", data);
            populateSelect('proizvodi', data);
        })
        .catch(error => console.error('Error loading proizvodi:', error));
}

function populateSelect(elementId, data) {
    const select = document.getElementById(elementId);
    // Add a 'None' option
    const noneOption = document.createElement('option');
    noneOption.value = "none";
    noneOption.textContent = "None";
    select.appendChild(noneOption);

    // Populate other options
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = JSON.stringify(item); // Store the entire item as a JSON string
        option.textContent = item.naziv;
        select.appendChild(option);
    });

    select.addEventListener('change', calculateTotal);
}

function setupEventListeners() {
    document.getElementById('addGorivo').addEventListener('click', function() {

        const gorivoSelect = document.getElementById('goriva');
        const kolicinaGoriva = parseFloat(document.getElementById('kolicina-goriva').value) || 0;
        const selectedGorivo = gorivoSelect.options[gorivoSelect.selectedIndex].value;

        if (selectedGorivo !== "none") {
            const gorivoData = JSON.parse(selectedGorivo);
            selectedGoriva.push({
                id: gorivoData.id,
                naziv: gorivoData.naziv,
                cena: gorivoData.cena,
                kolicina: kolicinaGoriva
            });
        }

        calculateTotal();
        displaySelectedItems('gorivaList', selectedGoriva)
    });

    document.getElementById('addUsluga').addEventListener('click', function() {
        const uslugaSelect = document.getElementById('usluge');
        const selectedUsluga = uslugaSelect.options[uslugaSelect.selectedIndex].value;

        if (selectedUsluga !== "none") {
            const uslugaData = JSON.parse(selectedUsluga);
            selectedUsluge.push({
                id: uslugaData.id,
                naziv: uslugaData.naziv,
                cena: uslugaData.cena
            });
        }
        console.log("Selected Usluge:", selectedUsluge);
        calculateTotal();
        displaySelectedItems('uslugeList', selectedUsluge)
    });

    document.getElementById('addProizvod').addEventListener('click', function() {
        const proizvodSelect = document.getElementById('proizvodi');
        const kolicinaProizvoda = parseFloat(document.getElementById('kolicina-proizvoda').value) || 0;
        const selectedProizvod = proizvodSelect.options[proizvodSelect.selectedIndex].value;

        if (selectedProizvod !== "none") {
            const proizvodData = JSON.parse(selectedProizvod);
            selectedProizvodi.push({
                id: proizvodData.id,
                naziv: proizvodData.naziv,
                cena: proizvodData.cena,
                kolicina: kolicinaProizvoda
            });
        }
        console.log("Selected Proizvodi:", selectedProizvodi);
        calculateTotal();
        displaySelectedItems('proizvodiList', selectedProizvodi);
    });

    document.getElementById('addForm').addEventListener('submit', function(event) {
        event.preventDefault();



        const formData = {
            idN: parseInt(document.getElementById('idN').value),
            goriva: selectedGoriva,
            usluge: selectedUsluge,
            proizvodi: selectedProizvodi,
            total_cena: parseFloat(document.getElementById('totalPrice').textContent)
        };


        fetch('/addnarudzbina', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                window.location.href = "narudzbine.html";
            })
            .catch(error => console.error('Error:', error));

    });
}

function displaySelectedItems(elementId, items) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear previous items
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = item.naziv + (item.kolicina ? ` x ${item.kolicina}` : '');
        container.appendChild(itemElement);
    });
}


function calculateTotal() {
    let total = 0;
    selectedGoriva.forEach(item => {
        total += item.cena * item.kolicina;
    });
    selectedProizvodi.forEach(item => {
        total += item.cena * item.kolicina;
    });
    selectedUsluge.forEach(item => {
        total += item.cena;
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

let selectedGoriva = [];
let selectedUsluge = [];
let selectedProizvodi = [];

