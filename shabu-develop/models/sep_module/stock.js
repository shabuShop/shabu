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
        // console.log(list);
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


exports.getStock_date = async function(data) {
    try {
        let sql = ` SELECT Stock_List.ID, Stock_List.St_ID, Stock_List.It_ID, Stock_List.Quoted, Stock_List.PickUp, Stock_List.Use, Stock_List.Remaining, Stock_List.SL_Date, Stock_List.Employee_ID, Item_On_Stock.It_name, Count_Unit.Un_Name, Employee.Emp_Fname, Employee.Emp_Lname
                    FROM (Count_Unit INNER JOIN Item_On_Stock ON Count_Unit.[ID] = Item_On_Stock.[Un_ID]) INNER JOIN (Employee INNER JOIN Stock_List ON Employee.[ID] = Stock_List.[Employee_ID]) ON Item_On_Stock.[ID] = Stock_List.[It_ID]
                    where Stock_List.[SL_Date] = #${data.date_time}#;
                `

        const con = await connection.query(sql);

        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}