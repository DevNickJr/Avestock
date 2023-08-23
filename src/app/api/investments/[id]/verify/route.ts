import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnection';
import InvestModel from '@/models/InvestModel';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/configs/authOptions"


// ----------------------------------------------------------------------

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    await dbConnect();
    // const session = await getServerSession(authOptions)
    // console.log({session})

    // if (!session) {
    //   return res.status(401).json({ message: "You must be signed in to access this" });
    // } 

    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const body: {
        status: string
    } = await req.json()

    

    const invest = await InvestModel.findByIdAndUpdate(id, body, { new: true }).lean();

    if (!invest) {
      return NextResponse.json({ message: 'failed to perform invest operation' }, { status: 400 });
    }
      

    return NextResponse.json(invest, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });

  }
}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(req: Request) {}