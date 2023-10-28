import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//const data = {status: 'ok', user: 'pun', email: 'pun@docchula.com', name: 'pun'}

export async function POST(req: Request) {
  const request = await req.json();

  const chulaId = request.chulaId;
  const password = request.password;

  const response = { message: 'invalid email or password' };

  const user = await prisma.userCredential.findUnique({
    where: {
      chula: chulaId,
    }
  });


  if (user === null) {
    return NextResponse.json(response);
  }

  if (password === user.password) {
    const userId = user.userid
    const profile = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    const goodres = {
      status: 'ok',
      profile
    };
    return NextResponse.json(goodres);
  }
  response.message = 'invalid email or password';
  return NextResponse.json(response);
}