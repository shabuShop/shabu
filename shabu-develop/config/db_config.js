let ADODB = require('node-adodb');
ADODB.debug = true;
let connection = ADODB.open("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=data/shabu.mdb;");

exports.connection = connection;