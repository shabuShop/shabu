const db = require('../../config/db_config')
connection = db.connection;

exports.getMaterial = async function() {
    try {
        let sql = ` SELECT Stock_Card_List.[ID], Stock_Card_List.[St_Name]
                    FROM Stock_Card_List;
                  `
        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}


exports.setMaterial  = async function(data) {
    try {
        let sql = `INSERT INTO Stock_Card_List( St_Name) 
                   VALUES ("${data.type}");
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        // .
        console.log(error);
    }
}
exports.deleteMaterial  = async function(data) {
    try {
        let sql = ` DELETE FROM Stock_Card_List  WHERE Stock_Card_List.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}



exports.updateMaterial  = async function(data) {
    try {
        let sql = `UPDATE Stock_Card_List SET St_Name = "${data.Utype}" where ID = ${data.id_update} 
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.getMaterial_detail = async function(data) {
    try {
        let sql = ` SELECT Item_On_Stock.ID, Item_On_Stock.It_name, Count_Unit.Un_Name
                    FROM Count_Unit INNER JOIN Item_On_Stock ON Count_Unit.[ID] = Item_On_Stock.[Un_ID]
                    WHERE Item_On_Stock.St_ID = ${data.id_detail};
                  `

        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.getAll_Material_detail = async function() {
    try {
        let sql = ` SELECT Item_On_Stock.ID, Item_On_Stock.It_name, Count_Unit.Un_Name
                    FROM Count_Unit INNER JOIN Item_On_Stock ON Count_Unit.[ID] = Item_On_Stock.[Un_ID];
                  `
        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}


exports.setMaterial_detail  = async function(data) {
    try {
        let sql = ` INSERT  INTO Item_On_Stock ( It_name, St_ID, Un_ID ) 
                    VALUES("${data.type}" ,${data.id_material}  ,${data.unit});
                  `
        const con = await connection.execute(sql);
        console.log(con);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteMaterial_detail  = async function(data) {
    try {
        let sql = ` DELETE FROM Item_On_Stock  WHERE Item_On_Stock.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

exports.updateMaterial_detail  = async function(data) {
    try {

        // 
        let sql = `UPDATE Item_On_Stock SET It_name = "${data.Utype}" , Un_ID =${data.Uunit}  where Item_On_Stock.ID = ${data.id_update} 
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}


exports.getMaterial_detail_max_id = async function() {
    try {

        // 
        let sql = `SELECT Item_On_Stock.[ID] FROM Item_On_Stock  where  Item_On_Stock.[ID] = (SELECT Max(ID)  from  Item_On_Stock );`
        const con = await connection.query(sql);
        if(con.length > 0){
            return con[0].ID;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.setMaterial_amount  = async function(data) {
    try {

        let sql = ` INSERT  INTO Item_Amount ( Item_On_Stock_ID, Item_Amount ) 
                    VALUES(${data.id}, 0);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteMaterial_amount = async function(data) {
    try {
        let sql = ` DELETE FROM Item_Amount  WHERE Item_Amount.Item_On_Stock_ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

exports.getCount_unit = async function(data) {
    try {
        let sql = ` SELECT Count_Unit.[ID], Count_Unit.[Un_Name]
                    FROM Count_Unit;
                  `
        /**
         * { ID: 4, Un_Name: 'กระป๋อง' },
        */

        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}