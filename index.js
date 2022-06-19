// Config del servidor
const express = require('express');
const app = express();
const apiRouter = require('./src/RouterApi');
const PORT = 8080;

app.use('/api/productos', apiRouter.router);
app.use('/api/productos', apiRouter.errorHandler);

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
});

app.listen(PORT, () => {
    console.log('Servidor iniciado.');
})
app.on("error", error => console.log(`Error en servidor ${error}`));