


const data_report = require('../../models/sep_module/report');
const getDate = require('../../config/getDate');


exports.getReport = async (req, res,next) => {
    if(req.session.role == "admin"){

        if( req.query.select ){
            let report;
            switch(parseInt(req.query.select)){
                case 1:
                    report = await (data_report.getSale(req.query).then((data)=>{return data}));
                    break;
                case 2:
                    report = await (data_report.getAdd_item(req.query).then((data)=>{return data}));
                    break;
                case 3:
                    report = await (data_report.getExpenditure(req.query).then((data)=>{return data}));
                    break;
                case 4:
                    report = await (data_report.getFood_List(req.query).then((data)=>{return data}));
                    break;
                case 5:
                    report = await (data_report.getEmployee(req.query).then((data)=>{return data}));
                    break;
                case 6:
                    report = await (data_report.getItem_On_Stock(req.query).then((data)=>{return data}));
                    break;
                case 7:
                    let profit = {};
                    profit.expen = await (data_report.getProfit_expenditure(req.query).then((data)=>{return data}));
                    profit.itemAdd = await (data_report.getProfit_itemAdd(req.query).then((data)=>{return data}));
                    profit.sale = await (data_report.getProfit_sale(req.query).then((data)=>{return data}));
                    report=profit;
                    break;
                    
            }
        
            // console.log("DEBUG",report);

            res.render('template', {
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                report:report,
                select:parseInt(req.query.select),
                date_start:req.query.date_start,
                date_stop:req.query.date_stop,
                date_month:req.query.month,
                date:getDate.date(),
                time:getDate.currentTime(),
                file:'sep_module/report'
            });

        }else{

            res.render('template', {
                session_user_id:req.session.user_id,
                session_user:req.session.user,
                session_role:req.session.role,
                select:0,
                file:'sep_module/report'
            });

        }








    }else{
        res.redirect("/");
    }
};