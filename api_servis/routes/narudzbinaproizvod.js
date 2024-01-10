const express = require('express');
const {sequelize, Proizvod, Gorivo, Usluga, Narudzbina, NarudzbinaProizvod} = require('../models');
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
        const narudzbinaProizvod = [] = await NarudzbinaProizvod.findAll({where: {narudzbinaId: req.params.id}});

        return res.json(narudzbinaProizvod);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
})

route.post('/', async (req, res) => {
    try{
        const novaNarudzbinaProizvod = await NarudzbinaProizvod.create(req.body);
        return res.json(novaNarudzbinaProizvod);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.put('/:id', async (req, res) => {
    try{
        console.log(req.params.id);
        const narudzbinaProizvod = await NarudzbinaProizvod.findAll({where: {narudzbinaId: req.params.id}});
        narudzbinaProizvod.narudzbinaId = req.body.narudzbinaId;
        narudzbinaProizvod.proizvodId = req.body.proizvodId;
        narudzbinaProizvod.kolicina = req.body.kolicina;
        narudzbinaProizvod.save();
        return res.json(narudzbinaProizvod);
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});

route.delete('/:id', async (req, res) => {
    try{
        const narudzbinaProizvod = await NarudzbinaProizvod.findAll({where: {narudzbinaId: req.params.id}});
        for(let i=0;i<narudzbinaProizvod.length;i++){
            narudzbinaProizvod[i].destroy();
        }
        return res.json({success: "Uspesno brisanje", data: narudzbinaProizvod});
    }catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err})
    }
});