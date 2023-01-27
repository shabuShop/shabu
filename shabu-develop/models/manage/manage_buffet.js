const db = require('../../config/db_config')
connection = db.connection;



exports.getBuffet = async function() {
    try {
        let sql = `SELECT Buffet_Category.[ID], Buffet_Category.[Bf_Name],
                   Buffet_Category.[Bf_Price] FROM Buffet_Category WHERE Flag_Avail = 1 ;        
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
        let sql = `INSERT INTO Buffet_Category( Bf_Name , Bf_Price ,Flag_Avail ) 
                   VALUES ("${data.type}", "${data.price}" , 1);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteBuffet = async function(data) {
    try {
        let sql = ` UPDATE Buffet_Category SET  Flag_Avail = 0  WHERE Buffet_Category.ID = ${data.id_del};
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
        // ลบก็ได้ หรือ เอาเเต่ Flag 1 ก็ได้  ตอนนี้เลือก Flag 1
        let sql = ` SELECT Food_list.ID AS Food_list_ID, Food_list.Fd_Name, Food_category.Fd_Category, Buffet_Category.Bf_Name, Buffet_Category.ID AS Buffet_Category_ID
                    FROM (Food_category INNER JOIN Food_list ON Food_category.[ID] = Food_list.[Fd_Category_ID])
                    INNER JOIN (Buffet_Category INNER JOIN Buffet_Food_List ON Buffet_Category.[ID] = Buffet_Food_List.[Bf_Category_ID]) ON Food_list.[ID] = Buffet_Food_List.[Fd_List_ID]
                    where  Food_list.Flag_Avail = 1 AND Buffet_Category.[ID] = ${data.id_detail} ;
                  `
        const con = await connection.query(sql);
        // console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.getBuffet_name = async function(data) {
    try {
        let sql = ` SELECT Buffet_Category.[Bf_Name],Buffet_Category.[ID] FROM Buffet_Category where Buffet_Category.[ID] = ${data.id};        
                  `
        const con = await connection.query(sql);
        // Bf_Name:
        if(con.length > 0){
            return con[0].Bf_Name;
        }
        return con;
   
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.deleteBuffetALL = async function(data) {
    try {
        let sql = ` DELETE FROM Buffet_Food_List  WHERE Buffet_Food_List.[Bf_Category_ID] = ${data.id};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}



exports.setBuffetMulti = async function(data) {
    try {
        let sql =''
        for(let i=0;i<data.update.length;i++){
            sql = `INSERT INTO Buffet_Food_List( Fd_List_ID , Bf_Category_ID ) VALUES  (${data.update[i]}, ${data.id}) ;`
            const con = await connection.execute(sql);
        }
    } catch (error) {
        console.log(error);
    }
}

// ===================== Validation ZONE =====================

exports.getValidation_NAME = async function(data) {
    try {
        let sql = ` SELECT Buffet_Category.[ID]
                    FROM Buffet_Category WHERE  Flag_Avail = 1 AND Bf_Name = "${data.type.trim()}"; `
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
        let sql = ` SELECT Buffet_Category.[ID]
                    FROM Buffet_Category WHERE  Flag_Avail = 1 AND Bf_Name = "${data.Utype.trim()}"
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