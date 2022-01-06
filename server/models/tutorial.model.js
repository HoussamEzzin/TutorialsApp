module.exports = mongoose => {
    let schema = mongoose.Schema({
        title:String,
        description: String,
        published: Boolean
    },
        {timestamps : true});

    /*
    *
    * this is used to override toJSON method
    * toJSON method map default object to a custom object
    * in order to use id instead of _id
    * */
    schema.method("toJSON", function(){
        const {__v,_id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("tutorial", schema);
};