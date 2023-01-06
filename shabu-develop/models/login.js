


const USER = "admin";
const PASSWORD = "123";
const Data = [
    {
        user_id:"1000",
        user:"admin",
        pass:"123",
        role:"a",
    },
    {
        user_id:"2000",
        user:"user",
        pass:"123",
        role:"e",
    }
]

exports.valid = function(user,pass){
    for(let i of Data){
        if (i.user === user && pass === i.pass){
            return {
                status:1,
                user:i.user,
                user_id:i.user_id,
                role:i.role
            }
        }
    }
    return {status:0}
    
} 
/**
 * if (i.user === user && pass === i.pass){
            return {
                status:1,
                user:i.user,
                user_id:i.user_id,
                role:i.role
            }
        }else{
            return {status:0}
        }
 */

