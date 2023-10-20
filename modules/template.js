import { traerTodo } from "./request.js";
import {contenedorCurso,cursos} from "./htmlCode.js"




const root = document.getElementById("root")


let nombreCurso =sessionStorage.getItem("nombre_curso")


let dataAPi = await traerTodo(`cursos/v2?course=${nombreCurso}`)


sessionStorage.setItem("curso",JSON.stringify(dataAPi))







let hijos =root.children

const crearCurso =()=>{
    
    
    let dataSeccion =JSON.parse(sessionStorage.getItem("curso"))
    
    
        let count =0    
        let agrupacion ={} 
        dataSeccion.secciones.forEach(element => {
            if(element.sectionName){
                count +=1        

                agrupacion[element.sectionName] =[]
                

                element.videos.forEach(e=>{
                    agrupacion[element.sectionName].push(` http://192.168.110.249:5010/cursos/play?course=${nombreCurso}&seccion=${count}&video=${e.video}`)

                })

                

            }
            
        });  
        sessionStorage.setItem("videos",JSON.stringify(agrupacion))
}


const crearTargeta =()=>{
    let dataSeccion =JSON.parse(sessionStorage.getItem("videos"))
    let entradas = Object.entries(dataSeccion)
    entradas.forEach(e=>{
        let ct = contenedorCurso(e[0])
        root.innerHTML +=ct
        
    })


    /* let targeta =document.querySelectorAll("#targeta")
    targeta.forEach(targ =>{
        
        let bodyTargeta = targ.lastElementChild
        

        
        
    }) */
    
    entradas.forEach(e=>{

        let video =e[1].slice(0,2)

        video.forEach(ee=>{
            let ct = cursos(ee)
            root.innerHTML +=ct
        })
    

        console.log(video)

       /*  video.forEach(videos =>{
            
        }) */

        
    })

}  


crearCurso()
crearTargeta()
