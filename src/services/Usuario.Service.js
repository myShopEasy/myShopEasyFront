import httpClient from "./httpClient";

var END_POINT =  "http://localhost:9090/api/usuarios";


const validateUser = (usuario, contraseña) => {
    return  httpClient.get(END_POINT+"/login/"+usuario+"/"+contraseña)
}


const getAllUsuario = () => httpClient.get(END_POINT+"/getAll"); 

const getUsuario = (usuario) => httpClient.get(END_POINT+"/findByName/" + usuario);

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