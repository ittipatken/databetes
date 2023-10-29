import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { TextEncoder } from "util";
import { config } from "@/app/lib/auth";

//example of get request response
/* 
[{"fromUser":1,"toUser":"null null","amount":2},{"fromUser":1,"toUser":"null null","amount":5},{"fromUser":1,"toUser":"null null","amount":4}]
"null" if user has no name

*/

interface OriginalDatum{
  fromUser: number
  toUser: number
};

interface UpdatedDatum {
  fromUser: number
  toUser: string | null
};

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

//get user transaction (paid only)
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

  let returnedData: any[] = []

  async function updateData(data: OriginalDatum[]): Promise<UpdatedDatum[]> {
    await Promise.all(data.map(async (datum): Promise<UpdatedDatum> => {
      //console.log(datum)
      if (datum.toUser === null) {
        return { ...datum, toUser: 'unknown' };
      }
      const user = await prisma.user.findUnique({
        where: {
          id: datum.toUser
        },
        select: {
          name: true,
          lastname: true,
          amount: true
        }
      });
      //console.log(user)
      let returnedDatum = [{ ...datum, toUser: user?.name + ' ' + user?.lastname }]
      //console.log(returnedDatum)
      returnedData.push({ ...datum, toUser: user?.name + ' ' + user?.lastname })
      //console.log(returnedData)
      //console.log({ ...datum, toUser: user?.name + ' ' + user?.lastname })
      if (user) {
        return { ...datum, toUser: user.name + ' ' + user.lastname };
      } else {
        console.log(`User not found for ID: ${datum.toUser}`);
        return { ...datum, toUser: null };
      }
    }));

    return returnedData;
  }
  //console.log(returnedData)
  
  //console.log(returnedData)
  //data = [{"fromUser":1,"toUser":2},{"fromUser":1,"toUser":3},{"fromUser":1,"toUser":null}]
  const response = (await updateData(data))

  return NextResponse.json(response);
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
    return NextResponse.json({ status: "Error" });
  }
}
