//IMPORTACION
const express=require('express');
let producto=require('./productos');

//INSTANCIAS
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
const routerApp=express.Router();
const PORT=8080;

routerApp.get('/productos',(req,res)=>{
    res.send(producto.productosListados)
})

routerApp.get('/productos/:id',(req,res)=>{
    let idProducto=req.params.id;    
    res.send(producto.filtrarPorId(idProducto))
})

routerApp.post('/productos/guardar',(req,res)=>{
    let productoAGuardar=req.body;           
    let productoGuardado=producto.nuevoProducto(productoAGuardar);        
    res.send(productoGuardado);
})

routerApp.put('/productos/actualizar/:id',(req,res)=>{
    let productoAActualizar=req.body;   
    let idProductoAActualizar=req.params.id;
    let productoActualizado=producto.actualizarPorId(idProductoAActualizar,productoAActualizar);
    res.send(productoActualizado);
})

routerApp.delete('/productos/borrar/:id',(req,res)=>{
    let idProductoABorrar=req.params.id;   
    let productoBorrado=producto.borrarPorId(idProductoABorrar);
    res.send(productoBorrado);
})

app.use('/api',routerApp)

app.listen(PORT,()=>{
    console.log(`El servidor se creó correctamente y esta escuchando peticiones en el puerto: ${PORT}`)
})