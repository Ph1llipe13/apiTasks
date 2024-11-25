import fs from "node:fs";

const usuarios = "./usuarios.json";

function loadUsuarios(){
    if(fs.existsSync(usuarios)){
        try{
            const data = fs.readFileSync(usuarios, 'utf8')
            console.log("Conexão com banco de dados usuarios.")
            return JSON.parse(data);
        }
        catch(err){
            console.log("erro na conexão", err.message)
        }
    }
    return [{message:"conexão: recusada"}]
}

export default loadUsuarios;