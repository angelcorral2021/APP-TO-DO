//Declaramos las variables

const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})







// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 

    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento);//beforeend inserta cada tarea debajo de la anterior ingresada

}


// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true 
  
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)
}





// crear un evento para escuchar el enter y para habilitar el boton 

botonEnter.addEventListener('click', ()=> {//El boton enter desencadena la funcion de agregarTarea
    const tarea = input.value
    if(tarea){//Revisa si se a ingresado algun dato en el input, si es asi se ejecuta la funcion agregarTarea
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))//Se almacenan los datos en el localStorage del navegador
        id++
        input.value = ''//Se vuelve el valor del input a vacio para ingresar una nueva tarea
    }

})

document.addEventListener('keyup', function (event) {//Igual que la funcion agregar tarea pero con la tecla 'Enter'
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        input.value = ''
        id++
        console.log(LIST)
        }
    }
    
})


lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    
    
    if(elementData == 'realizado') {//Se ejecuta la funcion tareaRealizada que creamos arriba
        tareaRealizada(element)
        console.log("realizado")
    }
    else if(elementData == 'eliminado') {//Se ejecuta la funcion tareaEliminada que creamos arriba
        tareaEliminada(element)
        console.log("elimnado")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})




let data = localStorage.getItem('TODO')//Nos muestra la informacion de todas las tareas que se han creado por medio de la consola del navegador
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}