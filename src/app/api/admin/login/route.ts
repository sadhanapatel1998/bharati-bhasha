import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { activeTokens } from "@/server/lib/tokenStore";
import { connectToDB } from "@/server/lib/db";
import { Admin } from "@/server/models/Admin";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
  avatar?: string;
  lastLogin?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json().catch(() => ({}));

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "कृपया ईमेल एवं पासवर्ड प्रविष्ट करें।",
        },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    console.log("📧 Email:", cleanEmail);

    const db = await connectToDB();
    console.log("DB Connected:", !!db);

    let user: AdminUser | null = null;

    if (db) {
      // ===== DEBUG LOGS =====
      console.log("Current DB:", Admin.db.name);
      console.log("Collection:", Admin.collection.name);

      const allDocs = await Admin.collection.find({}).toArray();
      console.log("All Docs:", allDocs);

      // ===== FIND ADMIN =====
      const adminDoc = await Admin.findOne({ email: cleanEmail });
      console.log("Admin Found:", !!adminDoc);

      if (adminDoc) {
        const match = await bcrypt.compare(password, adminDoc.passwordHash);
        console.log("Password Match:", match);

        if (match) {
          const lastLogin = new Date().toLocaleString("hi-IN", {
            timeZone: "Asia/Kolkata",
          });

          adminDoc.lastLogin = lastLogin;
          await adminDoc.save();

          user = {
            id: String(adminDoc._id),
            name: adminDoc.name,
            email: adminDoc.email,
            role: adminDoc.role,
            designation: adminDoc.designation,
            avatar: adminDoc.avatar,
            lastLogin,
          };
        }
      }
    } else {
      // Temporary Demo Login
      if (
        cleanEmail === "admin@bharatibhasha.org" &&
        password === "admin123"
      ) {
        user = {
          id: "ADM-1001",
          name: "डॉ. सर्वेश कुमार शर्मा",
          email: cleanEmail,
          role: "मुख्य राष्ट्रीय प्रशासक",
          designation: "राष्ट्रीय परीक्षा नियंत्रण कक्ष (Demo Mode)",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
          lastLogin: new Date().toLocaleString("hi-IN", {
            timeZone: "Asia/Kolkata",
          }),
        };
      }
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "अमान्य क्रेडेंशियल्स! कृपया सही ईमेल व पासवर्ड प्रविष्ट करें।",
        },
        { status: 401 }
      );
    }

    const token = `token_bbo_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    activeTokens.set(token, user);

    const res = NextResponse.json({
      success: true,
      message: db
        ? "प्रशासक प्रमाणीकरण सफल रहा! डैशबोर्ड में स्वागत है।"
        : "प्रशासक प्रमाणीकरण सफल रहा! (डेमो मोड)",
      token,
      user,
    });

    res.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error("Login API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "सर्वर त्रुटि। कृपया पुनः प्रयास करें।",
      },
      { status: 500 }
    );
  }
}