import Courses from "@/app/api/db";

export function GET() {
    return Response.json(Courses())
}
