const data_material = require('../../models/manage/manage_material')
const data_set_material = require('../../models/sep_module/set_materials')
const data_employ = require('../../models/manage/manage_employee')
const data_stock = require('../../models/sep_module/stock')

const getDate = require('../../config/getDate');


exports.getStock =async (req, res,next) => {
    if(req.session.role == "admin"){

        // get หมวดหมู่
        let type_material = await (data_material.getMaterial().then((data)=>{return data}));
        
        let done_stock = await (data_stock.GetMaterial_stock_date({date_time:getDate.date}).then((data)=>{return data}));

        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            type_material:type_material,
            date_time:getDate.date,
            done_stock:done_stock,
            file:'sep_module/stock'
        });
    }else{
        res.redirect("/");
    }
};

exports.getStock_detail =async (req, res,next) => {
    console.log();
    if(req.session.role === "admin"){

        // ===================================== vailidation stock =====================================
        let done_stock = await (data_stock.GetMaterial_stock_date({date_time:getDate.date}).then((data)=>{return data}));
        if( done_stock.indexOf(parseInt(req.query.id_detail)) >= 0 ){
            res.redirect("/");
            return ;
        }
        // ===================================== vailidation stock =====================================


        let material = await (data_material.getMaterial_detail(req.query).then((data)=>{return data}));
        // { ID: 28, It_name: 'เกลือ', Un_Name: 'ถุง', Item_Amount: 0 },
        let add_stock = await (data_set_material.getAdd_stock({date_time:getDate.date,typeMaterial:req.query.id_detail}).then((data)=>{return data}));
        /**
         * {
                ID: 20,
                Item_On_Stock_ID: 34,
                Item_amount: 5,
                Item_all_price: 500,
                Item_date: '2023-01-17T17:00:00Z',
                Item_isDone: 0,
                It_name: 'ถุงดำ',
                Un_Name: 'กล่อง'
            }
         */
        // console.log(add_stock);
        let employee = await (data_employ.getEmployee_admin().then((data)=>{return data}));
        
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            date_time:getDate.date,
            material:material,
            material_name:req.query.material_detail,
            material_ID:req.query.id_detail,
            add_stock:add_stock,
            employee:employee,
            file:'sep_module/stock_detail'
        });
    }else{
        res.redirect("/");
    }
};


exports.setStock_detail =async (req, res) => {
    if(req.session.role == "admin"){
        if(req.params.action === "add"){
            // console.log(req.body);

            let keys = Object.keys(req.body);
            for(let i =0; i< keys.length ;i++){
                if( keys[i].substring(0,2) === "ID" ){
                    let data = req.body[keys[i]]
                    if( parseInt(data[2]) > 0){
                        await data_set_material.update_Flat_Add_stock({id:data[0],date_time:req.body.date}).then(()=>{});
                    }
                    await data_material.updateMaterial_amount({id:data[0],amount:data[4]}).then(()=>{});
                    
                    await data_stock.setStock({
                        id:data[0],
                        quoted:data[1],
                        pickup:data[2],
                        use:data[3],
                        remain:data[4],
                        date:req.body.date,
                        emp_id:req.body.emp_id,
                        material_ID:req.body.material_ID
                    }).then(()=>{});
                }
            }
            
            res.redirect("/admin/stock");
           
        }
    }else{
        res.redirect("/");
    }
};


exports.getStock_summary =async (req, res,next) => {
    if(req.session.role == "admin"){

        // get หมวดหมู่
        let type_material = await (data_material.getMaterial().then((data)=>{return data}));


 
        if( req.query.date != "" ){
            // select time 
            let get_stock = await (data_stock.getStock_date({date_time:req.query.date}).then((data)=>{return data}));
            console.log(get_stock);
            res.render('template', {
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                type_material:type_material,
                date_time:req.query.date,
                get_stock:get_stock,
                file:'sep_module/stock_summary'
            });

        }else{
            res.render('template', {
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                type_material:type_material,
                date_time:getDate.date,
                get_stock:[],
                file:'sep_module/stock_summary'
            });
        }
        
        
    }else{
        res.redirect("/");
    }
};
