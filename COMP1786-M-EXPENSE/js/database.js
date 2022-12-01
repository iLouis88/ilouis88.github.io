function transactionError(tx, error) {
  log(`SQL Error ${error.code}. Message: ${error.message}.`, ERROR);
}

function transactionSuccessForTable(tableName) {
  log(`Create table '${tableName}' successfully.`);
}

function transactionSuccessForTableData(tableName, id, name) {
  log(`Insert (${id}, "${name}") into '${tableName}' successfully.`);
}

function prepareDatabase(db) {
  db.transaction(function (tx) {
    // Create table TRIP.
    let query = `CREATE TABLE IF NOT EXISTS Trip (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT UNIQUE NOT NULL,
            Destination TEXT NOT NULL,
            Date REAL NOT NULL,
            Risk TEXT NOT NULL,
            Description TEXT NULL
        )`;

    tx.executeSql(
      query,
      [],
      transactionSuccessForTable("Trip"),
      transactionError
    );

    // Create table EXPENSE.
    query = `CREATE TABLE IF NOT EXISTS Expense (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Type TEXT NOT NULL,
            Amount INTEGER NOT NULL,   
            Date REAL NOT NULL,
            Time REAL NOT NULL,
            Comment TEXT NULL,
            TripId INTEGER NOT NULL,
            FOREIGN KEY (TripId) REFERENCES Trip(Id) ON DELETE CASCADE
        )`;

    tx.executeSql(
      query,
      [],
      transactionSuccessForTable("Expense"),
      transactionError
    );
  });
}
