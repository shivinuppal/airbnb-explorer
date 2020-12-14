const oracledb = require ("oracledb")

let generateConnectionProps = () => {
    const connectString = `
    (DESCRIPTION=
      (ADDRESS=
        (PROTOCOL=TCP)
        (HOST=airbnboracle.cb425jhoo8il.us-east-1.rds.amazonaws.com
            )
        (PORT=1521)
      )
      (CONNECT_DATA=
        (SID=AIRBNBO)
        )
      )`;
  
    return {
      user: "admin",
      password: "edwardkim",
      connectString: connectString
    }
  }
  async function runQuery(query, callback) {
    let connection;
    let result;
    const connectionProps = generateConnectionProps();
  
    try {
      connection = await oracledb.getConnection(connectionProps);
      result = await connection.execute(query);
  
    } catch (err) {
      console.error(err);
      return -1;
    } finally {
      if (connection) {
        try {
          await connection.close();
          callback(false, result.rows, true);
        } catch (err) {
          console.error(err);
          return -1;
        }
      }
    }
  }
  module.exports = {
      runQuery: runQuery
  }