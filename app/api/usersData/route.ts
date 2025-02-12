import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  try {
    const usersData = await prisma.users.findMany();
    console.log("Succeeded");
    return new Response(JSON.stringify(usersData), { status: 200 });
  } catch (error) {
    console.error("Error fetching users data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching users data" }),
      { status: 500 }
    );
  }
}

interface UserDataCreateRequest {
  name: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { name }: UserDataCreateRequest = await req.json();

    // Validate data before inserting
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
    return new Response(JSON.stringify(newUserData), { status: 201 });
  } catch (error) {
    console.error("Error creating user data:", error);
    return new Response(JSON.stringify({ error: "Error creating user data" }), {
      status: 500,
    });
  }
}

interface UserDataUpdateRequest extends UserDataCreateRequest {
  id: number;
}

export async function PUT(req: Request): Promise<Response> {
  try {
    const { id, name }: UserDataUpdateRequest = await req.json();

    // Validate data before updating
    if (!id || !name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const updatedUsersData = await prisma.users.update({
      where: { id },
      data: { name },
    });

    return new Response(JSON.stringify(updatedUsersData), { status: 200 });
  } catch (error) {
    console.error("Error updating users data:", error);
    return new Response(
      JSON.stringify({ error: "Error updating users data" }),
      { status: 500 }
    );
  }
}

interface UserDataDeleteRequest {
  id: number;
}

export async function DELETE(req: Request): Promise<Response> {
  try {
    const { id }: UserDataDeleteRequest = await req.json();

    // Validate ID before deleting
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing ID for deletion" }),
        { status: 400 }
      );
    }

    await prisma.users.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting users data:", error);
    return new Response(
      JSON.stringify({ error: "Error deleting users data" }),
      { status: 500 }
    );
  }
}
