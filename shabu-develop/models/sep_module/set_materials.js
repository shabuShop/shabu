const db = require('../../config/db_config')
connection = db.connection;




exports.getAdd_stock = async function(data) {
    try {
        

        let sql = ` SELECT Item_Add.ID, Item_Add.Item_On_Stock_ID, Item_Add.Item_amount, Item_Add.Item_all_price, Item_Add.Item_date, Item_Add.Item_isDone, Item_On_Stock.It_name, Count_Unit.Un_Name
                    FROM (Count_Unit INNER JOIN Item_On_Stock ON Count_Unit.[ID] = Item_On_Stock.[Un_ID]) INNER JOIN Item_Add ON Item_On_Stock.[ID] = Item_Add.[Item_On_Stock_ID]
                    WHERE Item_Add.[Item_date] =#${data.date_time}# and  Item_On_Stock.[St_ID] = ${data.typeMaterial} ;
                  `
    
        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.setAdd_stock = async function(data) {
    try {
        let sql = ` INSERT  INTO Item_Add ( Item_On_Stock_ID , Item_amount ,Item_all_price , Item_date , Item_isDone )
                    VALUES( ${data.material} , ${data.amount} , ${data.price} , #${data.date}# , 0) ;
                  `
        const con = await connection.query(sql);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteAdd_stock = async function(data) {
    try {
        let sql = ` DELETE FROM Item_Add  WHERE Item_Add.[ID] = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

exports.updateAdd_stock = async function(data) {
    try {
        let sql = ` UPDATE Item_Add SET Item_On_Stock_ID = ${data.Umaterial} ,
                    Item_amount = ${data.Uamount} , Item_all_price =${data.Uprice} where ID = ${data.id_update} 
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
