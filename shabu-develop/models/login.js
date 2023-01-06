
const USER = "admin";
const PASSWORD = "123";


exports.valid = function(user,pass){
    if (USER === user && pass === PASSWORD){
        return {
            status:1,
            user:USER,
            user_id:'1000',
            role:"a"
        }
    }else{
        return {status:0}
    }
} 


