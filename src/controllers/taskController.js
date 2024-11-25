import loadTask from "../../loadTask.js";
import saveTask from "../../saveTask.js";
import loadUsuarios from "../../loadUsuarios.js";

const usuarios = loadUsuarios();

const tasks = loadTask();

class taskController{
    static async listarTask(req, res){
        try{
            res.status(200).json(tasks);

        }
        catch(err){
            res.status(500).json({message: `${err.message} Erro para listar tarefas`})
        }
    }

    static async  cadastrarTask(req, res){
        try{

            const {titulo, descricao, idUsuario} = req.body;
            const newTask = {
                id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1: 1,
                titulo,
                descricao,
                status: "pendente",
                idUsuario
            }
            if(!titulo || !descricao || !idUsuario){
                return res.status(404).json({message: "Os campos titulo, decrição e de idUsuario são obrigatorios."})
            }
            const indexUsuario = usuarios.findIndex((u)=> u.id === parseInt(idUsuario))
            if(!usuarios.includes(usuarios[indexUsuario])){
                return res.status(404).json({message: "Usuario identificado não existe ou não foi localizado."})
            }
            tasks.push(newTask);
            saveTask(tasks);
            res.status(201).json({message:"Tarefa criada com sucesso.", task: newTask})
        }
        catch(err){
            res.status(404).json({message: `${err.message} Erro ao cadastrar Tarefa.`})
        }

    }
    static async buscaPorUsuarioId(req, res){
        try{
        const {idUsuario} = req.query;
        console.log(idUsuario)
        const tasksDoUsuario = tasks.filter((t)=> parseInt(t.idUsuario) === parseInt(idUsuario));
        if(tasksDoUsuario.length === 0){
            res.status(400).json({message:"Erro usuario não existe."})
        }
        res.status(200).json(tasksDoUsuario)
        }
        catch(err){
            res.status(404).json({message:`${err.message} Erro. Tarefa ou usuario não existe.`})
        }
    }
    static async atulizarTask(req, res){
        try{
            const id = req.params.id;
            const {titulo, descricao, status} = req.body;
            const indexTask = tasks.findIndex((t)=> t.id === parseInt(id));
            if(indexTask === -1){
                res.status(404).json({message:"Tarefa não encontrada."})
            }
            if(!titulo || !descricao || !status){
               return res.status(404).json({message:"Os campos titulo, descrição e status são obrigatorios."}) 
            }
            if(!["pendente", "concluido"].includes(status.toLowerCase())){
                return res.status(404).json({message: "Status só recebe pendente ou concluido."})
            }

            tasks[indexTask] ={
                id: parseInt(id),
                titulo,
                descricao,
                status,
                idUsuario: tasks[indexTask].idUsuario
            };
            saveTask(tasks);
            res.status(200).json({message: "Tarefa atualizada com sucesso", task: tasks[indexTask]})
        }
        catch(err){
            res.status(404).json({message:`${err.message} Erro ao tentar Atualizar Tarefa.`})
        }
    
    }
    static async deletarTask(req, res){
        try{
            const id = req.params.id;
            const indexTask = tasks.findIndex((t) => t.id === parseInt(id))
            tasks.splice(indexTask, 1);
            saveTask(tasks);
            res.status(200).json({message: "Tarefa deletada com sucesso."})
        }
        catch(err){
            res.status(500).json({message: `${err.message} Erro ao deletar tarefa`})
        }

    }
}
export default taskController;