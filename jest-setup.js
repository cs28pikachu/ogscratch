db = require('./server/db')
constants = require('./server/DB_TEST_CONSTANTS/constants')

function dropTable(tableName) {
  return new Promise((resolve, reject) => {
    db.query(`drop table ${tableName};`, (err, result) => {
      if (err) console.log(err);
      console.log('table dropped or non existant');
      resolve();
    })
  })
}

function createTable(tableName, columns) {
  return new Promise((resolve, reject) => {
    let query = `create table ${tableName} (` + columns.join(',') + ');';
    console.log(`create query: ${query}`);
    db.query(query, (err, result) => { //no error handling
      if (err) console.log(err);
      resolve();
    })
  })
}

async function insertIntoTable(tableName, row) {
  return new Promise((resolve, reject) => {
    let queryValues = '';

    let account = row;
    const values = [];
    const columnNames = [];
    const dollars = [];
    let count = 1;
    for (const key in account) {
      if (account.hasOwnProperty(key)) {
        const element = account[key];
        values.push(element);
        columnNames.push(key);
        dollars.push(`$${count++}`);
      }
    }

    let query = `INSERT INTO ${tableName} (${columnNames.join(',')} ) VALUES (${dollars.join(',')}) RETURNING *;`;

    db.query(query, values, (err, result) => {
      console.log("Query Done");
      if (err) console.log(err);
      resolve() //error checking is for chumps
    })

  });
}


module.exports = async () => {
  console.log("Jest SetUP-------------------------");

  let tables = ['test_accounts', 'test_art',];
  let dropTables = tables.slice().reverse();
  let columnsNames = [constants.accountColumns, constants.artColumns]
  let columnValues = [constants.accounts, constants.arts]

  //drop all tables
  for (let i = 0; i < dropTables.length; i++) {
    let currentTable = dropTables[i];
    console.log(`Dropping: ${currentTable}`);
    await dropTable(currentTable);
    console.log(`${currentTable} dropped`);

  }
  //create tables - order is important here
  //must create accounts before arts
  for (let i = 0; i < columnsNames.length; i++) {
    const columns = columnsNames[i];
    const currentTable = tables[i];
    console.log(`Creating: ${currentTable} ===================`);
    await createTable(currentTable, columns);
  }

  console.log("Insert begin");
  for (let i = 0; i < columnValues.length; i++) {
    const values = columnValues[i];
    const currentTable = tables[i];
    for (let j = 0; j < values.length; j++) {
      const row = values[j];
      await insertIntoTable(currentTable, row);
      console.log("-------------------");
    }
    console.log(`insert into table complete`);
  }
  console.log(`Insert End`);






  global.testServer = await require('./server/server.js');

  // function resolveAfter2Seconds(x) { 
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(x);
  //     }, 5000);
  //   });
  // }

  //   var x = await resolveAfter2Seconds(10);
  //   console.log(x); // 10


  console.log("Jest SetUP-------------------------END");

};

