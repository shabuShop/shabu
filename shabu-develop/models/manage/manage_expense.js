const db = require('../../config/db_config')
connection = db.connection;


exports.getExpense = async function() {
    try {
        let sql = ` SELECT Expenditure.ID, Expenditure.Exp_Date, Expenditure.Exp_Name, Expenditure.Exp_Money, Expenditure.Emp_ID, Employee.Emp_Fname
                    FROM Employee INNER JOIN Expenditure ON Employee.[ID] = Expenditure.[Emp_ID];
                  `
        const con = await connection.query(sql);

        // format date 2023-01-18T17:00:00Z to 19/1/2023
        for(let i of con){
            const d = new Date(i.Exp_Date);
            let day = d.getDate();
            let month = d.getMonth()+1;
            let year = d.getFullYear();
            i.Exp_Date = day+"/"+month+"/"+year;
        }
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}



exports.setExpense = async function(data) {
    try {
        let sql = `INSERT INTO Expenditure( Exp_Name , Exp_Money , Emp_ID , Exp_Date) 
                   VALUES ("${data.name_exp}", ${data.money_exp}, ${data.type}, #${data.date}#);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteExpense = async function(data) {
    try {
        let sql = ` DELETE FROM Expenditure  WHERE Expenditure.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.updateExpense = async function(data) {
    try {
        let sql = ` UPDATE Expenditure SET Exp_Name = "${data.Uname_exp}" ,
                    Exp_Money = ${data.Umoney_exp} , Emp_ID = ${data.Utype}
                    where ID = ${data.id_update} 
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
