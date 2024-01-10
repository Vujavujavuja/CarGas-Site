const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Joi = require('joi');
const fs = require('fs');

const app = express();

// Serve static files
app.use('/admin', express.static(path.join(__dirname, 'static', 'admin')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Body parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin', 'index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'admin', 'contact.html'));
});

app.get('/addgorivo', (req, res) => {
    res.sendFile(path.join(__dirname, 'goriva.json'));
});


app.post('/contact', (req, res) => {

    const contactSchema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        contactReason: Joi.string().required(),
        message: Joi.string().min(3).required()
    });

    const { error, value } = contactSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    if (value.message) {
        value.message = value.message.replace(/\r?\n|\r/g, '<br>');
    }

    fs.readFile("contact_requests.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Došlo je do greške pri čitanju fajla.");
            return;
        }

        let requests = [];
        try {
            requests = JSON.parse(data);
        } catch (parseErr) {
            console.error(parseErr);
        }

        requests.push(value);

        fs.writeFile("contact_requests.json", JSON.stringify(requests, null, 2), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                res.status(500).send("Došlo je do greške pri upisu u fajl.");
                return;
            }
            res.send("Poruka je poslana, očekujte odgovor uskoro");
        });
    });
});
app.post('/addgorivo', (req, res) => {

    const gorivoSchema = Joi.object({
        naziv: Joi.string().required(),
        oznaka: Joi.string().required(),
        cena: Joi.number().required(),
    });

    const { error, value } = gorivoSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    if (value.message) {
        value.message = value.message.replace(/\r?\n|\r/g, '<br>');
    }

    fetch('http://localhost:9001/gorivo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "static/admin/more.html";
        })
        .catch(error => console.error('Error:', error));


});
app.get('/addusluga', (req, res) => {
    res.sendFile(path.join(__dirname, 'usluge.json'));
});
app.post('/addusluga', (req, res) => {

    const uslugaSchema = Joi.object({
        naziv: Joi.string().required(),
        opis: Joi.string().required(),
        cena: Joi.number().required(),
        tip_cene: Joi.string().required(),
    });

    const { error, value } = uslugaSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    if (value.message) {
        value.message = value.message.replace(/\r?\n|\r/g, '<br>');
    }

    fetch('http://localhost:9001/usluga/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "static/admin/more.html";
        })
        .catch(error => console.error('Error:', error));
});
app.get('/addproizvod', (req, res) => {
    res.sendFile(path.join(__dirname, 'proizvodi.json'));
});
app.post('/addproizvod', (req, res) => {

    const uslugaSchema = Joi.object({
        naziv: Joi.string().required(),
        tip: Joi.string().required(),
        opis: Joi.string().required(),
        cena: Joi.number().required()
    });

    const { error, value } = uslugaSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    if (value.message) {
        value.message = value.message.replace(/\r?\n|\r/g, '<br>');
    }

    fetch('http://localhost:9001/proizvod/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "static/admin/more.html";
        })
        .catch(error => console.error('Error:', error));
});

app.post('/editgorivo', (req, res) => {
    const gorivoSchema = Joi.object({
        id: Joi.number().required(),
        naziv: Joi.string().required(),
        oznaka: Joi.string().required(),
        cena: Joi.number().required(),
    });

    const { error, value } = gorivoSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    fetch('http://localhost:9001/gorivo/' + value.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "static/admin/more.html";
        })
        .catch(error => console.error('Error:', error));
});
app.post('/editusluga', (req, res) => {
    const uslugaSchema = Joi.object({
        id: Joi.number().required(),
        naziv: Joi.string().required(),
        opis: Joi.string().required(),
        cena: Joi.number().required(),
        tip_cene: Joi.string().required(),
    });

    const {error, value} = uslugaSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    fetch('http://localhost:9001/usluga/' + value.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "more.html";
        })
        .catch(error => console.error('Error:', error));
});

app.post('/editproizvod', (req, res) => {
    const proizvodSchema = Joi.object({
        id: Joi.number().required(),
        naziv: Joi.string().required(),
        tip: Joi.string().required(),
        opis: Joi.string().required(),
        cena: Joi.number().required(),
    });

    const {error, value} = proizvodSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    fetch('http://localhost:9001/proizvod/' + value.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "more.html";
        })
        .catch(error => console.error('Error:', error));
});

