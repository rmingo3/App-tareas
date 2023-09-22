import{Tarea} from "./tarea.js";

class Tareas{
    _listado={}

    get listadoArr(){
        const listado =[];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        })

        return listado;
    }

    constructor(){
        this._listado={};
    }

    cargarTareas(tareas = []){
        tareas.forEach(tarea=>{
            this._listado[tarea.id]=tarea;
        });

    }

    crearTarea(desc=""){
        const tarea= new Tarea(desc);
        this._listado[tarea.id] =tarea; 
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea,i) => {
            i++;
            let status=(!tarea.completadoEn) ? "Pendiente".red : "Completado".green;
            console.log(`${(i+".").green} ${tarea.desc} :: ${status}`);
            
        })
    }
    listarTareasStatus(completadas){
        console.log();
        let contador=1;
        this.listadoArr.forEach((tarea,i) => {
            i++;
            if(completadas){
                if(tarea.completadoEn){
                    console.log(`${(contador+".").green} ${tarea.desc} :: ${tarea.completadoEn.green}`);
                    contador++;
                    }
            }else{
                if(!tarea.completadoEn){
                    console.log(`${(contador+".").green} ${tarea.desc} :: ${"Pendiente".red}`);
                    contador++;
            }
        }});
    }
    borrarTarea(id=""){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids =[]){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }
}


export {
    Tareas
}