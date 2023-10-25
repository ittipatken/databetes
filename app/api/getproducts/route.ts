import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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

  //request to json
  console.log(req);
  const name = req.name;
  const price = req.price;
  const userId = req.userId;

  try {
    const data = await prisma.product.create({
      data: {
        name,
        price,
        seller: {
          connect: {
            id: 1
          }
        }
      },
    });

    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("error" + error);
    return NextResponse.json('error' + error)
  }
  
}
