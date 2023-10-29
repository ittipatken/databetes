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
      buyerId: thisUser.id
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

export async function POST(request: NextRequest) {
  //request - object'
  const req = await request.json();
  const session = await getServerSession(config);

  const id = req.productId;
  const quantity = req.quantity;
  const amount = req.amount

  if(!session || !session.user?.email){
    return NextResponse.json({status: 'error'})
  }

  const getUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if(!getUser){
    return NextResponse.json({error: 'error'})
  }
  console.log(getUser.amount)

  if(amount > getUser.amount){
    return NextResponse.json({error: 'not enough money'})
  }
  
  const updateUser = await prisma.user.update({
    where: {
      id: getUser.id
    },
    data: {
      amount: getUser.amount - amount
    }
  })

  const getSeller = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      userId: true,
      name: true,
    }
  })
  
  if(!getSeller){
    return NextResponse.json({error: 'error'})
  } 

  const seller = await prisma.user.findUnique({
    where: {
      id: getSeller.userId
    }
  })

  if(!seller){
    return NextResponse.json({error: 'error'})
  }

  const updateSeller = await prisma.user.update({
    where: {
      id: seller.id
    },
    data: {
      amount: seller.amount + amount,
    }
  })

  try {
    const data = await prisma.buyhist.create({
      data: {
        productId: id,
        productName: getSeller?.name ? getSeller.name : '',
        quantity,
        amount,
        buyerId: getUser.id,
        sellerId: getSeller.userId
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('error' + error)
  }
  
}

