const express = require('express');

const {sequelize, Proizvod, Gorivo, Usluga, Narudzbina} = require('../models');


const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get('/', async (req, res) => {
    try{
        const proizvodi = await Proizvod.findAll();
        return res.json(proizvodi);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.get('/:id', async (req, res) => {
    try{
        const proizvod = await Proizvod.findByPk(req.params.id);
        return res.json(proizvod);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.post('/', async (req, res) => {
    try{
        const noviProizvod = await Proizvod.create(req.body);
        return res.json(noviProizvod);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.put('/:id', async (req, res) => {
    try{
        const proizvod = await Proizvod.findByPk(req.params.id);
        proizvod.naziv = req.body.naziv;
        proizvod.tip = req.body.tip;
        proizvod.opis = req.body.opis;
        proizvod.cena = req.body.cena;
        proizvod.save();
        return res.json(proizvod);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.delete('/:id', async (req, res) => {
    try{
        const proizvod = await Proizvod.findByPk(req.params.id);
        await proizvod.destroy();
        return res.json(proizvod);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});