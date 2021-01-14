const {confirmQueryRequest}  = require("./helpers/confirmQueryRequest");
const axios = require("axios");

exports.queryRoute= (req, res, next)=>{
        //Check if there is any query on the route
        if(Object.keys(req.query).length <= 0 && req.query.constructor === Object) {
          
          //GO to default route /api/rates
          next();
        } 
        //If Query is in url
        else {

           //Check if the query is the accepted query
           if(confirmQueryRequest(req.query)){//IF true
                let base = req.query.base;
                let currency = req.query.currency;

                //Pass the base and currency to our request
                req.ourQuery = {base, currency};

                //Pass to the next middleware
                next()
           }else{
                var err = new Error("Incorrect query parameters");
                err.status = 403;
                next(err);
           }
        }       
}