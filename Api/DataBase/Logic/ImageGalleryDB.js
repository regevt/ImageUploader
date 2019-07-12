const mongoose = require("mongoose");

let imageModelSchema = new mongoose.Schema({
    imageUrl : {type: String},
    imageName : {type: String},
});

const imageModel = mongoose.model("ImageGallery", imageModelSchema);

exports.GetImages = async () => {
    return await imageModel.find({}).limit(20).exec();
}

exports.GetImageById = async (id) => {
    return await imageModel.findOne({_id: id}).exec();
}

exports.PutImage = (url,name) => {
    let image = new imageModel({imageUrl: url, imageName: name});
    image.save(err => {
        if (err) return err;
        return image;
    });
}