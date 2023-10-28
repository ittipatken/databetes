import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { config } from "@/app/lib/auth";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await prisma.product.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  //request - object'
  const req = await request.json();
  const session = await getServerSession(config);

  const name = req.name;
  const price = req.price;
  const quantity = req.quantity
  const description = req.description

  if(!session || !session.user?.email){
    return NextResponse.json({status: 'error'})
  }

  const getUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })
  
  const userId = Number(getUser?.id)

  try {
    const data = await prisma.product.create({
      data: {
        name,
        price,
        quantity,
        description,
        userId,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('error' + error)
  }
  
}
