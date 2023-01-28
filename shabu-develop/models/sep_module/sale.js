const db = require('../../config/db_config')
connection = db.connection;


// =================================== Table ===================================//



// =================================== Table_Status =================================== //

exports.getTable_status = async function(data) {
    try {
        let sql = ` SELECT Table_Status.ID, Table_Status.TB_ID, Table_Status.TS_Status, Table.Table_Name
                    FROM [Table] INNER JOIN Table_Status ON Table.[ID] = Table_Status.[TB_ID]
                    WHERE Table.Flag_Avail = 1;
                  `
        const con = await connection.query(sql);
        // console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.getTable_status_once = async function(data) {
    try {
        let sql = ` SELECT Table_Status.ID, Table_Status.TB_ID, Table_Status.TS_Status, Table.Table_Name
                    FROM [Table] INNER JOIN Table_Status ON Table.[ID] = Table_Status.[TB_ID]
                    WHERE Table_Status.TB_ID = ${data.id};
                  `
        const con = await connection.query(sql);
        console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.updateTable_status_0 = async function(data) {
    // status เปิดโต๊ะ
    try {
        let sql = ` UPDATE Table_Status SET TS_Status = 0  WHERE TB_ID = ${data.table_id};`
        const con = await connection.execute(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.updateTable_status_1 = async function(data) {
    // status เปิดโต๊ะ
    try {
        let sql = ` UPDATE Table_Status SET TS_Status = 1  WHERE TB_ID = ${data.id};`
        const con = await connection.execute(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.updateTable_status_2 = async function(data) {
    try {
        let sql = ` UPDATE Table_Status SET TS_Status = 2  WHERE TB_ID = ${data.id};`
        const con = await connection.execute(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.updateTable_status_3 = async function(data) {
    try {
        let sql = ` UPDATE Table_Status SET TS_Status = 3  WHERE TB_ID = ${data.table_id};`
        const con = await connection.execute(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.updateTable_Sale_Flag_ALL= async function(data) {
    try {
        let sql = ` UPDATE Table_Sale SET Flag = 1  WHERE TB_ID = ${data.table_id} AND Flag = 0 ;`
        const con = await connection.execute(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}




// =================================== Table_Sale ===================================//

exports.getTable_sale = async function(data) {
    try {
        let sql = ` SELECT Table_Sale.ID, Table_Sale.TB_ID, Table_Sale.BFC_ID, Table_Sale.Amount, Table_Sale.Total_Price, Table_Sale.Date_Date, Table_Sale.Date_time, Table_Sale.Flag, Buffet_Category.Bf_Name, Buffet_Category.Bf_Price
                    FROM Buffet_Category INNER JOIN Table_Sale ON Buffet_Category.[ID] = Table_Sale.[BFC_ID]  WHERE Table_Sale.Flag =0   AND  Table_Sale.TB_ID = ${data.table_id} ;
                  `
        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.addTable_sale = async function(data) {
    try {
        /**
             * BFC_id: '1,239',
                amount: '2',
                table_id: '1
         */
        let bfc = data.BFC_id.split(',');
        let tb_ID = data.table_id;
        let bfc_id = bfc[0];
        let amount = data.amount;
        let total = parseInt(amount) * parseInt(bfc[1]);
        // console.log(` VALUES( ${tb_ID} , ${bfc_id} , ${amount} ,${total} , #${data.date}# , "${data.time}" ,0  );`);

        let sql = ` INSERT INTO Table_Sale (TB_ID , BFC_ID , Amount , Total_Price , Date_Date , Date_time , Flag )
                    VALUES( ${tb_ID} , ${bfc_id} , ${amount} ,${total} , #${data.date}# , "${data.time}" ,0  );`

        const con = await connection.execute(sql);
        return con;

    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.deleteTable_sale = async function(data) {
    try {
        let sql = ` DELETE FROM Table_Sale  WHERE ID  = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteTable_sale_flag_0 = async function(data) {
    try {

        console.log(data);
        let sql = ` DELETE FROM Table_Sale  WHERE TB_ID = ${data.table_id} AND Flag = 0  ;
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

// =================================== Sale ===================================//

function format_date_acess2normal(data){
    const date = new Date(data);
    const [month, day, year] = [
        date.getMonth()+1,
        date.getDate(),
        date.getFullYear()+543,
    ];
    return  day+"/"+month+"/"+year;
    
}


exports.addSale = async function(data) {
    try {
   
        console.log(data);
        let sql = ` INSERT INTO Sale ( Sale_Date , Sale_time ,Sale_total_price ,Table_ID , Flag) VALUES( #${data.date}# , "${data.time}" , ${data.total_price} ,${data.table_id} , 0 );`
        const con = await connection.execute(sql);

    } catch (error) {
        console.log(error);
    }
}
exports.getSale_ID = async function(data) {
    try {
        let sql = ` SELECT Sale.[ID], Sale.[Sale_Date], Sale.[Sale_total_price], Sale.[Sale_time], Sale.[Table_ID], Sale.[Flag]
                    FROM Sale WHERE  Sale.[Table_ID] = ${data.table_id} AND Sale.[Flag] = 0  ; 
                 `
        const con = await connection.query(sql);

        if(con.length > 0 ){
            for(let i of con){
                i.Sale_Date = format_date_acess2normal(i.Sale_Date);
            }
        }

        return con[0];
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.update_Sale_money = async function(data) {
    try {
        let sql = ` UPDATE Sale SET Get_money = ${data.getM} , Change_money = ${data.changeM}
                    WHERE  Sale.[Table_ID] = ${data.table_id} AND Sale.[Flag] = 0  ; 
                 `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.getMaxID_sale = async function(data) {
    try {
        let sql = ` SELECT MAX(Sale.[ID]) as maxID FROM Sale;`
        const con = await connection.query(sql);

        return con[0].maxID;
    } catch (error) {
        console.log(error);
        return 0;
    }
}

exports.update_Sale_Flag_Done = async function(data) {
    try {
        let sql = ` UPDATE Sale SET Flag = 1
                    WHERE  Sale.[Table_ID] = ${data.table_id} AND Sale.[Flag] = 0  ; 
                 `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}




// =================================== Sale_Detail ===================================//


exports.getSale_Detail_From_Table_ID = async function(data) {
    try {
        let sql = ` SELECT Sale.ID, Sale.Sale_Date, Sale.Sale_total_price, Sale.Sale_time, Sale.Table_ID, Sale.Get_money, Sale.Change_money, Sale_Detail.SD_price, Sale_Detail.SD_amount, Sale_Detail.SD_total_price , Sale_Detail.BFC_ID, Buffet_Category.Bf_Name
                    FROM Sale INNER JOIN (Buffet_Category INNER JOIN Sale_Detail ON Buffet_Category.[ID] = Sale_Detail.[BFC_ID]) ON Sale.[ID] = Sale_Detail.[Sale_ID]
                    WHERE Sale.Table_ID = ${data.table_id} AND Sale.Flag = 0;
                `
        const con = await connection.query(sql);
        if(con.length > 0 ){
            for(let i of con){
                i.Sale_Date = format_date_acess2normal(i.Sale_Date);
            }
        }
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}


exports.addSale_datail= async function(data) {
    try {
   
        // console.log(data);
        let total = parseInt(data.Amount) * parseInt(data.Bf_Price);

        // console.log(`WOW VALUES( ${data.saleID} , ${data.BFC_ID} , ${data.Amount} , ${data.Bf_Price} , ${total} );`);
        let sql = ` INSERT INTO Sale_Detail ( Sale_ID , BFC_ID , SD_amount , SD_price ,SD_total_price  ) 
                    VALUES( ${data.saleID} , ${data.BFC_ID} , ${data.Amount} , ${data.Bf_Price} , ${total} );`
        const con = await connection.execute(sql);

    } catch (error) {
        console.log(error);
    }
}

