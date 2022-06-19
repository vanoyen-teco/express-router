const express = require('express');
const path = require('path');
const router = express.Router();

const Controlador = require('./Controller');

const errorHandler = (err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({ error: err.message });
};

router.use(express.raw());
router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(express.static(path.join(__dirname ,'public')));

router.get('/',(req, res)=>{ 
    res.send(Controlador.getProductos());
})

router.post('/',(req, res)=>{
    const prod = Controlador.saveProducto(req.body);
    (prod) ? res.status(200).json(prod) : res.status(400).json({error: `Error en los parametros requeridos`});
})

router.get('/:id',(req, res)=>{
    const { id } = req.params;
    const prod = Controlador.getProductoById(id);
    (prod) ? res.status(200).json(prod) : res.status(404).json({error: `Producto no encontrado`});   
})

router.put('/:id',(req, res)=>{
    const { id } = req.params;
    const prod = Controlador.putProductoById(id, req.body);
    (prod) ? res.status(200).json(prod) : res.status(400).json({error: `Error al actualizar`});   
})

router.delete('/:id',(req, res)=>{
    const { id } = req.params;
    const action = Controlador.delProductoById(id);
    (action) ? res.status(200).json() : res.status(404).json();
})


module.exports = {
    router,
    errorHandler 
};