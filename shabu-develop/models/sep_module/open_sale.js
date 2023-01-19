const db = require('../../config/db_config')
connection = db.connection;



exports.getOpen_sale = async function(data) {
    try {
        let sql = ` SELECT  TOP 1 Open_Sale.[ID], Open_Sale.[Os_Date], Open_Sale.[Os_date_time_open], Open_Sale.[Os_money_open], Open_Sale.[Os_date_time_close], Open_Sale.[Os_status], Open_Sale.[Os_money_close]
                    FROM Open_Sale WHERE Open_Sale.[Os_Date] = #${data.date_time}# ;
                  `
        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.setOpen_sale = async function(data) {
    try {
        let sql = ` INSERT INTO Open_Sale ( Os_Date , Os_date_time_open ,Os_money_open , Os_date_time_close , Os_money_close , Os_status )
                    VALUES( #${data.date_time}# , "${data.time_open}" , ${data.money_open} , 0 , 0 ,  1 ) ;
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

exports.setClose_sale = async function(data) {
    try {
        let sql = ` UPDATE Open_Sale SET Os_status = 0 , Os_date_time_close = "${data.time_close}", Os_money_close = ${data.money_close} where Os_Date = #${data.date_time}#  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
