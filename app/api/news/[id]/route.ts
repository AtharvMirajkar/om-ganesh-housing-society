import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import News from "@/app/models/News";
import Admin, { AdminSchema } from "@/app/models/Admin";
import mongoose from "mongoose";
import { getSession } from "@/app/lib/auth";

// GET - Fetch single news
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // Ensure Admin model is registered
    if (!mongoose.models.Admin) {
      mongoose.model("Admin", AdminSchema);
    }

    const { id } = await params;
    const news = await News.findById(id).populate("createdBy", "name").lean();

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    // Check if news is published or if admin is viewing
    if (!news.published) {
      const session = await getSession();
      if (!session) {
        return NextResponse.json(
          { success: false, message: "News not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      news,
    });
  } catch (error) {
    console.error("Get news error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update news
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, content, category, important, published } = body;

    // Build update object
    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (important !== undefined) updateData.important = important;
    if (published !== undefined) {
      updateData.published = published;
      if (published) {
        updateData.publishedAt = new Date();
      }
    }

    const news = await News.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "News updated successfully",
      news,
    });
  } catch (error) {
    console.error("Update news error:", error);

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

// DELETE - Delete news
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Delete news error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

