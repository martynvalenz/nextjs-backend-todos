import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // const todo = await prisma.todo.create({
  //   data:{description:'Piedra del alma'}
  // });
  await prisma.user.create({
    data:{
      email:'test1@google.com',
      password:bcrypt.hashSync('123456'),
      roles:['admin'],
      todos:{
        create:[
          {description:'Piedra del alma'},
          {description:'Piedra del poder', complete:true},
          {description:'Piedra del tiempo'},
          {description:'Piedra del espacio'},
          {description:'Piedra del realidad'},
        ]
      }
    }
  });

  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'Piedra del alma' },
  //     { description: 'Piedra del poder', complete:true },
  //     { description: 'Piedra del tiempo' },
  //     { description: 'Piedra del espacio' },
  //     { description: 'Piedra del realidad' },
  //   ]
  // })

  return NextResponse.json({message:'Seed executed'})
}