const db = require("../models");
const Tutorial = db.tutorials;


//create and save a new tutorial
exports.create = (req,res) =>{
    // let 's validate the request
    if(!req.body.title){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }

    //create a tuto
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial"
            })
        })
};



//get all tutorials
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? {title : { $regex : new RegExp(title), $options: "i"}}: {};

    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving tutorials"
            })
        })
}


// get tutorial by id :
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data =>{
            if(!data)
                res.status(400).send({message:"Not found if :"+id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message:"Error while retrieving, id:"+id});
        });
};

//update tutorial
exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data =>{
            if(!data){
                res.status(404).send({
                    message: `Cannot update tutorial with id=${id}`
                });
            }else res.send({message:"Tutorial was updated successfully."})
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error updating tutorial with id="+id
            });
        });
};

//delete a tutorial
exports.delete = (req,res)=>{
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
        .then(data =>{
            if(!data){
                res.status(404).send({
                    message: `Cannot delete tutorial with id=${id}`
                });

            }else{
                res.send({
                    message: "Tutorial was deleted successfully!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete Tutorial with id="+id
            });
        });
};

// delete everything (not recommended)

exports.deleteAll = (req,res) =>{
    Tutorial.deleteMany({})
        .then(data=>{
            res.send({
                message: `${data.deletedCount} Tutorials were deleted`
            });
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all tutorials."
            });
        });
};


// find all tutorials with published = true
exports.findAllPublished = (req, res)=>{
    Tutorial.find({published: true})
        .then(data=>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
};













