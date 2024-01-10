const express = require('express');
const {sequelize, Proizvod, Gorivo, Usluga, Narudzbina, NarudzbinaProizvod,NarudzbinaGorivo} = require('../models');
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
        console.log(req.params.id);
        const narudzbinaGorivo = [] = await NarudzbinaGorivo.findAll({where: {narudzbinaId: req.params.id}});

        return res.json(narudzbinaGorivo);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
})

route.post('/', async (req, res) => {
    try{
        const novaNarudzbinaGorivo = await NarudzbinaGorivo.create(req.body);
        return res.json(novaNarudzbinaGorivo);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.put('/:id', async (req, res) => {
    try{
        console.log(req.params.id);
        const narudzbinaGorivo = await NarudzbinaGorivo.findAll({where: {narudzbinaId: req.params.id}});
        narudzbinaGorivo.narudzbinaId = req.body.narudzbinaId;
        narudzbinaGorivo.proizvodId = req.body.proizvodId;
        narudzbinaGorivo.kolicina = req.body.kolicina;
        narudzbinaGorivo.save();
        return res.json(narudzbinaGorivo);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.delete('/:id', async (req, res) => {
    try{
        const narudzbinaGorivo = await NarudzbinaGorivo.findAll({where: {narudzbinaId: req.params.id}});
        for(let i=0;i<narudzbinaGorivo.length;i++){
            narudzbinaGorivo[i].destroy();
        }
        return res.json({success: "Uspesno brisanje", data: narudzbinaGorivo});
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});