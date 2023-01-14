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
