const db = require('../../config/db_config')
connection = db.connection;



exports.getData_Employee = async function() {
    try {
        let sql = `SELECT em.ID, em.Emp_Fname, em.Emp_Lname, em.Emp_Address, em.Emp_Tel, em.Emp_Username, em.Emp_Password, ps.Position_Name
        FROM (Employee em),[Position_data] ps WHERE em.Position_ID = ps.ID;
       `
        const data = await connection.query(sql);
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
exports.getPosition = async function() {
    try {
        let sql = `SELECT ps.ID , ps.Position_Name FROM [Position_data] ps;`
        const data = await connection.query(sql);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.setData_Employee = async function(data) {
    try {
        let sql = `INSERT INTO Employee( Emp_Fname , Emp_Lname , Emp_Address , Emp_Tel , Emp_Username , Emp_Password , Position_ID) 
                   VALUES ("${data.Fname}", "${data.Lname}", "${data.address}", "${data.tel}","${data.username}","${data.password}",${data.position});
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteData_Employee = async function(data) {
    try {
        let sql = ` DELETE FROM Employee  WHERE Employee.ID = ${data.id_del};
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.updateData_Employee = async function(data) {
    try {
        let sql = `UPDATE Employee SET Emp_Fname = "${data.UFname}" ,
                   Emp_Lname = "${data.ULname}" , Emp_Address = "${data.Uaddress}" ,
                   Emp_Tel="${data.Utel}" ,Emp_Username ="${data.Uusername}" , 
                   Emp_Password ="${data.Upassword}", Position_ID =${data.Uposition} where ID = ${data.id_update} 
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
