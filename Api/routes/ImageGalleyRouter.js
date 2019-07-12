const express = require("express");
const router = express.Router();

const imageGalleryDB = require('../DataBase/Logic/ImageGalleryDB');

router.get('/',(req,res, next) => {
    imageGalleryDB.GetImages().then(images => {
        res.status(200).header('Access-Control-Allow-Origin', '*').json(images);
    }).catch(err => {
        res.status(500).header('Access-Control-Allow-Origin', '*').json({ErrorMsg: 'internal db error', Error: err});
    });
});

router.get('/:id',(req,res, next) => {
    imageGalleryDB.GetImageById(req.params.id).then(image => {
        res.status(200).header('Access-Control-Allow-Origin', '*').json(image);
    }).catch(err => {
        res.status(500).header('Access-Control-Allow-Origin', '*').json({ErrorMsg: 'internal db error', Error: err});
    });
});

router.post('/',(req,res, next) => {
    imageGalleryDB.PutImage(req.file.filename,req.file.originalname);
    res.status(200).header('Access-Control-Allow-Origin', '*').send();
});

module.exports = router;