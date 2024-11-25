import fs from "node:fs";

const dataBaseTasks = "./tasks.json";

function saveTask(task){
    try{
        fs.writeFileSync(dataBaseTasks,JSON.stringify(task, null, 2), "utf-8");

    }
    catch(err){
        console.log(`${err.message} Erro para salar task`)
    }
}
export default saveTask;