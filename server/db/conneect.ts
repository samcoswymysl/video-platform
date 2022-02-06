import * as mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'courses',
  namedPlaceholders: true,
  decimalNumbers: true,
});


