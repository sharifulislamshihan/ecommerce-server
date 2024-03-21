const { app } = require('./app');
const { port } = require('./secret');

app.listen(port, () => {
    console.log(`home shop running on port ${port}`);
})