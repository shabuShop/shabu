

const data_open_sale = require('../../models/sep_module/open_sale');
const getDate = require('../../config/getDate');


exports.getOpen_sale =async (req, res,next) => {
    if(req.session.role == "admin"){
        
        // get หมวดหมู่
        let open_sale = await (data_open_sale.getOpen_sale({date_time:getDate.date}).then((data)=>{return data}));

        res.render('template', {
            session_user_id:req.session.user_id,
            session_user:req.session.user,
            session_role:req.session.role,
            open_sale:open_sale,
            date_time:getDate.date,
            file:'sep_module/open_sale'
            
        });

    }else{
        res.redirect("/");
    }
};


exports.setOpen_sale =async (req, res) => {
    if(req.session.role == "admin"){

        if(req.params.action == "open"){
            // [Object: null prototype] { open_n: '500' }
            await data_open_sale.setOpen_sale({
                time_open:getDate.currentTime,
                date_time:getDate.date,
                money_open:req.body.open_n
            }).then(()=>{});

            res.redirect("/admin/open_sale");

        }else if(req.params.action == "close"){

            // close  every table have to free before close 
            
            // [Object: null prototype] { close_n: '500' }
            await data_open_sale.setClose_sale({
                time_close:getDate.currentTime,
                date_time:getDate.date,
                money_close:req.body.close_n
            }).then(()=>{});

            res.redirect("/admin/open_sale");
        }
    }else{
        res.redirect("/");
    }
};
