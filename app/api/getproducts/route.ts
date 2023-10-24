import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient;
export const dynamic = 'force-dynamic';

export async function GET() {
    const data = await prisma.product.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const req = await request.json()

    const name = req.name
    const price = req.price
    const data = await prisma.product.create({
        data: {
            name,
            price
        }
    });
    return NextResponse.json(data);
}