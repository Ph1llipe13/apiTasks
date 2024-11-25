import fs from "node:fs";

const usuarios = "./usuarios.json";


function saveUsuarios(usuario){
    try{
        fs.writeFileSync(usuarios, JSON.stringify(usuario, null, 2), 'utf8')
    }
    catch(err){
        console.log({message: `${err.message} Erro ao salvar usuario.`})
    }
}
export default saveUsuarios;