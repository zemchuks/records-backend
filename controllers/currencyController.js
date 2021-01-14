const axios = require('axios');

exports.getRates = (req, res, next)=>{

    //Check if there is Query parameters in the request
    if(req.ourQuery){
        axios.get('https://api.exchangeratesapi.io/latest?base='+req.ourQuery.base)
        .then(function (response) {

            //Correct response to be returned
            var responseNeeded;

            //Convert the currency parameters to array
            var reqCurrencies = req.ourQuery.currency.split(",");
            responseNeeded = {
                date : response.data.date,
                base: req.ourQuery.base,
                rates: {}
            }

            var rightCurrency =[];


            for(currency in response.data.rates){
                if(reqCurrencies.includes(currency)){
                    responseNeeded.rates[currency] = response.data.rates[currency];
                    rightCurrency.push(currency);
                }
            }

            //If the currencies are incorrect
            if(rightCurrency.length !== reqCurrencies.length){
                let err = new Error("One of the currency\(ies)\ are incorrect");
                err.status = 403;
                return next(err)
            }

            res.status(200).json({result: responseNeeded})
        })
        .catch(function (error) {
            next(error)
        })  
    }else{
        axios.get('https://api.exchangeratesapi.io/latest')
        .then(function (response) {
            res.status(200).json({results: response.data})
        })
        .catch(function (error) {
           next(error);
        })
    }   
}