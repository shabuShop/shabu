const db = require('../../config/db_config')
connection = db.connection;


exports.getFood = async function() {
    try {
        let sql = `SELECT Food_list.ID, Food_list.Fd_Name, Food_list.Fd_Status, Food_category.Fd_Category
                   FROM Food_category INNER JOIN Food_list ON Food_category.[ID] = Food_list.[Fd_Category_ID];
                  `

        const con = await connection.query(sql);
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
        let sql = `INSERT INTO Food_list( Fd_Name , Fd_Status , Fd_Category_ID) 
                   VALUES ("${data.food}", "0", "${data.type}");
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        // .
        console.log(error);
    }
}
exports.deleteFood  = async function(data) {
    try {
        let sql = ` DELETE FROM Food_list  WHERE Food_list.ID = ${data.id_del};
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
