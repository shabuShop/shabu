const data_manage = require('../../models/sep_module/set_materials')
const data_material = require('../../models/manage/manage_material')
const data_stock = require('../../models/sep_module/stock')

const getDate = require('../../config/getDate');


exports.getSet_materials =async (req, res,next) => {
    if(req.session.role){

       

        let done_stock = await (data_stock.GetMaterial_stock_date({date_time:getDate.date()}).then((data)=>{return data}));

        // get หมวดหมู่
        let type_material = await (data_material.getMaterial().then((data)=>{return data}));
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            type_material:type_material,
            date_time:getDate.date(),
            done_stock:done_stock,
            file:'sep_module/set_materials'
        });
    }else{
        res.redirect("/");
    }
};

exports.getSet_materials_detail =async (req, res,next) => {
    if(req.session.role){

        // ===================================== vailidation stock =====================================
        let done_stock = await (data_stock.GetMaterial_stock_date({date_time:getDate.date()}).then((data)=>{return data}));
        if( done_stock.indexOf(parseInt(req.query.id_detail)) >= 0 ){
            res.redirect("/");
            return ;
        }
        // ===================================== vailidation stock =====================================
 

        let add_stock = await (data_manage.getAdd_stock({date_time:getDate.date(),typeMaterial:req.query.id_detail}).then((data)=>{return data}));

        let material = await (data_material.getMaterial_detail(req.query).then((data)=>{return data}));
        let count_unit = await (data_material.getCount_unit().then((data)=>{return data}));
        /**
            ID: 1,
            Item_On_Stock_ID: 28,
            Item_amount: 10,
            Item_all_price: 150,
            Item_date: '2023-01-15T17:00:00Z',
            Item_isDone: 0,
            It_name: 'เกลือ',
            Un_Name: 'ถุง'
         */
        /*{ ID: 28, It_name: 'เกลือ', Un_Name: 'ถุง' }, */
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            add_stock:add_stock,
            date_time:getDate.date(),
            material:material,
            count_unit:count_unit,
            material_name:req.query.material_detail,
            material_ID:req.query.id_detail,
            file:'sep_module/set_materials_detail'
        });
    }else{
        res.redirect("/");
    }
};



exports.setSet_materials_detail =async (req, res) => {
    if(req.session.role){
        let role = req.session.role ;
        if(req.params.action === "add"){

            await data_manage.setAdd_stock(req.body).then(()=>{});
            res.redirect(`/${role}/set_materials_detail?id_detail=${req.body.id_detail}&material_detail=${req.body.material_detail}`);

        }else if(req.params.action === "delete"){

            await data_manage.deleteAdd_stock(req.body).then(()=>{});
            res.redirect(`/${role}/set_materials_detail?id_detail=${req.body.id_detail}&material_detail=${req.body.material_detail}`);

        }else if(req.params.action === "update"){
            await data_manage.updateAdd_stock(req.body).then(()=>{});

            res.redirect(`/${role}/set_materials_detail?id_detail=${req.body.id_detail}&material_detail=${req.body.material_detail}`);
        }
    }else{
        res.redirect("/");
    }
};