import mongoose from "mongoose";
import dns from "node:dns";

// Some ISPs/routers/Windows setups block or fail to resolve the
// `_mongodb._tcp.*` SRV DNS record that mongodb+srv:// URIs need.
// Forcing a public resolver + IPv4 fixes the common
// "querySrv ECONNREFUSED" error.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function connectToDB(): Promise<typeof mongoose | null> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    // No DB configured — caller should fall back to in-memory/mock data.
    console.warn("⚠️ MONGODB_URI not set — skipping DB connect, using fallback data.");
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  console.log("🔌 Connecting to MongoDB:", mongoUri.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:****@"));

  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(mongoUri, {
      bufferCommands: false,
      family: 4, // force IPv4 — avoids IPv6 connectivity issues on some networks
    });
  }

  try {
    await global._mongooseConn;
    console.log("✅ MongoDB connected");
    return mongoose;
  } catch (err) {
    global._mongooseConn = undefined;
    console.error("❌ MongoDB connection error:", err);
    return null;
  }
}
