const db = require('../../config/db_config')
connection = db.connection;



exports.getBuffet = async function() {
    try {
        let sql = `SELECT Buffet_Category.[ID], Buffet_Category.[Bf_Name],
                   Buffet_Category.[Bf_Price] FROM Buffet_Category;        
                  `

        const con = await connection.query(sql);
        
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.setBuffet = async function(data) {
    try {
        // console.log(data);
        let sql = `INSERT INTO Buffet_Category( Bf_Name , Bf_Price ) 
                   VALUES ("${data.type}", "${data.price}");
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteBuffet = async function(data) {
    try {
        let sql = ` DELETE FROM Buffet_Category  WHERE Buffet_Category.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.updateBuffet = async function(data) {
    try {
        let sql = `UPDATE Buffet_Category SET Bf_Name = "${data.Utype}" ,
                   Bf_Price = "${data.Uprice}" where ID = ${data.id_update} 
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}


exports.getBuffet_detail = async function(data) {
    try {
        let sql = `SELECT Buffet_Food_List.ID, Buffet_Food_List.Fd_List_ID, Buffet_Food_List.Bf_Category_ID, Buffet_Category.Bf_Name, Food_list.Fd_Name
                   FROM Food_list INNER JOIN (Buffet_Category INNER JOIN Buffet_Food_List ON Buffet_Category.[ID] = Buffet_Food_List.[Bf_Category_ID]) ON Food_list.[ID] = Buffet_Food_List.[Fd_List_ID]
                   where Buffet_Food_List.Bf_Category_ID = ${data.id_detail} ;
        
                  `
        const con = await connection.query(sql);
        console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}