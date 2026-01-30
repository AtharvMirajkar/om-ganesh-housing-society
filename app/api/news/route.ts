import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import News from "@/app/models/News";
import Admin, { AdminSchema } from "@/app/models/Admin";
import mongoose from "mongoose";
import { getSession } from "@/app/lib/auth";

// GET - Fetch all news (public for published, admin for all)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Ensure Admin model is registered
    if (!mongoose.models.Admin) {
      mongoose.model("Admin", AdminSchema);
    }

    const { searchParams } = new URL(request.url);
    const adminView = searchParams.get("admin") === "true";
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build query
    const query: Record<string, unknown> = {};

    if (adminView) {
      // Admin view - check authentication
      const session = await getSession();
      if (!session) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }
    } else {
      // Public view - only published news
      query.published = true;
    }

    if (category && category !== "all") {
      query.category = category;
    }

    const [news, total] = await Promise.all([
      News.find(query)
        .sort({ important: -1, publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "name")
        .lean(),
      News.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      news,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get news error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new news (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Ensure Admin model is registered
    if (!mongoose.models.Admin) {
      mongoose.model("Admin", AdminSchema);
    }

    const body = await request.json();
    const { title, excerpt, content, category, important, published } = body;

    // Validate input
    if (!title || !excerpt) {
      return NextResponse.json(
        { success: false, message: "Title and excerpt are required" },
        { status: 400 }
      );
    }

    const news = await News.create({
      title,
      excerpt,
      content,
      category: category || "General",
      important: important || false,
      published: published || false,
      publishedAt: published ? new Date() : undefined,
      createdBy: session.id,
    });

    return NextResponse.json({
      success: true,
      message: "News created successfully",
      news,
    });
  } catch (error) {
    console.error("Create news error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

