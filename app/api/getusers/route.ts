import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await prisma.user.findMany({
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

  const email = req.email
  const name = req.name  
  const lastname = req.lastname
  const products = req.products
  const quantity = req.quantity

try {
  const data = await prisma.user.create({
    data: {
      email,
      name,
      lastname,
      products,
      quantity,
    },
  });

    
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("error" + error);
    return NextResponse.json('error' + error)
  }
  
}
