const verifyTicketBody = (req, res, next)=>{

    if(!req.body.title){
        return res.status(400).send({message : "please enter title"});
    }

    if(!req.body.description){
        return res.status(400).send({message : "please enter description"});
    }
    next();
}

module.exports = {
    verifyTicketBody : verifyTicketBody
}