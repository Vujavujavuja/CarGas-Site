const express = require('express');

const {sequelize, Proizvod, Gorivo, Usluga, Narudzbina, NarudzbinaGorivo, NarudzbinaProizvod} = require('../models');


const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

route.get('/', async (req, res) => {
    try{
        const narudzbine = await Narudzbina.findAll();
        return res.json(narudzbine);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.get('/:id', async (req, res) => {
    try{
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        return res.json(narudzbina);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.post('/', async (req, res) => {
    try{
        const novaNarudzbina = await Narudzbina.create(req.body);
        return res.json(novaNarudzbina);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.put('/:id', async (req, res) => {
    try{
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        narudzbina.goriva = req.body.goriva;
        narudzbina.usluge = req.body.usluge;
        narudzbina.proizvodi = req.body.proizvodi;
        narudzbina.totalPrice = req.body.totalPrice;
        narudzbina.save();
        return res.json(narudzbina);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.delete('/:id', async (req, res) => {
    try{
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        narudzbina.destroy();
        return res.json({success: "Uspesno brisanje", data: narudzbina});
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});