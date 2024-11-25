import fs from "node:fs";

const tasks = "./tasks.json";

function loadTask(){
    if(fs.existsSync(tasks)){
        const data = fs.readFileSync(tasks, "utf-8");
        console.log("conexão com banco de dados tasks.")
        return JSON.parse(data);
    }
    return ["Conexão falhou."]
}

export default loadTask;