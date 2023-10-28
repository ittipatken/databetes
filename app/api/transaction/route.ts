import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { TextEncoder } from "util";
import { config } from "@/app/lib/auth";

const prisma = new PrismaClient();

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

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(config);

  if(!session?.user?.email){
    return NextResponse.json('error');
  }

  const thisuser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true
    }
  })

  if(!thisuser?.id){
    return NextResponse.json({error: 'error'})
  }
  
  const data = await prisma.payhist.findMany({
    where: {
      fromUser: thisuser.id
    },
    select: {
      fromUser: true,
      toUser: true,
      amount: true,
    }
  });
//data = [{"fromUser":1,"toUser":null},{"fromUser":1,"toUser":null},{"fromUser":1,"toUser":null}]
/*
  data.map((datum) => {
    const user = await prisma.user.findUnique({
      where: {
        id: datum.toUser
      },
      select: {
        name: true,
        lastname: true
      }
    })
    console.log(user)
    datum.toUser = user.name + user.lastname
  })
*/
  return NextResponse.json(data);
}




export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    const receiverEmail = req.receiver;
    const amount = req.amount;

    const session = await getServerSession(config);

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

    await prisma.payhist.create({
      data: {
        fromUser: user.id,
        toUser: receiver.id,
        amount: amount,
        hash: hash,
      },
    });

    return NextResponse.json({ status: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "Error" });
  }
}
