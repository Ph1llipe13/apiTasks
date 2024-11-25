import loadTask from "../../loadTask.js";
import loadUsuarios from "../../loadUsuarios.js";
import saveTask from "../../saveTask.js";
import saveUsuarios from "../../saveUsuarios.js";
import bcrypt, { hash } from "bcrypt";

const usuarios = loadUsuarios();
const tasks = loadTask();

class usuarioController{
    static async listarUsuario(req, res){
        try{
            res.status(200).json(usuarios)

        }
        catch(err){
            res.status(404).json({message:`${err.message} Algo deu errado`})
        }
        
    }
    static async cadastrarUsuarios(req, res){
        try{

            const {nome, email, senha } = req.body;
            const newUsuario = {
                id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1: 1,
                nome,
                email,
                senha 
            }
            usuarios.forEach(usuario => {
                if(usuario.id === newUsuario.id){
                    newUsuario.id = usuarios[usuarios.length -1].id + 1;
                }
            });
            if(!newUsuario.nome || !newUsuario.email || !newUsuario.senha){
                return res.status(404).json({message:"Os campos nome, email e senha são obrigatorios."});
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newUsuario.senha, salt)
            newUsuario.senha = hash;
            usuarios.push(newUsuario)
            saveUsuarios(usuarios)
            res.status(201).json({message:"Novo usuario cadastrado.", newUsuario})
        }
        catch(err){
            res.status(404).json({message: `${err.message} Erro ao tentar cadastrar novo usuario`})
        }
    }
    static async atualizarUsuario(req, res){
        try{

            const id = req.params.id;
            const {nome, email} = req.body;
            const indexUsuario = usuarios.findIndex((u) => u.id === parseInt(id));
            if(!nome || !email ){
                return res.status(404).json({message: "Os campos nome e email são obrigatorios"});
            }
                
            usuarios[indexUsuario] = {id: parseInt(id), nome, email, senha: usuarios[indexUsuario].senha};
            saveUsuarios(usuarios);
            res.status(200).json({message:"Usuario atualizado com sucesso.", usuario :usuarios[indexUsuario]})
        }
        catch(err){
            res.status(404).json({message: `${err.message} Erro ao atualizar Usuario`});
        }

    }
    static async atualizarSenhaDeUsuario(req, res){
        try{
            const id = req.params.id;
            const {senha} = req.body;
            const indexUsuario = usuarios.findIndex((u)=> u.id === parseInt(id));
            if(!senha){
                return res.status(404).json({message:"O campo senha é  obrigatorio."});
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, salt);

            usuarios[indexUsuario] = {id: parseInt(id), nome: usuarios[indexUsuario].nome, email: usuarios[indexUsuario].email, senha: hash};
            saveUsuarios(usuarios)
            res.status(200).json({message: "Senha alterada com sucesso.", usuario: usuarios[indexUsuario]})
        }
        catch(err){
            res.status(404).json({message: `${err.message} Erro ao atualizar senha.`})
        }
    }
    static async deletarUsuario(req, res){
        try{
            const id = req.params.id;
            const indexUsuario = usuarios.findIndex((u) => u.id === parseInt(id))
            tasks.forEach((task)=>{
                const indexTask = tasks.findIndex((t)=> parseInt(t.idUsuario) === parseInt(id));
                console.log(indexTask)
                tasks.splice(indexTask, 1);
                saveTask(tasks);
            });
            usuarios.splice(indexUsuario, 1);
            saveUsuarios(usuarios);
            res.status(200).json({message:"Usuario e tarefas dependentes delatados com sucesso."})
            
        }
        catch(err){
            res.status(404).json({message:`${err.message} Erro ao tenter deletar tarefa.`})
        }
    }
}

export default usuarioController;