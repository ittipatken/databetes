import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { config } from "@/app/lib/auth";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(config);

  if(!session?.user?.email){
    return NextResponse.json('error');
  }
  
  const data = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {

  const req = await request.json()
  const email = req.email? req.email: 'noemail@error.com';
  const name = req.name? req.name: 'no_name';
  const lastname = req.lastname? req.lastname: 'no_lastname';
  const chulaId = req.chulaId? req.chulaId: 0;
  const password = req.password? req.password: 0;

  const data = await prisma.user.create({
    data: {
      email,
      name,
      lastname,
      amount: 2000,
    }
  });

  const credential = await prisma.userCredential.create({
    data: {
      userid: data.id,
      chula: chulaId,
      password
    }
  })

  return NextResponse.json(data);
}