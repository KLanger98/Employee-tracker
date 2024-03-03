const express = require('express');
const runEmployeeDatabase = require('./Assets/Scripts/index');
const logTitle = require('./Assets/Scripts/logTitle')


const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
    `Server running on ${PORT}`
});

console.log(logTitle());
runEmployeeDatabase();
