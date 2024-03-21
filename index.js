const { app } = require('./app');
const connectDB = require('./dbConfig/db');
const { port } = require('./secret');

app.listen(port, () => {
    console.log(`home shop running on port ${port}`);
    connectDB()
})