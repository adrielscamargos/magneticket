const mysql = require('mysql2/promise');

const createConnection = async () => {
	return await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});
}

function delay(t, v) {
	return new Promise(function(resolve) { 
		setTimeout(resolve.bind(null, v), t)
	});
}

const updateN8N = async () => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO n8ns (msgFrom) SELECT number FROM Contacts t1 WHERE t1.number NOT IN (SELECT msgFrom FROM n8ns)');
	delay(10000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
			//console.log('© BOT-ZDG Conexão fechada')
		});
		//console.log('© BOT-ZDG Conexão fechada')
	});
	if (rows.length > 0) return true;
	return false;
}

module.exports = {
	createConnection,
	updateN8N
}