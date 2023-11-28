import { getUserSessionServer } from '@/auth/actions/auth.actions';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Arguments {
  params:{
    id:string
  }
}

const getTodo = async(id:string):Promise<Todo|null> => {
  const user = await getUserSessionServer();
  if(!user) NextResponse.json('Not authorized', {status:401});
  const todo = await prisma.todo.findFirst({
    where:{id, userId: user?.id}
  });

  if(todo?.userId === user?.id){
    return null;
  }

  return todo;
}

export async function GET(request: Request, {params}:Arguments) {
  try {
    const {id} = params;
    // const todo = await prisma.todo.findFirst({
    //   where:{
    //     id
    //   }
    // });
    const todo = await getTodo(id);

    if(!todo){
      return NextResponse.json({error:`Todo with ${id} not found`}, {status:404});
    
    }
    return NextResponse.json(todo);
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, {params}:Arguments) {
  const user = await getUserSessionServer();
  if(!user) NextResponse.json('Not authorized', {status:401});
  
  try {
    const {id} = params;
    const todo = await getTodo(id);

    if(!todo){
      return NextResponse.json({error:`Todo with ${id} not found`}, {status:404});
    }

    const {complete, description} = await putSchema.validate(await request.json());

    const updatedTodo = await prisma.todo.update({
      where:{id, userId: user?.id},
      data:{complete, description}
    });

    return NextResponse.json(updatedTodo);
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
