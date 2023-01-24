
const login = require('../models/login')

const data_employee = require('../models/manage/manage_employee');

exports.logout = (req, res) => {
    // Destroy all session
    req.session.destroy(function(err){});
    res.redirect('/');
};

exports.getLogin = (req, res) => {
    // test
    // req.session.user_id = "test";
    // req.session.user = "admin";
    // req.session.role = "admin";
    
    if(req.session.user_id){
        res.redirect("/"+req.session.role);
    }else{
        res.render('login', {status_login:[],error_code:0});
    }
};



exports.postLogin_valid =async (req, res) => {
    console.log(req.body);
    if(req.body.username && req.body.password ){
        // login
        let login = await (data_employee.getLogin_username_password({
            username:req.body.username ,
            password:req.body.password ,
        }).then((data)=>{return data}));

        if(login.length > 0){
            // create session
            req.session.user_id = login[0].ID;
            req.session.user = login[0].Emp_Fname + " " + login[0].Emp_Lname;
            req.session.role = "user";
            
            if(login[0].Position_ID === 1){
                req.session.role = "admin";
            }

            res.redirect('/');
        }else{
            res.render('login',{
                error_code:2,
                status_login:1,
                username:req.body.username
           });
        }


    }else if(req.body.username && req.body.pass_1 && req.body.pass_2 ){
        
        if( req.body.pass_1 === req.body.pass_2 ){
            
             // insert db
            await (data_employee.setLogin_Flag_password({
                username:req.body.username ,
                password:req.body.pass_1 ,
            }).then((data)=>{return data}));
            
            res.render('login',{
                error_code:0,
                status_login:1,
                username:req.body.username
           });
           

            
        }else{

            res.render('login',{
                error_code:3,
                status_login:0,
                username:req.body.username
           });


        }


    }else if(req.body.username ){
        let employee = await (data_employee.getLogin_username({username:req.body.username}).then((data)=>{return data}));
        if( employee.length > 0 ){

            if(employee[0].flag_login === 0){
                // console.log("new password");
                res.render('login',{
                    error_code:0,
                    status_login: 0,
                    username:req.body.username
                });

            }else if(employee[0].flag_login === 1){
                res.render('login',{
                    error_code:0,
                    status_login: 1,
                    username:req.body.username
               });
            }

        }else{
            res.render('login',{ 
                error_code:1 ,
                status_login:null,
            });
        }

    }

    // let getLogin=login.valid(req.body.username,req.body.pass);
    
    // if(getLogin.status == 1){
    //     req.session.user_id = getLogin.user_id;
    //     req.session.user = getLogin.user;
    //     req.session.role = getLogin.role;
    //     res.redirect('/');
    // }else{
    //     res.render('login',{data:getLogin})
    // }
    
};
