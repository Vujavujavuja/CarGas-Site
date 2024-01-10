const express = require('express');

const {sequelize, Proizvod, Gorivo, Usluga, Narudzbina} = require('../models');


const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get('/', async (req, res) => {
    try{
        const usluge = await Usluga.findAll();
        return res.json(usluge);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.get('/:id', async (req, res) => {
    try{
        const usluga = await Usluga.findByPk(req.params.id );
        return res.json(usluga);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.post('/', async (req, res) => {
    try{
        const novaUsluga = await Usluga.create(req.body);
        return res.json(novaUsluga);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.put('/:id', async (req, res) => {
    try{
        const usluga = await Usluga.findByPk(req.params.id);
        usluga.naziv = req.body.naziv;
        usluga.opis = req.body.opis;
        usluga.cena = req.body.cena;
        usluga.tip_cene = req.body.tip_cene;
        usluga.save();
        return res.json(usluga);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.delete('/:id', async (req, res) => {
    try{
        const usluga = await Usluga.findByPk(req.params.id);
        usluga.destroy();
        return res.json(usluga);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});