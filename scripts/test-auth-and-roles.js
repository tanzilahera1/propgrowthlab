const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const dotenv = require("dotenv");

const envConfig = dotenv.parse(fs.readFileSync(".env.local"));

async function runTests() {
  console.log("=== COMMENCING AUTOMATED TEST SUITE ===");
  await mongoose.connect(envConfig.MONGODB_URI);
  const db = mongoose.connection.db;

  const testAccounts = [
    { email: "arif2758@gmail.com", expectedRole: "SUPER_ADMIN", shouldAccessAdmin: true },
    { email: "user@gmail.com", expectedRole: "USER", shouldAccessAdmin: false },
    { email: "broker@gmail.com", expectedRole: "BROKER", shouldAccessAdmin: false },
    { email: "client@gmail.com", expectedRole: "CLIENT", shouldAccessAdmin: false },
    { email: "partner@gmail.com", expectedRole: "PARTNER", shouldAccessAdmin: false },
    { email: "operator@gmail.com", expectedRole: "OPERATOR", shouldAccessAdmin: true },
  ];

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passedTests++;
    } else {
      console.error(`  [FAIL] ${message}`);
    }
  }

  // TEST 1: Password Verification
  console.log("\n--- TEST 1: CREDENTIALS AUTHENTICATION ---");
  for (const acc of testAccounts) {
    const user = await db.collection("users").findOne({ email: acc.email });
    assert(Boolean(user), `User ${acc.email} exists in database`);
    assert(user && user.role === acc.expectedRole, `User ${acc.email} has role '${acc.expectedRole}'`);

    const isMatch = await bcrypt.compare("Aa123456", user.password);
    assert(isMatch, `Password 'Aa123456' successfully verified for ${acc.email}`);

    const badMatch = await bcrypt.compare("WrongPassword123", user.password);
    assert(!badMatch, `Invalid password correctly rejected for ${acc.email}`);
  }

  // TEST 2: RBAC Route Guard Simulation (src/proxy.ts logic)
  console.log("\n--- TEST 2: RBAC ROUTE GUARD PERMISSIONS ---");
  function isStaffRole(role) {
    if (!role || typeof role !== "string") return false;
    const normalized = role.trim().toUpperCase();
    return (
      normalized === "SUPER_ADMIN" ||
      normalized === "ADMIN" ||
      normalized === "OPERATOR" ||
      normalized === "SUPERADMIN" ||
      normalized === "OWNER" ||
      role === "Platform Owner" ||
      role === "System Administrator"
    );
  }

  for (const acc of testAccounts) {
    const user = await db.collection("users").findOne({ email: acc.email });
    const canAccessAdmin = isStaffRole(user.role);
    assert(
      canAccessAdmin === acc.shouldAccessAdmin,
      `${acc.email} (${user.role}) admin route access: ${canAccessAdmin ? "ALLOWED" : "DENIED"} (expected: ${acc.shouldAccessAdmin ? "ALLOWED" : "DENIED"})`
    );
  }

  // TEST 3: Database Entities Completeness
  console.log("\n--- TEST 3: DATABASE COLLECTIONS RECORD VERIFICATION ---");
  const leadsCount = await db.collection("leads").countDocuments();
  assert(leadsCount >= 10, `Leads collection has ${leadsCount} records (>= 10 required)`);

  const ordersCount = await db.collection("orders").countDocuments();
  assert(ordersCount >= 8, `Orders collection has ${ordersCount} records (>= 5 required)`);

  const partnerCount = await db.collection("partnerapplications").countDocuments();
  assert(partnerCount >= 8, `Partner applications has ${partnerCount} records (>= 5 required)`);

  const subsCount = await db.collection("subscriptions").countDocuments();
  assert(subsCount >= 7, `Subscriptions collection has ${subsCount} records (>= 5 required)`);

  const escrowCount = await db.collection("escrowdeals").countDocuments();
  assert(escrowCount >= 6, `Escrow deals collection has ${escrowCount} records (>= 5 required)`);

  console.log("\n===========================================");
  console.log(`TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED!`);
  console.log("===========================================");

  await mongoose.connection.close();

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("TEST EXECUTION ERROR:", err);
  process.exit(1);
});

