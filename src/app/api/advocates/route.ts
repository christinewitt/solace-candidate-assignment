import { NextRequest } from "next/server";
import { sql, or, ilike } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt("6");

  const offset = (page - 1) * limit;

  const whereCondition = searchTerm
    ? or(
      ilike(advocates.firstName, `%${searchTerm}%`),
      ilike(advocates.lastName, `%${searchTerm}%`),
      ilike(advocates.city, `%${searchTerm}%`),
      ilike(advocates.degree, `%${searchTerm}%`),
      sql`${advocates.specialties}::text ILIKE ${'%' + searchTerm + '%'}`,
      sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${`%${searchTerm}%`}`
    )
    : undefined;

  const data = await db
    .select()
    .from(advocates)
    .where(whereCondition)
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates)
    .where(whereCondition);

  const total = Number(countResult[0].count);
  const totalPages = Math.ceil(total / limit);

  return Response.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  });
}
