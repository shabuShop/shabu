
const data_manage = require('../../models/manage/manage_buffet')
const data_manage_food = require('../../models/manage/manage_food')

exports.getBuffet =async (req, res) => {
    if(req.session.role == "admin"){
        let data_buffet = await (data_manage.getBuffet().then((data)=>{return data}));
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            data_buffet:data_buffet,
            file:'manage/manage_buffet'
        });
    }else{
        res.redirect("/");
    }
};
exports.setBuffet =(req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            data_manage.setBuffet(req.body).then(()=>{
                res.redirect("/admin/manage_buffet");
            });
        }else if(req.params.action === "delete"){
            data_manage.deleteBuffet(req.body).then(()=>{
                res.redirect("/admin/manage_buffet");
            });
        }else if(req.params.action === "update"){
            data_manage.updateBuffet(req.body).then(()=>{
                res.redirect("/admin/manage_buffet");
            });
        }
    }else{
        res.redirect("/");
    }
};




// To get value that match betweed All Food  and Food in Buffet now
exports.getBuffet_detail=async (req, res) => {
    if(req.session.role == "admin"){
        let buffet_dt = await (data_manage.getBuffet_detail(req.query).then((data)=>{return data}));
        let data_food = await (data_manage_food.getFood().then((data)=>{return data}));
        match =[];
        // buffet_dt.Food_list_ID
        // data_food.ID
        for(let i of data_food){
            for(let x of buffet_dt){
                if( x.Food_list_ID === i.ID ){
                    match.push(i.ID);
                }
            }
        }
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            buffet_dt:buffet_dt,
            buffet_name:req.query.buffet_detail,
            buffet_ID:req.query.id_detail,
            data_food:data_food,
            match:match,
            file:'manage/manage_buffet_detail'
        });
    }else{
        res.redirect("/");
    }
};

exports.setBuffet_detail =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            let now_data = Object.keys(req.body);
            let update = [];
            for(let i of now_data){
                if(i.substring(0,1) === "F"){
                    let value = i.substring(1,i.length);
                    update.push(parseInt(value))
                }
            }
            await data_manage.deleteBuffetALL({id:req.body.id}).then((data)=>{return data});
            await data_manage.setBuffetMulti({update:update,id:req.body.id}).then((data)=>{return data});
            res.redirect("/admin/buffet_detail?id_detail="+req.body.id);
        }

    }else{
        res.redirect("/");
    }
};