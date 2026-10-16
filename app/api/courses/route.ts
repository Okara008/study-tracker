import { db } from "@/app/api/db";

export function GET() {
    return Response.json(db.getAll())
}
