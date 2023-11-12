// 'use client';
import prisma from "@/lib/prisma";
import { NewTodo } from "@/todos/components/NewTodo";
import { TodosGrid } from "@/todos/components/TodosGrid";
import { type Metadata } from "next";
// import { useEffect } from "react";

export const metadata: Metadata = {
  title: 'REST Todos',
  description: 'Generated by create next app',
}

export default async function ResTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: [
      {
        description: 'asc'
      }
    ]
  });
  // useEffect(() => {
  //   fetch('/api/todos')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, []);

  return (
    <div>
      <div className="w-full px-3 m-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}