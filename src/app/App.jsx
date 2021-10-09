
import React, { useState, useEffect } from "react";

const App = () => {

//Definir variables de estado (incluir el _id de mongo y el id público)para el contenido de cada registro(documento) y 
//el conjunto o array de estos documentos

const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [id, setId] = useState('')
const [tasks, setTasks] = useState([])

  
 

    let addTask = (e)=> {
        //Si el formulario tiene un id(si la varible de estado id es diferente del estado inicial), entonces,
        //en vez de agregar un registro(post), lo actualiza(put).
        if(id) {
            fetch(`/api/task/${id}`,{
                method: 'PUT',
                body: JSON.stringify({id, title, description}),
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
                }
            }).then(res=>res.json()).then(data=>{
                // console.log(data)
                 setId("")
                 setTitle("");
                 setDescription("");
                 fetchTasks();
            })
        } else{
        console.log({title, description})
        fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res=> res.json()).then(data=> {
            // console.log(data)
            setTitle('')
            setDescription('')
            fetchTasks();
        })
        .catch(err=> console.error(err))

        }
        e.preventDefault();

    }

    
 //Esta función, en prinicio y sin el confirm por defecto, se le agregaría a un modal personalizado de confirmación.
   let deleteTask = (id)=> {
       if(confirm('Are you sure you whant to delete the element?')) {
           console.log('eliminando' + id)
        fetch(`/api/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            fetchTasks();
        })

       }
   
   }

   //Así se obtienen los datos para la edición efectiva. Se tiene que agregar la id a la variable de estado para
   //aplicar el put usando ese id como parámetro. En principio, no se debería dejar editar el id público.
   let editTask = (id)=>{
       fetch(`/api/task/${id}`).then(res=>res.json()).then(data=>{
        //    console.log(data)
               setTitle(data.title),
               setDescription(data.description),
               setId(data._id)
           
       })
   }

   //Con esta función, agregada como onChange a los inputs, se obtiene los valores de los inputs del formulario para agregar a la bd.
   //name es el attributo del input que almacena el value.
   //Definir esta antes de hacer la petición de agregación (POST) al servidor, es fundamental.

    let handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "title") {
        setTitle(value);
        } else if (name == "description") {
        setDescription(value);
        }
    };

 useEffect(() => {
   fetchTasks();
 }, []);

 //function to obtain the documents to deploy them in a table.
 // Problamente, luego de definir las variables de estado, deba seguir con esta función, antes de programar
 //cualquier otra función de agregar, editar o eliminar
 const fetchTasks = () => {
   fetch("/api/task")
     .then((res) => res.json())
     .then((data) => {
       setTasks([...data]);
       console.log(tasks);
     });
 };





    return (
        <div>
            <h1>MERN STACK DEMO</h1>
           <nav>
               <ul type="none">
                   <li>Logo</li>
                   <li>Inicio</li>
                   <li>Contacto</li>
               </ul>
           </nav>
           <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-content">
                            {/* Se define onSubmit en el form y el type submit en el botón de agregar para asociar la función de agregar a la forma.
                            La forma bien puede ser un modal. */}
                            <form onSubmit={(e)=>addTask(e)}>
                                {/* es fundamental fijar el parámetro value de los inputs con las variables de estado.
                                Así, por defecto, sera el string vacío, pero cuando se aplique la función de editar, se llenarán con los valores del objeto a editar*/}
                                <input type="text" name="title" id="" placeholder="Task name" onChange={(e)=>handleChange(e)} value={title} required/> <br />
                                <textarea name="description" id="" cols="30" rows="10" placeholder="Task description" onChange={(e)=>handleChange(e)} value={description} required></textarea> <br />
                                <button className="send-btn" type="submit">SEND</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                           <tr>
                               <th>Tarea</th>
                               <th>Descripcion</th>
                           </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task=> {
                                return (
                                  <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <button onClick={()=>deleteTask(task._id)}>Delete</button>
                                        <button onClick={()=>editTask(task._id)}>Edit</button>
                                    </td>
                                  </tr>
                                );
                            })}
                            
                        </tbody>
                    </table>
                </div>
           </div>
        </div>
    )
}

export default App;
