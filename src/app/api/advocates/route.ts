import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get("search");

  if (!searchTerm) {
    const allAdvocates = await db.select().from(advocates);
    return Response.json(allAdvocates);
  }

  const filteredAdvocates = await db
    .select()
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        sql`${advocates.specialties}::text ILIKE ${'%' + searchTerm + '%'}`,
        sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${`%${searchTerm}%`}`
      ));

  return Response.json(filteredAdvocates);
}
