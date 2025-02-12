import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Type definitions for incoming request bodies
interface FitnessDataCreateRequest {
  date: string;
  name: string;
  pushUp: number;
  plank: number;
  squat: number;
  abs: number;
}

interface FitnessDataUpdateRequest extends FitnessDataCreateRequest {
  id: number;
}

interface FitnessDataDeleteRequest {
  id: number;
}

// GET method
export async function GET(): Promise<Response> {
  try {
    const fitnessData = await prisma.fitnessData.findMany();
    console.log("Succeeded");
    return new Response(JSON.stringify(fitnessData), { status: 200 });
  } catch (error) {
    console.error("Error fetching fitness data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching fitness data" }),
      { status: 500 }
    );
  }
}

// POST method
export async function POST(req: Request): Promise<Response> {
  try {
    const { date, name, pushUp, plank, squat, abs }: FitnessDataCreateRequest =
      await req.json();

    // Validate data before inserting
    if (
      !date ||
      !name ||
      pushUp == null ||
      plank == null ||
      squat == null ||
      abs == null
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const newFitnessData = await prisma.fitnessData.create({
      data: {
        date,
        name,
        pushUp,
        plank,
        squat,
        abs,
      },
    });
    return new Response(JSON.stringify(newFitnessData), { status: 201 });
  } catch (error) {
    console.error("Error creating fitness data:", error);
    return new Response(
      JSON.stringify({ error: "Error creating fitness data" }),
      { status: 500 }
    );
  }
}

// PUT method
export async function PUT(req: Request): Promise<Response> {
  try {
    const {
      id,
      date,
      name,
      pushUp,
      plank,
      squat,
      abs,
    }: FitnessDataUpdateRequest = await req.json();

    // Validate data before updating
    if (
      !id ||
      !date ||
      !name ||
      pushUp == null ||
      plank == null ||
      squat == null ||
      abs == null
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const updatedFitnessData = await prisma.fitnessData.update({
      where: { id },
      data: { date, name, pushUp, plank, squat, abs },
    });

    return new Response(JSON.stringify(updatedFitnessData), { status: 200 });
  } catch (error) {
    console.error("Error updating fitness data:", error);
    return new Response(
      JSON.stringify({ error: "Error updating fitness data" }),
      { status: 500 }
    );
  }
}

// DELETE method
export async function DELETE(req: Request): Promise<Response> {
  try {
    const { id }: FitnessDataDeleteRequest = await req.json();

    // Validate ID before deleting
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing ID for deletion" }),
        { status: 400 }
      );
    }

    await prisma.fitnessData.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting fitness data:", error);
    return new Response(
      JSON.stringify({ error: "Error deleting fitness data" }),
      { status: 500 }
    );
  }
}
