import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get request
export async function GET() {
  try {
    const fitnessData = await prisma.fitnessData.findMany();
    console.log("succeeded");
    return new Response(JSON.stringify(fitnessData), { status: 200 });
  } catch (error) {
    console.error("Error fetching fitness data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching fitness data" }),
      { status: 500 }
    );
  }
}

// post request
export async function POST(req) {
  try {
    const { date, name, pushUp, plank, squat, abs } = await req.json();

    // validate data before inserting
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
    return new Response(JSON.stringify({ newFitnessData }), { status: 201 });
  } catch (error) {
    console.error("Error creating fitness data:", error);
    return new Response(
      JSON.stringify({ error: "Error creating fitness data" }),
      { status: 500 }
    );
  }
}

// Put request
export async function PUT(req) {
  try {
    const { id, date, name, pushUp, plank, squat, abs } = await req.json();

    // validate data before inserting
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
      data: {
        date,
        name,
        pushUp,
        plank,
        squat,
        abs,
      },
    });
    return new Response(JSON.stringify({ updatedFitnessData }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating fitness data:", error);
    return new Response(
      JSON.stringify({ error: "Error updating fitness data" }),
      { status: 500 }
    );
  }
}

// Delete request
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // validate data before inserting
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing ID for deletion" }),
        { status: 400 }
      );
    }

    await prisma.fitnessData.delete({
      where: { id },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error("Error deleting fitness data:", error);
    return new Response(
      JSON.stringify({ error: "Error deleting fitness data" }),
      { status: 500 }
    );
  }
}
