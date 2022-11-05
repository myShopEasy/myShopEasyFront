import httpClient from "./httpClient";

const END_POINT =  "http://localhost:9090/api/productos";


const getAllProductos = () => httpClient.get("http://localhost:9090/api/productos/getAll"); 

const getProducto = (name) => httpClient.get("http://localhost:9090/api/productos/findByName/" + name);

const insertProducto = (producto) => httpClient.post(END_POINT, producto); 

const insertProductoConFoto = (producto) => httpClient.post(END_POINT, producto, {
    headers: {
        "Content-Type":"multipart/form-data"
    }
}); 

const updateProducto = (name, producto) => httpClient.put("http://localhost:9090/api/productos/ "+ name, producto); 

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