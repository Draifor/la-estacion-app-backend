import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from './utils/database.js';
import usersRouter from './routes/users/users.js';
import suppliersRouter from './routes/suppliers/suppliers.js';
import invoicesRouter from './routes/invoices/invoices.js';
import ingredientsRouter from './routes/ingredients/ingredients.js';
// import { createDefaultDBValues, defaultProductValues } from './utils/tests/createDefaultDBValues.js';

export const app = express();
// Configuring express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuring cors
app.use(cors());

// await createDefaultDBValues();
// defaultProductValues();

// Establish the server connection
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

// Mount the users router on the /users prefix
app.use('/users', usersRouter);

// Mount the suppliers router on the /suppliers prefix
app.use('/suppliers', suppliersRouter);

// Mount the invoices router on the /invoices prefix
app.use('/invoices', invoicesRouter);

// Mount the ingredients router on the /ingredients prefix
app.use('/ingredients', ingredientsRouter);

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
