

import { db } from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await db.roland.findMany();
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error); // Add more logging here
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}