
const USER = "admin";
const PASSWORD = "123";


exports.valid = function(user,pass){
    if (USER === user && pass === PASSWORD){
        return {status:1,user:USER,role:"A"}
    }else{
        return {status:0}
    }
} 

