import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from './utils/database.js';
import userRouter from './routes/user.js';
// import { createDefaultDBValues, defaultProductValues } from './utils/tests/createDefaultDBValues.js';

export const app = express();
// Configuring express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// await createDefaultDBValues();
// defaultProductValues();

// Establish the server connection
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

// Mount the users router on the /users prefix
app.use('/users', userRouter);

app.post('/login', async (req, res) => {
  console.log('Llegó una', req.body);
  const { username, password } = req.body;
  try {
    const user = await db.User.findOne({
      where: {
        username
      }
    });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// // Router to GET specific student detail from the MySQL database
// app.get('/students/:id', (req, res) => {
//   mysqlConnection.query(
//     'SELECT * FROM student WHERE student_id = ?',
//     [req.params.id],
//     (err, rows, fields) => {
//       if (!err) res.send(rows);
//       else console.log(err);
//     }
//   );
// });

// // Router to INSERT/POST a student's detail
// app.post('/students', (req, res) => {
//   const student = req.body;
//   if (student.student_id === undefined) {
//     student.student_id = 0;
//   }
//   const sql =
//     'SET @student_id = ?;SET @student_name = ?;SET @student_email = ?;SET @student_phone = ?; CALL studentAddOrEdit(@student_id,@student_name,@student_email,@student_phone);';
//   mysqlConnection.query(
//     sql,
//     [
//       student.student_id,
//       student.student_name,
//       student.student_email,
//       student.student_phone
//     ],
//     (err, rows, fields) => {
//       if (!err) res.send('Student Created Successfully');
//       else console.log(err);
//     }
//   );
// });

// // Router to UPDATE a student's detail
// app.put('/students', (req, res) => {
//   const student = req.body;
//   const sql =
//     'SET @student_id = ?;SET @student_name = ?;SET @student_email = ?;SET @student_phone = ?; CALL studentAddOrEdit(@student_id,@student_name,@student_email,@student_phone);';
//   mysqlConnection.query(
//     sql,
//     [
//       student.student_id,
//       student.student_name,
//       student.student_email,
//       student.student_phone
//     ],
//     (err, rows, fields) => {
//       if (!err) res.send('Student Details Updated Successfully');
//       else console.log(err);
//     }
//   );
// });

// // Router to DELETE a student's detail
// app.delete('/students/:id', (req, res) => {
//   mysqlConnection.query(
//     'DELETE FROM student WHERE student_id = ?',
//     [req.params.id],
//     (err, rows, fields) => {
//       if (!err) res.send('Student Record deleted successfully.');
//       else console.log(err);
//     }
//   );
// });
