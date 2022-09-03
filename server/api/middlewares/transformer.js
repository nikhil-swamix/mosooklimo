
const lowerCase = (req,res,next) =>{
    try{
        for (var key in req.query){
            req.query[key] = req.query[key].toLowerCase();
        }
        console.log('we have lowercased',req.url)
        next();
    }
    catch(e){
        console.log('Fail to lowercase')

    }
}


export{
    lowerCase
}