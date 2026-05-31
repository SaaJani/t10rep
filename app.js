import express from 'express';
import dbconnection from './dbconnection.js';
import studentRouter from './routes/students.js';
import userRouter from './routes/users.js';

const app = express();
const port = 3000;

// Connect to the database
dbconnection();

// Tell Express to handle JSON
app.use(express.json());

// Bind the router so /students works
app.use('/students', studentRouter);

app.use('/users', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
