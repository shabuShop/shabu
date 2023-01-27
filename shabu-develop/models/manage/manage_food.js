const db = require('../../config/db_config')
connection = db.connection;


exports.getFood = async function() {
    try {
        let sql = `SELECT Food_list.ID, Food_list.Fd_Name, Food_list.Fd_Status, Food_category.Fd_Category
                   FROM Food_category INNER JOIN Food_list ON Food_category.[ID] = Food_list.[Fd_Category_ID]
                   WHERE Flag_Avail = 1;
                  `

        const con = await connection.query(sql);
        // console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.getFood_Category = async function() {
    try {
        let sql = `SELECT Food_category.[ID], Food_category.[Fd_Category]
                   FROM Food_category;
                  `

        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.setFood  = async function(data) {
    try {
        let sql = `INSERT INTO Food_list( Fd_Name , Fd_Status , Fd_Category_ID , Flag_Avail) 
                   VALUES ("${data.food}", "0", "${data.type}" ,1);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        // .
        console.log(error);
    }
}
exports.deleteFood  = async function(data) {
    try {
        let sql = ` UPDATE Food_list SET Flag_Avail = 0   WHERE Food_list.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.updateFood  = async function(data) {
    try {
        let sql = `UPDATE Food_list SET Fd_Name = "${data.Ufood}" ,Fd_Category_ID = "${data.Utype}" where ID = ${data.id_update} 
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}



// ===================== Validation ZONE =====================

exports.getValidation_NAME = async function(data) {
    try {
        let sql = ` SELECT Food_list.[ID] FROM Food_list WHERE  Flag_Avail = 1 AND Fd_Name  = "${data.food.trim() }" `
    
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
        let sql = ` SELECT Food_list.[ID] FROM Food_list WHERE  Flag_Avail = 1 AND Fd_Name  = "${data.Ufood.trim()}"
                    AND ID <> ${data.id_update}; `

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