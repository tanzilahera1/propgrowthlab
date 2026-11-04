import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Territory from "@/models/Territory";

export async function GET(request: NextRequest) {
  await connection();

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country");
    const division = searchParams.get("division");
    const district = searchParams.get("district");
    const upazila = searchParams.get("upazila");
    const tier = searchParams.get("tier");
    const code = searchParams.get("code");

    const query: Record<string, unknown> = { status: "active" };

    if (code) {
      query.code = code.toUpperCase();
    }
    if (country) {
      query.countryCode = country.toUpperCase();
    }
    if (division) {
      query.divisionOrState = { $regex: new RegExp(division, "i") };
    }
    if (district) {
      query.districtOrCity = { $regex: new RegExp(district, "i") };
    }
    if (upazila) {
      query.upazilaOrThana = { $regex: new RegExp(upazila, "i") };
    }
    if (tier) {
      query.tier = tier;
    }

    const territories = await Territory.find(query)
      .sort({ countryName: 1, upazilaOrThana: 1 })
      .limit(100);

    // Grouping metadata for cascading UI selectors
    const countries = await Territory.distinct("countryName", { status: "active" });
    const divisions = country
      ? await Territory.distinct("divisionOrState", {
          countryCode: country.toUpperCase(),
          status: "active",
        })
      : [];
    const districts = division
      ? await Territory.distinct("districtOrCity", {
          divisionOrState: { $regex: new RegExp(division, "i") },
          status: "active",
        })
      : [];
    const upazilas = district
      ? await Territory.distinct("upazilaOrThana", {
          districtOrCity: { $regex: new RegExp(district, "i") },
          status: "active",
        })
      : [];

    return NextResponse.json({
      success: true,
      count: territories.length,
      hierarchy: {
        countries,
        divisions,
        districts,
        upazilas,
      },
      territories: territories.map((t) => ({
        id: t._id.toString(),
        code: t.code,
        countryCode: t.countryCode,
        countryName: t.countryName,
        divisionOrState: t.divisionOrState,
        districtOrCity: t.districtOrCity,
        upazilaOrThana: t.upazilaOrThana,
        microZone: t.microZone,
        postalCode: t.postalCode || "",
        tier: t.tier,
        activeBrokersCount: t.activeBrokersCount,
        monthlyQuotaAllocation: t.monthlyQuotaAllocation,
        exclusiveBroker: t.exclusiveBrokerName || "Open Pool",
        status: t.status,
      })),
    });
  } catch (error: unknown) {
    console.error("GET /api/territories error:", error);
    return NextResponse.json(
      { message: "Failed to query territory directory." },
      { status: 500 }
    );
  }
}

