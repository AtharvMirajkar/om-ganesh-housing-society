import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Admin from "@/app/models/Admin";
import { getSession } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, secretKey } = await request.json();

    // Check if this is the first admin (no auth needed) or requires auth
    const adminCount = await Admin.countDocuments();

    if (adminCount > 0) {
      // Check for secret key for subsequent registrations
      const validSecretKey = process.env.ADMIN_SECRET_KEY || "om-ganesh-admin-2024";
      
      if (secretKey !== validSecretKey) {
        // Check if request is from authenticated superadmin
        const session = await getSession();
        if (!session || session.role !== "superadmin") {
          return NextResponse.json(
            { success: false, message: "Unauthorized. Invalid secret key or insufficient permissions." },
            { status: 403 }
          );
        }
      }
    }

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin with this email already exists" },
        { status: 409 }
      );
    }

    // Create new admin (first admin is superadmin)
    const admin = await Admin.create({
      name,
      email,
      password,
      role: adminCount === 0 ? "superadmin" : "admin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin registered successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    
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

