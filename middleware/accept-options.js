module.exports = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        
        res.sendStatus(200);
    }
    else {

        if(typeof req.headers.authorization === "undefined") {
            
            res.sendStatus(403);
        } else {
            
            next();
        }
    }
};