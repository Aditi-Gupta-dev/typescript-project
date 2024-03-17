import { ReactNode, createContext, useContext, useState } from "react";



export type TodosProviderProps={
    children:ReactNode; //jxs , or anything
}
export type Todo={
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}

export type TodosContex={
    todos:Todo[]; //todos k properties upar define hai
    handleAddTodo:(task:string)=>void; //call signature
    toggleTodoAsCompleted:(id:string)=>void;
    handleDeleteTodo:(id:string)=>void;
}

export const todosContext=createContext<TodosContex | null>(null);

//childern is the entire application, type of children is discussed above

export const TodosProvider=({children}:TodosProviderProps)=>{
    const [todos,setTodos]=useState<Todo[]>(()=>{
        try{
            const newTodos=localStorage.getItem("todos")||"[]";
            return JSON.parse(newTodos) as Todo[];
        }catch(error){
            return []
        }
    })

    const  handleAddTodo=(task:string)=>{
        setTodos((prev)=>{
            const newTodos:Todo[]=[
                {
                    id:Math.random().toString(),
                    task:task,
                    completed:false,
                    createdAt:new Date()
                },...prev]
                console.log("previous todos"+ prev);
                console.log(newTodos);

                localStorage.setItem("todos",JSON.stringify(newTodos));
                return newTodos;
        })
    }

    //toggle completed
    const toggleTodoAsCompleted=(id:string)=>{
        setTodos((prev)=>{
            let newTodos=prev.map((todo)=>{
                if(todo.id===id){
                    return {...todo,completed:!todo.completed}
                }
                return  todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos;
        })

    }

    //delete the inividual data
    const handleDeleteTodo=(id:String)=>{
        setTodos((prev)=>{
        let newTodos=prev.filter((filterTodo)=>filterTodo.id!==id);
        localStorage.setItem("todos",JSON.stringify(newTodos));
        return newTodos;


        })

    }
    return <todosContext.Provider value={{todos,handleAddTodo,toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
    </todosContext.Provider>

}

//cunsumer==>

export const useTodos=()=>{
    const todosConsumer=useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside the Provider");
    }
    return todosConsumer;
 
}