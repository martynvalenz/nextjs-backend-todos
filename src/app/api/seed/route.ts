import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  // const todo = await prisma.todo.create({
  //   data:{description:'Piedra del alma'}
  // });

  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma' },
      { description: 'Piedra del poder', complete:true },
      { description: 'Piedra del tiempo' },
      { description: 'Piedra del espacio' },
      { description: 'Piedra del realidad' },
    ]
  })

  return NextResponse.json({message:'Seed executed'})
}