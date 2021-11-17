import axios from 'axios';
import Swal from 'sweetalert2';
import { actualizarAvance } from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');


if(tareas) {
    tareas.addEventListener('click', e => {
        
        if(e.target.classList.contains('fa-check-circles')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`;

             //request hacia /tareas/:id
            axios.patch(url, { idTarea})
            .then((response) => {
                if(response.status === 200) {
                    icono.classList.toggle('completo');
                    actualizarAvance();
                }
            })
        }

        if(e.target.classList.contains('fa-trash')) {
           
            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;
            
                  Swal.fire({
                        title: 'Desea borrar este Tarea?',
                        text: "Una tarea borrada no puede volver a recuperar",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, deletse it!'
                    }).then((result) => {
                       if(result.value) {
                           //Enviar el delete por medio de axios
                           const url = `${location.origin}/tareas/${idTarea}`;
                           axios.delete(url, {params: {idTarea}})
                                .then((respuesta) => {
                                    if(respuesta.status === 200) {
                                        tareaHTML.parentElement.removeChild(tareaHTML)

                                        Swal.fire (
                                            'Tarea eliminada',
                                            respuesta.data,
                                            'success'
                                        )

                                        actualizarAvance();
                                    }

                                   
                                })
                       }
                    })
                
        }
    })
}

export default tareas;