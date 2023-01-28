const db = require('../../config/db_config')
connection = db.connection;



exports.getCount_Unit = async function() {
    try {
        let sql = `SELECT Count_Unit.[ID], Count_Unit.[Un_Name]  FROM Count_Unit  WHERE Flag_Avail = 1`

        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.setCount_Unit  = async function(data) {
    try {
        let sql = `INSERT INTO Count_Unit( Un_Name , Flag_Avail ) 
                   VALUES ("${data.name}" ,1);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteCount_Unit  = async function(data) {
    try {
        let sql = ` UPDATE Count_Unit SET Flag_Avail = 0   WHERE Count_Unit.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.updateCount_Unit  = async function(data) {
    try {
        let sql = `UPDATE Count_Unit SET Un_Name = "${data.Uname}" where ID = ${data.id_update} ; `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

// ===================== Validation ZONE =====================


exports.getValidation_NAME = async function(data) {
    try {
        let sql = ` SELECT Count_Unit.[ID] FROM Count_Unit WHERE  Flag_Avail = 1 AND Un_Name  = "${data.name.trim()}" `
    
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
        let sql = ` SELECT Count_Unit.[ID] FROM Count_Unit WHERE  Flag_Avail = 1 AND Un_Name =  "${data.Uname.trim()}" AND ID <> ${data.id_update}; `

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