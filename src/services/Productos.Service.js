import httpClient from "./httpClient";

const END_POINT =  "/api/productos";


const getAllProductos = () => httpClient.get(END_POINT); 

const getProducto = (id) => httpClient.get(END_POINT + "/" + id);

const insertProducto = (producto) => httpClient.post(END_POINT, producto); 

const insertProductoConFoto = (producto) => httpClient.post(END_POINT, producto, {
    headers: {
        "Content-Type":"multipart/form-data"
    }
}); 

const updateProducto = (id, producto) => httpClient.put(END_POINT + "/" + id, producto); 

const updateProductoConFoto = (id, producto) => httpClient.patch(END_POINT + "/" + id + "/foto", producto, {
    headers: {
        "Content-Type":"multipart/form-data"
    }
}); 


const deleteProducto = (id) => httpClient.delete(END_POINT + "/" + id);


export{
    getAllProductos,
    insertProducto,
    insertProductoConFoto,
    getProducto,
    updateProducto,
    deleteProducto,
    updateProductoConFoto
}