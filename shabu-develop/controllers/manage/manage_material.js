
const data_manage = require('../../models/manage/manage_material')
const data_countingUnit = require('../../models/manage/manage_countingUnit')



exports.getMaterial =async (req, res) => {
    if(req.session.role == "admin"){
        let material = await (data_manage.getMaterial().then((data)=>{return data}));
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            material:material,
            error: parseInt( req.query.error ) || 0 ,
            file:'manage/manage_material'
        });
    }else{
        res.redirect("/");
    }
};

exports.setMaterial =async (req, res) => {

    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            // Validation
            let isVali = await data_manage.getManageValidation_NAME(req.body).then((data)=>{return data})
            switch(isVali){
                case true:
                    data_manage.setMaterial(req.body).then(()=>{
                        res.redirect("/admin/manage_material");
                    });
                    break;
                case false:
                    res.redirect("/admin/manage_material?error=1");
                    break;
            }

        }else if(req.params.action === "delete"){
            
            data_manage.deleteMaterial(req.body).then(()=>{
                res.redirect("/admin/manage_material");
            });


        }else if(req.params.action === "update"){

            let isVali = await data_manage.getManageValidation_NAME_update(req.body).then((data)=>{return data})

            switch(isVali){
                case true:
                    data_manage.updateMaterial(req.body).then(()=>{
                        res.redirect("/admin/manage_material");
                    });
                    break;
                case false:
                    res.redirect("/admin/manage_material?error=1");
                    break;

            }
            

        }
    }else{
        res.redirect("/");
    }
};



exports.getMaterial_detail=async (req, res) => {
    if(req.session.role == "admin"){

        let material = await (data_manage.getMaterial_detail(req.query).then((data)=>{return data}));
        let count_unit = await (data_countingUnit.getCount_Unit().then((data)=>{return data}));

        // let data_food = await (data_manage_food.getFood().then((data)=>{return data}));
        // buffet_dt.Food_list_ID
        // data_food.ID
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            material_name:req.query.material_detail,
            material_ID:req.query.id_detail,
            material:material,
            count_unit:count_unit,
            error: parseInt( req.query.error ) || 0 ,
            file:'manage/manage_material_detail'
        });
    }else{
        res.redirect("/");
    }
};


exports.setSet_materials_detail =async (req, res) => {
    if(req.session.role == "admin"){

        if(req.params.action === "add"){

            let isVali = await data_manage.getDetail_Validation_NAME(req.body).then((data)=>{return data})
            switch(isVali){
                case true:

                    await data_manage.setMaterial_detail(req.body).then(()=>{});
                    let maxID = await data_manage.getMaterial_detail_max_id().then((data)=>{return data});
                    await data_manage.setMaterial_amount({id:maxID,amount:0}).then(()=>{});
                    res.redirect(`/admin/material_detail?id_detail=${req.body.id_material}&material_detail=${req.body.name_material}`);
                    break;

                case false:
                    res.redirect(`/admin/material_detail?id_detail=${req.body.id_material}&material_detail=${req.body.name_material}&error=1`);
                    break;
            }

            


        }else if(req.params.action === "delete"){
            await data_manage.deleteMaterial_detail(req.body).then(()=>{});
            await data_manage.deleteMaterial_amount(req.body).then(()=>{});

            res.redirect(`/admin/material_detail?id_detail=${req.body.id_material}&material_detail=${req.body.name_material}`);

        }else if(req.params.action === "update"){

            let isVali = await data_manage.getDetail_Validation_NAME(req.body).then((data)=>{return data})
            switch(isVali){
                case true:

                    await data_manage.getDetail_Validation_NAME_update(req.body).then(()=>{});
                    res.redirect(`/admin/material_detail?id_detail=${req.body.id_material}&material_detail=${req.body.name_material}`);
                    break;

                case false:
                    res.redirect(`/admin/material_detail?id_detail=${req.body.id_material}&material_detail=${req.body.name_material}&error=1`);
                    break;
            }

           



        }
    }else{
        res.redirect("/");
    }
};