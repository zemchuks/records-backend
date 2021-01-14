exports.confirmQueryRequest = (obj) =>{
    if(Object.keys(obj).length > 2){
        var err = new Error("More queries than needed");
            err.status = 403;
            next(err);
    }else{
        let hasBase = obj.hasOwnProperty("base");
        let hasCurrency = obj.hasOwnProperty("currency");
        
            if(hasBase && hasCurrency){
                return true
            }else{
                return false
            }
    }
}