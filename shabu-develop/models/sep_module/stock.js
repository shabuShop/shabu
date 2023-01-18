const db = require('../../config/db_config')
connection = db.connection;


exports.GetMaterial_stock_date = async function(data) {
    try {
        let sql = ` SELECT Stock_List.[St_ID] FROM Stock_List  where  Stock_List.[SL_Date]= #${data.date_time}# GROUP BY  Stock_List.[St_ID]         `
        const con = await connection.query(sql);
        let list = [];
        for(i of con){
            list.push(i.St_ID);
        }
        console.log(list);
        return list;
    } catch (error) {
        console.log(error);
        return [];
    }
}


exports.setStock = async function(data) {
    try {
        let sql = ` INSERT  INTO Stock_List ( It_ID , St_ID , Quoted ,PickUp , Use , Remaining , SL_Date , Employee_ID )
                    VALUES( ${data.id} , ${data.material_ID} , ${data.quoted} , ${data.pickup} ,
                    ${data.use} ,${data.remain}, #${data.date}# , ${data.emp_id}) ;
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
