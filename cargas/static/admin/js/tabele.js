window.addEventListener("load", function() {
    updateTableWithNarudzbina();
    updateTableWithNarudzbinaD();
    fetch('http://localhost:9001/gorivo/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('gorivaList');
            data.forEach(item => {
                let row = `<tr>
                            <td>${item.id}</td>
                          <td>${item.naziv}</td>
                          <td>${item.oznaka}</td>
                          <td>${item.cena}</td>
                       </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    fetch('http://localhost:9001/usluga/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('uslugeList');
            data.forEach(item => {
                let row = `<tr>
                            <td>${item.id}</td>  
                          <td>${item.naziv}</td>
                          <td>${item.opis}</td>
                          <td>${item.cena}</td>
                          <td>${item.tip_cene}</td>
                       </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    fetch('http://localhost:9001/proizvod/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('proizvodiList');
            data.forEach(item => {
                let row = `<tr>
                          <td>${item.id}</td>
                          <td>${item.naziv}</td>
                          <td>${item.tip}</td> 
                          <td>${item.opis}</td>
                          <td>${item.cena}</td>
                         
                       </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    fetch('http://localhost:9001/gorivo/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('gorivaListEditable');
            data.forEach(item => {
                let row = `<tr>
                            <td>${item.id}</td>
                          <td>${item.naziv}</td>
                          <td>${item.oznaka}</td>
                          <td>${item.cena}</td>
                          <td>
                            <button class="btn-change" onclick="window.location.href='edit-g.html?id=${encodeURIComponent(item.id)}&naziv=${encodeURIComponent(item.naziv)}&oznaka=${encodeURIComponent(item.oznaka)}&cena=${encodeURIComponent(item.cena)}'">Izmeni</button>
                            <button class="btn-delete" onclick="deleteItemG('${item.id}', this)">Obrisi</button>
                          </td>
                       </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    fetch('http://localhost:9001/usluga/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('uslugeListEditable');
            data.forEach(item => {
                let row = `<tr>
                          <td>${item.id}</td>
                          <td>${item.naziv}</td>
                          <td>${item.opis}</td>
                          <td>${item.cena}</td>
                          <td>${item.tip_cene}</td>
                          <td>
                            <button class="btn-change" onclick="window.location.href='edit_u.html?id=${encodeURIComponent(item.id)}&naziv=${encodeURIComponent(item.naziv)}&opis=${encodeURIComponent(item.opis)}&cena=${encodeURIComponent(item.cena)}&tip_cene=${encodeURIComponent(item.tip_cene)}'">Izmeni</button>
                            <button class="btn-delete" onclick="deleteItemU'${item.id}', this)">Obrisi</button>
                          </td>
                       </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    fetch('http://localhost:9001/proizvod/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('proizvodiListEditable');
            data.forEach(item => {
                let row = `<tr>
                          <td>${item.id}</td>
                          <td>${item.naziv}</td>
                          <td>${item.tip}</td>
                          <td>${item.opis}</td>
                          <td>${item.cena}</td>
                     
                          <td>
                            <button class="btn-change" onclick="window.location.href='edit_p.html?id=${encodeURIComponent(item.id)}&naziv=${encodeURIComponent(item.naziv)}&tip=${encodeURIComponent(item.tip)}&opis=${encodeURIComponent(item.opis)}&cena=${encodeURIComponent(item.cena)}'">Izmeni</button>
                            <button class="btn-delete" onclick="deleteItemP('${item.id}', this)">Obrisi</button>
                          </td>
                       </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    async function updateTableWithNarudzbina() {
        try {
            const response = await fetch('http://localhost:9001/narudzbina/');
            const data = await response.json();
            const tableBody = document.getElementById('narudzbineList');

            for (const item of data) {
                const gorivaString = await getGoriva(item.id);
                const uslugaString = await getUsluge(item.id);
                const proizvodiString = await getProizvodi(item.id);
                const kolicinaGoriva = calculateTotalPrice(gorivaString);
                const kolicinaProizvodi = calculateTotalPriceP(proizvodiString);
                const kolicinaUsluge = await getKolicinaUsluge(item.id);
                const kolicinaUslugeNumber = parseFloat(kolicinaUsluge);
                const totalCena=  kolicinaGoriva + kolicinaProizvodi + kolicinaUslugeNumber;
                let row = `<tr>
                        <td>${item.id}</td>
                        <td>${gorivaString.join(", ")}</td>
                        <td>${uslugaString}</td>
                        <td>${proizvodiString.join(", ")}</td>
                        <td>${totalCena}</td>
                       </tr>`;
                tableBody.innerHTML += row;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function updateTableWithNarudzbinaD() {
        try {
            const response = await fetch('http://localhost:9001/narudzbina/');
            const data = await response.json();
            const tableBody = document.getElementById('narudzbineListDelete');

            for (const item of data) {
                const gorivaString = await getGoriva(item.id);
                const uslugaString = await getUsluge(item.id);
                const proizvodiString = await getProizvodi(item.id);
                const kolicinaGoriva = calculateTotalPrice(gorivaString);
                const kolicinaProizvodi = calculateTotalPriceP(proizvodiString);
                const kolicinaUsluge = await getKolicinaUsluge(item.id);
                const kolicinaUslugeNumber = parseFloat(kolicinaUsluge);
                const totalCena=  kolicinaGoriva + kolicinaProizvodi + kolicinaUslugeNumber;
                let row = `<tr>
                        <td>${item.id}</td>
                        <td>${gorivaString.join(", ")}</td>
                        <td>${uslugaString}</td>
                        <td>${proizvodiString.join(", ")}</td>
                        <td>${totalCena}</td>
                       </tr>`;
                tableBody.innerHTML += row;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }



    function calculateTotalPrice(str) {
        const regex = /(\w+)\((\d+) RSD\) \((\d+) l\)/g;
        let match;
        let totalPrice = 0;

        while ((match = regex.exec(str)) !== null) {
            const price = parseInt(match[2]);
            const quantity = parseInt(match[3]);
            totalPrice += price * quantity;
        }

        return totalPrice;
    }
    function calculateTotalPriceP(str) {
        // Regular expression to find all occurrences of item type, price, and quantity with 'kom' unit
        const regex = /(\w+)\((\d+) RSD\) \((\d+)kom\)/g;
        let match;
        let totalPrice = 0;

        // Loop through all matches in the string
        while ((match = regex.exec(str)) !== null) {
            const price = parseInt(match[2], 10);
            const quantity = parseInt(match[3], 10);
            totalPrice += price * quantity;
        }

        return totalPrice;
    }


    function getUsluge(id) {
        return fetch(`http://localhost:9001/usluga/` + id)
            .then(response => response.json())
            .then(data => `${data.naziv}`)
            .catch(error => {
                console.error('Error:', error);
                return '';
            });
    }

    function getKolicinaUsluge(id){
        return fetch(`http://localhost:9001/usluga/` + id)
            .then(response => response.json())
            .then(data => `${data.cena}`)
            .catch(error => {
                console.error('Error:', error);
                return '';
            });
    }

    function getKolicinaProizvodi(id) {
        return fetch(`http://localhost:9001/narudzbinaproizvod/` + id)
            .then(response => response.json())
            .then(data => {
                const totalKolicina = data.reduce((sum, item) => sum + item.kolicina, 0);
                return totalKolicina;
            })
            .catch(error => {
                console.error('Error:', error);
                return 0;
            });
    }


    function getSimpleProizvodi(id) {
        return fetch(`http://localhost:9001/proizvod/` + id)
            .then(response => response.json())
            .then(data => `${data.naziv}` + `(${data.cena} RSD)`)
            .catch(error => {
                console.error('Error:', error);
                return '';
            });
    }
    function getSimpleGoriva(id) {
        return fetch(`http://localhost:9001/gorivo/` + id)
            .then(response => response.json())
            .then(data => `${data.naziv}` + `(${data.cena} RSD)`)
            .catch(error => {
                console.error('Error:', error);
                return '';
            });
    }
    function getProizvodi(id) {
        return fetch(`http://localhost:9001/narudzbinaproizvod/` + id)
            .then(response => response.json())
            .then(data => Promise.all(data.map(item =>
                getSimpleProizvodi(item.proizvodId).then(proizvod =>
                    `${proizvod} (${item.kolicina}kom)`
                ))
            ))
            .catch(error => {
                console.error('Error:', error);
                return [];
            });
    }
    function getGoriva(id) {
        return fetch(`http://localhost:9001/narudzbinagorivo/` + id)
            .then(response => response.json())
            .then(data => Promise.all(data.map(item =>
                getSimpleGoriva(item.gorivoId).then(gorivo =>
                    `${gorivo} (${item.kolicina} l)`
                ))
            ))
            .catch(error => {
                console.error('Error:', error);
                return [];
            });
    }


    function getKolicinaGoriva(id) {
        return fetch(`http://localhost:9001/narudzbinagorivo/` + id)
            .then(response => response.json())
            .then(data => {
                const totalKolicina = data.reduce((sum, item) => sum + item.kolicina, 0);
                return totalKolicina;
            })
            .catch(error => {
                console.error('Error:', error);
                return 0;
            });
    }






});

deleteItemP = function(id, button) {
    fetch(`/deleteproizvod`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            button.parentElement.parentElement.remove();
        })
        .catch(error => console.error('Error:', error));
}
deleteItemG = function(id, button) {
    fetch(`/deletegorivo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            button.parentElement.parentElement.remove();
        })
        .catch(error => console.error('Error:', error));
}
deleteItemU = function(id, button) {
    fetch(`/deleteusluga`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            button.parentElement.parentElement.remove();
        })
        .catch(error => console.error('Error:', error));
}
