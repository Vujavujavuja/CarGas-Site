const express = require('express');

const {sequelize, Proizvod, Gorivo, Usluga, Narudzbina} = require('../models');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get('/', async (req, res) => {
    try{
        const goriva = await Gorivo.findAll();
        return res.json(goriva);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.get('/:id', async (req, res) => {
    try{
        const gorivo = await Gorivo.findByPk(req.params.id);
        return res.json(gorivo);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.post('/', async (req, res) => {
    try{
        const novoGorivo = await Gorivo.create(req.body);
        return res.json(novoGorivo);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.put('/:id', async (req, res) => {
    try{
        const gorivo = await Gorivo.findByPk(req.params.id);
        gorivo.naziv = req.body.naziv;
        gorivo.cena = req.body.cena;
        gorivo.save();
        return res.json(gorivo);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.delete('/:id', async (req, res) => {
    try{
        const gorivo = await Gorivo.findByPk(req.params.id);
        gorivo.destroy();
        return res.json({success: "Uspesno brisanje", data: gorivo});
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});