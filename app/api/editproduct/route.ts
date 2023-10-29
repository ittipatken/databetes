import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { config } from "@/app/lib/auth";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(config);

  if(!session?.user?.email){
    return NextResponse.json({error: 'error'})
  }

  const user = await prisma.user.findUnique({
    where: {
        email: session?.user.email
    }
  })
  
  if(!user){
    return NextResponse.json({error: 'error'})
  }

  const data = await prisma.product.findMany({
    where: {
        userId: user?.id
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return NextResponse.json(data);
}
