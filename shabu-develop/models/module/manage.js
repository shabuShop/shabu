
var ADODB = require('node-adodb');
ADODB.debug = true;
var connection = ADODB.open("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=data/shabu.mdb;");


exports.getData_Employee = async function() {
    try {
        let sql = `SELECT em.ID, em.Emp_Fname, em.Emp_Lname, em.Emp_Address, em.Emp_Tel, em.Emp_Username, em.Emp_Password, ps.Position_Name
        FROM (Employee em),[Position_data] ps WHERE em.Position_ID = ps.ID;
       `
        const data = await connection.query(sql);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}