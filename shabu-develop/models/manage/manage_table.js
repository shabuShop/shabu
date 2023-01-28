const db = require('../../config/db_config')
connection = db.connection;



exports.getTable = async function() {
    try {

        let sql = `SELECT Table.[ID], Table.[Table_Name] FROM [Table] WHERE Table.Flag_Avail = 1  ;
        `
        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.setTable  = async function(data) {
    try {

        let sql = `INSERT INTO [Table] ( Table_Name , Flag_Avail ) VALUES ( "${data.name}" , 1);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.setTable_Status  = async function(data) {
    try {

        let sql = `INSERT INTO Table_Status ( TB_ID , TS_Status ) VALUES ( "${data.id}" , 0);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.getTable_maxID  = async function() {
    try {

        let sql = `SELECT Table.[ID] FROM [Table] WHERE Table.Flag_Avail = 1 AND Table.[ID] = (SELECT Max(ID)  from  [Table] );`
                  
        const con = await connection.query(sql);
        return con[0].ID ;
    } catch (error) {
        console.log(error);
    }
}



exports.deleteTable  = async function(data) {
    try {
        let sql = ` UPDATE [Table] SET Flag_Avail = 0   WHERE Table.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.updateTable  = async function(data) {
    try {
        let sql = `UPDATE [Table] SET Table_Name = "${data.Uname}" where ID = ${data.id_update} ; `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

// ===================== Validation ZONE =====================


exports.getValidation_NAME = async function(data) {
    try {
        let sql = ` SELECT Table.[ID] FROM [Table] WHERE  Flag_Avail = 1 AND Table_Name  = "${data.name.trim()}" `
    
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
        let sql = ` SELECT Table.[ID] FROM [Table] WHERE  Flag_Avail = 1 AND Table_Name =  "${data.Uname.trim()}" AND ID <> ${data.id_update}; `

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