app.post('/deleteproizvod', (req, res) => {
    const proizvodSchema = Joi.object({
        id: Joi.number().required()
    });

    const {error, value} = proizvodSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }
    console.log(value.id);
    fetch('http://localhost:9001/proizvod/' + value.id, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "more.html";
        })
        .catch(error => console.error('Error:', error));
});
app.post('/deletegorivo', (req, res) => {
    const proizvodSchema = Joi.object({
        id: Joi.number().required()
    });

    const {error, value} = proizvodSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }
    console.log(value.id);
    fetch('http://localhost:9001/gorivo/' + value.id, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "more.html";
        })
        .catch(error => console.error('Error:', error));
});
app.post('/deleteusluga', (req, res) => {
    const proizvodSchema = Joi.object({
        id: Joi.number().required()
    });

    const {error, value} = proizvodSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }
    console.log(value.id);
    fetch('http://localhost:9001/usluga/' + value.id, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            location.href = "more.html";
        })
        .catch(error => console.error('Error:', error));
});
app.post('/deletenarudzbina', (req, res) => {
    const deleteSchema= Joi.object({
        id: Joi.number().required()
    });

    const {error, value} = deleteSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    console.log(value.id)
    fetch('http://localhost:9001/narudzbinaproizvod/' + value.id, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

        })
        .catch(error => console.error('Error:', error));
    fetch('http://localhost:9001/narudzbinagorivo/' + value.id, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

        })
        .catch(error => console.error('Error:', error));
    fetch('http://localhost:9001/narudzbina/' + value.id, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

        })
        .catch(error => console.error('Error:', error));

});
app.get('/addnarudzbina', (req, res) => {
    res.sendFile(path.join(__dirname, 'narudzbine.json'));
});
app.post('/addnarudzbina', (req, res) => {
    console.log(req.body);

    let uslugaId;
    for(const usluga of req.body.usluge){
        uslugaId = usluga.id;
    }

    const jsonNarudzbina = {
        id: req.body.idN,
        total_cena: req.body.total_cena,
        uslugaId: uslugaId

    }
    console.log(jsonNarudzbina);


    const narudzbinaSchema = Joi.object({
        id: Joi.number().required(),
        total_cena: Joi.number().required(),
        uslugaId: Joi.number().required(),
    });

    const { error, value1 } = narudzbinaSchema.validate(jsonNarudzbina);

    if (error) {
        return res.status(400).send("Greska: " + error.details[0].message);
    }

    fetch('http://localhost:9001/narudzbina/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value1)
    })
        .then(narudzbinaResponse => {
            if (!narudzbinaResponse.ok) {
                throw new Error('Failed to create narudzbina');
            }

            const arrayJsonGori = req.body.goriva.map(gorivo => ({
                narudzbinaId: req.body.idN,
                gorivoId: gorivo.id,
                kolicina: gorivo.kolicina
            }));

            return Promise.all(arrayJsonGori.map(gori =>
                fetch('http://localhost:9001/narudzbinagorivo/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(gori)
                })
            ));
        })
        .then(responses => {
            for (const response of responses) {
                if (!response.ok) {
                    throw new Error('Failed to create narudzbinagorivo');
                }
            }

            const arrayJsonProi = req.body.proizvodi.map(proizvod => ({
                narudzbinaId: req.body.idN,
                proizvodId: proizvod.id,
                kolicina: proizvod.kolicina
            }));

            return Promise.all(arrayJsonProi.map(proi =>
                fetch('http://localhost:9001/narudzbinaproizvod/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(proi)
                })
            ));
        })
        .then(finalResponses => {
            for (const response of finalResponses) {
                if (!response.ok) {
                    throw new Error('Failed to create narudzbinaproizvod');
                }
            }

            res.status(200).send("Narudzbina added successfully");
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send("Error processing request");
        });
    window.location.href = "narudzbine.html";
});


fetch('http://localhost:9001/test')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// Start the server
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
