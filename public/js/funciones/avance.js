export const actualizarAvance = () =>  {
    //Seleccionar lsa tareaas existentes

    const tareas = document.querySelectorAll('li.tarea');
    
    // seleccionar las tareas completadas
    console.log(tareas);
    if(tareas.length) {
        // seleccionar lsa tareas completads
         const tareasCompletas = document.querySelectorAll('svg.completo');
        console.log(tareasCompletas)
        console.log(tareas.length)
        
         // calcular el avance
        const avance = Math.round(( tareasCompletas.length / tareas.length) * 100);
        
        // mostraar el avance
        const porcentaje = document.querySelector('#porcentaje');
      
        porcentaje.style.width = avance+'%';

        if(avance === 100) {
            alert("Completaste el proyecto")
        }
    }
   
}