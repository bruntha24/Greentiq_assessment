import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000/api/company";

// GET /api/company
export async function GET() {
  try {
    const res = await fetch(BACKEND_URL, { cache: "no-store" });
    const companies = await res.json();
    return NextResponse.json(companies, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
  }
}

// POST /api/company
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const company = await res.json();
    return NextResponse.json(company, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create company" }, { status: 500 });
  }
}

// PUT /api/company?id=<id>
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const data = await req.json();
    const res = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updatedCompany = await res.json();
    return NextResponse.json(updatedCompany, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
  }
}

// DELETE /api/company?id=<id>
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const res = await fetch(`${BACKEND_URL}/${id}`, { method: "DELETE" });
    const deleted = await res.json();
    return NextResponse.json(deleted, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete company" }, { status: 500 });
  }
}
