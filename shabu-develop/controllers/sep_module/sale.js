
const data_table = require('../../models/sep_module/sale');
const getDate = require('../../config/getDate');
const data_buffet = require('../../models/manage/manage_buffet')
const data_open_sale = require('../../models/sep_module/open_sale');

exports.getSale =async (req, res,next) => {
    
    if(req.session.role){
        let status_sale = await (data_open_sale.getStatus_sale({date_time:getDate.date}).then((data)=>{return data}));
        
        let table = await (data_table.getTable_status({}).then((data)=>{return data}));
        // [ { ID: 1, TB_ID: 1, TS_Status: 0 },Table_Name ]
        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            table:table,
            status_sale:status_sale,
            file:'sep_module/sale'
        });
    }else{
        res.redirect("/");
    }
};


exports.getSale_table =async (req, res,next) => {
    if(req.session.role){

        let table = await (data_table.getTable_status_once({id:req.query.id}).then((data)=>{return data}));
        console.log(table);

        if(table.length > 0){
            

            // READ DATA
            let buffet = await (data_buffet.getBuffet().then((data)=>{return data}));
            let data_sale = await (data_table.getTable_sale({table_id:req.query.id}).then((data)=>{return data}));
            let sale_paid;
            let sale_detail;


            // SPEED UP
            switch(table[0].TS_Status){
                case 2:
                    sale_paid = await (data_table.getSale_ID({table_id:req.query.id}).then((data)=>{return data}));
                    break;
                case 3:
                    sale_detail = await (data_table.getSale_Detail_From_Table_ID({table_id:req.query.id}).then((data)=>{return data}));
                    break;
            }

            // console.log(sale_detail);


            // RENDER
            res.render('template', {
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                table:table[0],
                buffet:buffet,
                data_sale:data_sale,
                sale_paid:sale_paid,
                sale_detail:sale_detail,
                date:getDate.date,
                time:getDate.currentTime,
                file:'sep_module/sale_table'
            });


        }else{
            res.status(404).render('404', {pageTitle: " ID Not Found", path: ""})
        }

    }else{
        res.redirect("/");
    }
};



exports.setSale_table =async (req, res,next) => {
    if(req.session.role){
        if(req.params.action === "use"){

            let id = req.body.id;
            await (data_table.updateTable_status_1({id:id}).then((data)=>{return data}));
            res.redirect(`/${req.session.role}/sale_table?id=${id}`);
            
        }else if(req.params.action === "add"){

            req.body.date = getDate.date;
            req.body.time = getDate.currentTime;
            await (data_table.addTable_sale(req.body).then((data)=>{return data}));
            res.redirect(`/${req.session.role}/sale_table?id=${req.body.table_id}`);

        }else if(req.params.action === "delete"){

            await (data_table.deleteTable_sale(req.body).then((data)=>{return data}));
            res.redirect(`/${req.session.role}/sale_table?id=${req.body.table_id}`);

        }else if(req.params.action === "paid"){

            req.body.date = getDate.date;
            req.body.time = getDate.currentTime;

            
            let data_sale = await (data_table.getTable_sale(req.body).then((data)=>{return data}));
            

            if( data_sale.length > 0 ){
                await (data_table.addSale(req.body).then((data)=>{return data}));
                let saleID = await (data_table.getMaxID_sale().then((data)=>{return data}));

                for(let i of data_sale){
                    i.saleID = saleID;
                    // console.log(i);
                    await (data_table.addSale_datail(i).then((data)=>{return data}));
                }
                await (data_table.updateTable_status_2({id:req.body.table_id}).then((data)=>{return data}));

            }

            res.redirect(`/${req.session.role}/sale_table?id=${req.body.table_id}`);

        }else if(req.params.action === "paid_done"){

            // console.log("Debug",req.body);
            
            // ACTION
            await (data_table.update_Sale_money(req.body).then((data)=>{return data}));
            await (data_table.updateTable_Sale_Flag_ALL(req.body).then((data)=>{return data}));
            await (data_table.updateTable_status_3(req.body).then((data)=>{return data}));

            // RENDER
            res.redirect(`/${req.session.role}/sale_table?id=${req.body.table_id}`);

        }else if(req.params.action === "done"){

            console.log("Debug",req.body);
            
            // ACTION
            await (data_table.update_Sale_Flag_Done(req.body).then(()=>{}));
            await (data_table.updateTable_status_0(req.body).then(()=>{}));

            // RENDER
            res.redirect(`/${req.session.role}/sale`);

        }

    }else{
        res.redirect("/");
    }
};