import httpClient from "./httpClient";

const END_POINT =  "http://localhost:9090/api/usuarios";

const VALIDAR = "/api/validarUsuario"

const validateUser = (usuario, contraseña) => {
    const user = {
        "usuario" : usuario,
        "contraseña": contraseña
    };
    return httpClient.post(VALIDAR, user); 
}


const getAllUsuario = () => httpClient.get(END_POINT); 

const getUsuario = (usuario) => httpClient.get(END_POINT + "/" + usuario);

const insertUsuario = (usuario) => httpClient.post(END_POINT, usuario); 

const updateUsuario = (usuario, usuarioUpdate) => httpClient.put(END_POINT + "/" + usuario, usuarioUpdate);


const deleteUsuario = (usuario) => httpClient.delete(END_POINT + "/" + usuario);

export{
    validateUser,
    getAllUsuario,
    getUsuario,
    insertUsuario,
    updateUsuario,
    deleteUsuario
}