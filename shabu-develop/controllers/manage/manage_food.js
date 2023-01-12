
const data_manage = require('../../models/manage/manage_food')


exports.getFood =async (req, res) => {
    if(req.session.role == "admin"){
        let data_food = await (data_manage.getFood().then((data)=>{return data}));
        let food_category = await (data_manage.getFood_Category().then((data)=>{return data}));
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            data_food:data_food,
            food_category,food_category,
            file:'manage/manage_food'
        });
    }else{
        res.redirect("/");
    }
};
exports.setFood =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            data_manage.setFood(req.body).then(()=>{
                res.redirect("/admin/manage_food");
            });
        }else if(req.params.action === "delete"){
            data_manage.deleteFood(req.body).then(()=>{
                res.redirect("/admin/manage_food");
            });
        }else if(req.params.action === "update"){
            data_manage.updateFood(req.body).then(()=>{
                res.redirect("/admin/manage_food");
            });
        }
    }else{
        res.redirect("/");
    }
};
