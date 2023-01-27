const db = require('../../config/db_config')
connection = db.connection;
const shaJs = require("sha.js");




exports.getData_Employee = async function() {
    try {
        let sql = `SELECT em.ID, em.Emp_Fname, em.Emp_Lname, em.Emp_Address, em.Emp_Tel, em.Emp_Username, em.Emp_Password, ps.Position_Name
        FROM (Employee em),[Position_data] ps WHERE em.Position_ID = ps.ID AND Flag_Avail = 1;
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
        let sql = `INSERT INTO Employee( Emp_Fname , Emp_Lname , Emp_Address , Emp_Tel , Emp_Username , Emp_Password , Position_ID , flag_login , Flag_Avail) 
                   VALUES ("${data.Fname}", "${data.Lname}", "${data.address}", "${data.tel}","${data.username}","",${data.position} , 0 , 1);
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}
exports.deleteData_Employee = async function(data) {
    try {
        let sql = ` UPDATE Employee SET Flag_Avail = 0 WHERE Employee.ID = ${data.id_del};
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
                   Emp_Tel="${data.Utel}"  , Position_ID =${data.Uposition} where ID = ${data.id_update} 
                  `
        const con = await connection.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

exports.getEmployee_admin = async function() {
    try {
        let sql = ` SELECT Employee.ID AS Employee_ID, Employee.Emp_Fname,Employee.Emp_Lname, Position_data.ID AS Position_data_ID
                    FROM Position_data INNER JOIN Employee ON Position_data.[ID] = Employee.[Position_ID] where Position_data.[ID] = 1 ;
                    `
        const data = await connection.query(sql);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}


exports.getLogin_username = async function(data) {
    try {
        let sql = ` SELECT Employee.[ID], Employee.[Emp_Username], Employee.[flag_login]
                    FROM Employee where  Employee.[Emp_Username] = "${data.username}";
       `
        const con = await connection.query(sql);
        // console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return 0;
    }
}
exports.setLogin_Flag_password = async function(data) {
    try {
        let password = shaJs('sha256').update(data.password).digest('hex')

        let sql = ` UPDATE Employee SET Emp_Password ="${password}"  , flag_login = 1  where Emp_Username ="${data.username}" ; `
        const con = await connection.execute(sql);
        return con;
    } catch (error) {
        console.log(error);
        return 0;
    }
}
exports.getLogin_username_password = async function(data) {
    try {
        let password = shaJs('sha256').update(data.password).digest('hex')
        let sql = ` SELECT Employee.ID, Employee.Emp_Fname, Employee.Emp_Lname, Employee.Position_ID
                    FROM Employee WHERE Employee.Emp_Username = "${data.username}" and Employee.Emp_Password = "${password}" ;
                `

        const con = await connection.query(sql);
        console.log(con);

        return con;
    } catch (error) {
        console.log(error);
        return 0;
    }
}



// ===================== Validation ZONE =====================

exports.getValidation_NAME_USERNAME = async function(data) {
    try {
        let sql = ` SELECT Employee.[ID] FROM Employee WHERE Flag_Avail = 1 AND Emp_Fname  = "${data.Fname.trim() }"   
                    AND Emp_Lname = "${data.Lname.trim() }" OR Emp_Username = "${data.username.trim() }"; `
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
        let sql = ` SELECT Employee.[ID] FROM Employee WHERE Flag_Avail = 1 AND Emp_Fname  = "${data.UFname.trim() }"   
                    AND Emp_Lname = "${data.ULname.trim() }" AND ID <> ${data.id_update}  ; `
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