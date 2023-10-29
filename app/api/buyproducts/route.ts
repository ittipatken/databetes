//ส่งมาว่าซื้ออะไร กี่ชิ้น เป็นเงินกี่ bulb
//{productId: 1, quantity: 2, amount: 30}

//สำหรับ get จะไว้ดูว่าซื้ออะไรไปแล้วบ้าง ลองเปิดดูได้เลย

import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { config } from "@/app/lib/auth";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

async function block_hashing(
  last_transaction: any,
  fromUser: number,
  toUser: number
) {
  const content = `${last_transaction}-${fromUser}to${toUser}`;
  const utf8 = new TextEncoder().encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

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
    return new NextResponse(JSON.stringify({ error: 'not enough money' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
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

    try {
      const receiverEmail = seller.email;
  
      if (!session || !session.user?.email) {
        return NextResponse.json({ status: "Please log in" });
      }
  
      const lastTransaction = await prisma.payhist.findFirst({
        orderBy: {
          id: "desc",
        },
        select: {
          hash: true,
        },
      });
  
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
  
      const receiver = await prisma.user.findUnique({
        where: {
          email: receiverEmail,
        },
        select: {
          id: true,
          amount: true,
        },
      });
  
      if (!user?.id || !receiver?.id) {
        return NextResponse.json({ status: "User not found" });
      }
  
      const hash = await block_hashing(
        lastTransaction?.hash || "",
        user.id,
        receiver.id
      );
  
      if(user.amount < amount){
        return(
          NextResponse.json({status: 'not_valid'})
        )
      }
  
      await prisma.payhist.create({
        data: {
          fromUser: user.id,
          toUser: receiver.id,
          amount: amount,
          hash: hash,
        },
      });
  
      await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          amount: user.amount - amount
        }
      })
  
      await prisma.user.update({
        where: {
          id: receiver.id,
        },
        data: {
          amount: receiver.amount + amount
        }
      })
  
      return NextResponse.json({ status: "Success" });
    } catch (error) {
      console.error(error);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('error' + error)
  }
  
}



