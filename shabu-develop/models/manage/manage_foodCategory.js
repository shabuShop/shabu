const db = require('../../config/db_config')
connection = db.connection;



exports.getFood_category = async function() {
    try {
        let sql = `SELECT Food_category.[ID], Food_category.[Fd_Category]  FROM Food_category WHERE Flag_Avail = 1`

        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.setFood_category  = async function(data) {
    try {
        let sql = `INSERT INTO Food_category( Fd_Category , Flag_Avail ) 
                   VALUES ("${data.name}" ,1);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteFood_category  = async function(data) {
    try {
        let sql = ` UPDATE Food_category SET Flag_Avail = 0   WHERE Food_category.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.updateFood_category  = async function(data) {
    try {
        let sql = `UPDATE Food_category SET Fd_Category = "${data.Uname}" where ID = ${data.id_update} ; `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

// ===================== Validation ZONE =====================


exports.getValidation_NAME = async function(data) {
    try {
        let sql = ` SELECT Food_category.[ID] FROM Food_category WHERE  Flag_Avail = 1 AND Fd_Category  = "${data.name.trim()}" `
    
        const con = await connection.query(sql);
        let output = true;
        if(con.length > 0){
            output = false
        }
        return output;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.getValidation_NAME_update = async function(data) {
    try {
        let sql = ` SELECT Food_category.[ID] FROM Food_category WHERE  Flag_Avail = 1 AND Fd_Category =  "${data.Uname.trim()}" AND ID <> ${data.id_update}; `

        const con = await connection.query(sql);
        let output = true;
        if(con.length > 0){
            output = false
        }
        return output;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// ===================== Validation ZONE =====================