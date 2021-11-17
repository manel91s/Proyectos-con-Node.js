import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector("#eliminar-proyecto");

const eliminarProyecto = (url, urlProyecto) => {
    
    return axios.delete(url, {
        params: {urlProyecto}
    });
}

const sweetAlert = () => {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });
}

if(btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        const alert = sweetAlert();
    
        alert.then((result) => {
            if (result.isConfirmed) {

                //Enviar petición
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                const eliminar = eliminarProyecto(url, urlProyecto);
                
                eliminar.then((response) => {
                    if(response.status == '200') {
                        Swal.fire(
                            'Borrado!',
                            response.data,
                            'success'
                          )
                    }
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                    
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        type:'icon',
                        title: 'Hubo un error',
                        text: 'No se puedo eliminar el Proyecto'
                    })
                })
                
            }
        })
    });
}

export default btnEliminar;


