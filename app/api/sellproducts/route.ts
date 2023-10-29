//ส่งมาว่าซื้ออะไร กี่ชิ้น เป็นเงินกี่ bulb
//{productId: 1, quantity: 2, amount: 30}

//สำหรับ get จะไว้ดูว่าซื้ออะไรไปแล้วบ้าง ลองเปิดดูได้เลย

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

  const thisUser = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    select: {
      id: true
    }
  })
  if(!thisUser){
    return NextResponse.json({status: 'error'})
  }

  const data = await prisma.buyhist.findMany({
    where: {
      sellerId: thisUser.id
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    select: {
      id: true,
      productName: true,
      amount: true,
      quantity: true,
    }
  });
  return NextResponse.json(data);
}