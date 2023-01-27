const db = require('../../config/db_config')
connection = db.connection;



// ============================= Format Date =============================

function format_dateTH(data){
    const date = new Date(data);
    const [month, day, year] = [
        date.getMonth()+1,
        date.getDate(),
        date.getFullYear()+543,
    ];
    return  day+"/"+month+"/"+year;
    
}
function format_date_acess2normal(data){
    const date = new Date(data);
    const [month, day, year] = [
        date.getMonth()+1,
        date.getDate(),
        date.getFullYear()+543,
    ];
    return  day+"/"+month+"/"+year;
    
}



// ============================= REPORT การขาย Table Sale =============================
// Where sale that Flag = 1 ระหว่างวันที่ 000 - 000
// WHERE Flag = 1 AND Sale_Date BETWEEN "22/1/2566" AND "23/1/2566"



exports.getSale = async function(data) {
    try {
        // FORMAT DATA
        // let start = format_dateTH(data.date_start);
        // let stop = format_dateTH(data.date_stop);

        // console.log(start,stop);
        // READ
        let sql = ` SELECT Sale.ID, Sale.Sale_Date, Sale.Sale_total_price, Sale_Detail.BFC_ID, Sale_Detail.SD_price, Sale_Detail.SD_amount, Sale_Detail.SD_total_price, Buffet_Category.Bf_Name
                    FROM Sale INNER JOIN (Buffet_Category INNER JOIN Sale_Detail ON Buffet_Category.[ID] = Sale_Detail.[BFC_ID]) ON Sale.[ID] = Sale_Detail.[Sale_ID]
                    WHERE Flag = 1 AND Sale_Date BETWEEN #${data.date_start}# AND #${data.date_stop}# ;
                  `
        const con = await connection.query(sql);
        if(con.length > 0 ){
            for(let i of con){
                i.Sale_Date = format_date_acess2normal(i.Sale_Date);
            }
        }
        // console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}


// ============================= REPORT รายจ่าย Expentiture =============================
// ดึงมาตรงๆเลย


exports.getExpenditure = async function(data) {
    try {

        // console.log(start,stop);
        // READ
        let sql = ` SELECT Expenditure.ID, Expenditure.Exp_Name, Expenditure.Exp_Money, Expenditure.Emp_ID, Expenditure.Exp_Date, Employee.Emp_Fname, Employee.Emp_Lname
                    FROM Employee INNER JOIN Expenditure ON Employee.[ID] = Expenditure.[Emp_ID]
                    WHERE Exp_Date BETWEEN #${data.date_start}# AND #${data.date_stop}#  ;
                  `

        const con = await connection.query(sql);
        if(con.length > 0 ){
            for(let i of con){
                i.Exp_Date = format_date_acess2normal(i.Exp_Date);
            }
        }
        console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}



// ============================= REPORT รับวัตถุดิบเข้า Item_Add =============================

exports.getAdd_item = async function(data) {
    try {

        // console.log(start,stop);
        // READ
        let sql = ` SELECT Item_Add.ID, Item_Add.Item_On_Stock_ID, Item_Add.Item_amount, Item_Add.Item_all_price, Item_Add.Item_date, Item_On_Stock.It_name, Count_Unit.Un_Name
                    FROM (Count_Unit INNER JOIN Item_On_Stock ON Count_Unit.[ID] = Item_On_Stock.[Un_ID]) INNER JOIN Item_Add ON Item_On_Stock.[ID] = Item_Add.[Item_On_Stock_ID]
                    WHERE Item_isDone = 1 AND Item_date BETWEEN #${data.date_start}# AND #${data.date_stop}# ;
                  `

        const con = await connection.query(sql);
        if(con.length > 0 ){
            for(let i of con){
                i.Item_date = format_date_acess2normal(i.Item_date);
            }
        }
        console.log(con);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}




// ============================= REPORT อาหาร FoodList =============================

exports.getFood_List = async function(data) {
    try {

        // console.log(start,stop);
        // READ
        let sql = ` SELECT Food_list.ID, Food_list.Fd_Name, Food_list.Fd_Category_ID, Food_category.Fd_Category
                    FROM Food_category INNER JOIN Food_list ON Food_category.[ID] = Food_list.[Fd_Category_ID] WHERE Flag_Avail = 1 
                    ORDER BY  Food_list.Fd_Category_ID;
                    
                    `

        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}


// ============================= REPORT พนักงาน Employee =============================

exports.getEmployee = async function(data) {
    try {

        // console.log(start,stop);
        // READ
        let sql = ` SELECT Employee.ID, Employee.Emp_Fname, Employee.Emp_Lname, Employee.Emp_Address, Employee.Emp_Tel, Position_data.Position_Name
                    FROM Position_data INNER JOIN Employee ON Position_data.[ID] = Employee.[Position_ID]
                    WHERE Flag_Avail = 1 ;
                    `
        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}


// ============================= REPORT วัตถุดิบ Item On Stock =============================

exports.getItem_On_Stock = async function(data) {
    try {

        // console.log(start,stop);
        // READ
        let sql = ` SELECT Item_On_Stock.ID, Item_On_Stock.It_name, Item_On_Stock.St_ID, Count_Unit.Un_Name, Stock_Card_List.St_Name, Item_Amount.Item_Amount
                    FROM (Stock_Card_List INNER JOIN (Count_Unit INNER JOIN Item_On_Stock ON Count_Unit.[ID] = Item_On_Stock.[Un_ID]) ON Stock_Card_List.[ID] = Item_On_Stock.[St_ID]) INNER JOIN Item_Amount ON Item_On_Stock.[ID] = Item_Amount.[Item_On_Stock_ID]
                    WHERE Item_On_Stock.Flag_Avail = 1 AND Stock_Card_List.Flag_Avail = 1 ORDER BY Item_On_Stock.St_ID;
        
                    `
        const con = await connection.query(sql);
        return con;
    } catch (error) {
        console.log(error);
        return [];
    }
}
