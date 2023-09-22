import {guardarDB,leerDB} from './helpers/guardarArchivo.js';

import {inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar, 
    listadoTareasCompletar
} from './helpers/inquirer.js';

import{Tareas} from "./models/tareas.js";


const main = async() => {
    let opt="";
    const tareas= new Tareas();
    const tareasDB= leerDB();
    if(tareasDB){
        tareas.cargarTareas(tareasDB);
    }
    do{
        // Imprimir el menu
        opt = await inquirerMenu();
        switch (opt){
            case "1":
                const desc= await leerInput("Descripcion:");
                tareas.crearTarea(desc);
            break;
            case "2":
                tareas.listadoCompleto();
            break;
            case "3":
                tareas.listarTareasStatus(true);
            break;
            case "4":
                tareas.listarTareasStatus(false);
            break;
            case "5":
                const ids= await listadoTareasCompletar(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id!=="0"){
                    const ok = confirmar("Esta seguro?");
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    }while(opt !== "0");
    
}



main();