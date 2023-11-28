'use client';
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
// import * as todosApi from '@/todos/helper/todos';
import { useRouter } from "next/navigation";
import { addTodo, deleteCompleted } from "../actions/todo.actions";
import { createTodo } from "../helper/todos";

export const NewTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState<string>('');
  const onSubmit = async(e:FormEvent) => {
    e.preventDefault();
    if(description.trim() === '') return;
    // const updateTodo = await todosApi.createTodo(description.trim());
    // addTodo(description.trim(), user.id);
    await createTodo(description.trim());
    router.refresh();
    setDescription('');
  }

  // const deleteCompleted = async() => {
    // const deleteCompleted = await todosApi.deleteCompletedTodos();
    // router.refresh();
    // return deleteCompleted;
  // }

  return (
    <form  className='flex w-full' onSubmit={onSubmit}>
      <input type="text"
        onChange={ e => setDescription(e.target.value)}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button 
        onClick={ () => deleteCompleted() }
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Delete
      </button>


    </form>
  )
}