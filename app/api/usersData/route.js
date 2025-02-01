import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get request
export async function GET() {
  try {
    const usersData = await prisma.users.findMany();
    console.log("succeeded");
    return new Response(JSON.stringify(usersData), { status: 200 });
  } catch (error) {
    console.error("Error fetching users data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching users data" }),
      { status: 500 }
    );
  }
}

// post request
export async function POST(req) {
  try {
    const { name } = await req.json();

    // validate data before inserting
    if (!name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const newUserData = await prisma.users.create({
      data: {
        name,
      },
    });
    return new Response(JSON.stringify({ newUserData }), { status: 201 });
  } catch (error) {
    console.error("Error creating user data:", error);
    return new Response(JSON.stringify({ error: "Error creating user data" }), {
      status: 500,
    });
  }
}

// Put request
export async function PUT(req) {
  try {
    const { id, name } = await req.json();

    // validate data before inserting
    if (!id || !name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const updatedUserData = await prisma.users.update({
      where: { id },
      data: {
        name,
      },
    });
    return new Response(JSON.stringify({ updatedUserData }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating users data:", error);
    return new Response(
      JSON.stringify({ error: "Error updating users data" }),
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

    await prisma.users.delete({
      where: { id },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error("Error deleting users data:", error);
    return new Response(
      JSON.stringify({ error: "Error deleting users data" }),
      { status: 500 }
    );
  }
}
