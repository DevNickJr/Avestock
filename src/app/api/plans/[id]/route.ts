import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnection';
import PlanModel from '@/models/PlanModel';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/configs/authOptions"


// ----------------------------------------------------------------------


export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
    try {
        await dbConnect();
        // const session = await getServerSession(authOptions)
        // console.log({session})
    
        // if (!session) {
        //   return res.status(401).json({ message: "You must be signed in to access this" });
        // } 

        const { id } = params;
        // console.log('id', id)
        if (!id) {
          return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        const plan = await PlanModel.findById(id).lean();

        if (!plan) {
          return NextResponse.json({ message: 'plan not found' }, { status: 400 });
        }
              

        return NextResponse.json(plan, { status: 200 });
    
        // return res.status(200).json({ users: allUsers });
      } catch (error) {
        console.error(error);
        // return res.status(500).json({ message: 'Internal server error' });
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });

      }
}
 
// export async function HEAD(req: Request) {}
 
export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    await dbConnect();
    // const session = await getServerSession(authOptions)
    // console.log({session})

    // if (!session) {
    //   return res.status(401).json({ message: "You must be signed in to access this" });
    // } 

    const { id } = params;
    // console.log('id', id)
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const plan = await PlanModel.findByIdAndDelete(id).lean();

    if (!plan) {
      return NextResponse.json({ message: 'plan not found' }, { status: 400 });
    }
          
    return NextResponse.json(plan, { status: 200 });

    // return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ message: 'Internal server error' });
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });

  }
}
 
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

    const body = await req.json()

    const plan = await PlanModel.findByIdAndUpdate(id, body, { new: true }).lean();

    if (!plan) {
      return NextResponse.json({ message: 'failed to update' }, { status: 400 });
    }
          

    return NextResponse.json(plan, { status: 200 });

    // return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ message: 'Internal server error' });
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });

  }
}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(req: Request) {}