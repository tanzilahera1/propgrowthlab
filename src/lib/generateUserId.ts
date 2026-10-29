import UserModel from "@/models/User";

/**
 * Compact Professional User ID Generator (YYMM0001 format)
 * Example: For 2026 October, prefix will be "PGL-2610", returning "PGL-2610-0001", etc.
 */
export const generateUserId = async (): Promise<string> => {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `PGL-${year}${month}`;

  try {
    const lastUser = await UserModel.findOne({
      userId: { $regex: `^${prefix}` },
    })
      .sort({ userId: -1 })
      .limit(1);

    let sequenceNumber = 1;

    if (lastUser && lastUser.userId) {
      const parts = lastUser.userId.split("-");
      const lastNum = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(lastNum)) {
        sequenceNumber = lastNum + 1;
      }
    }

    const formattedSequence = String(sequenceNumber).padStart(4, "0");
    return `${prefix}-${formattedSequence}`;
  } catch (err) {
    console.error("Error generating userId, falling back to timestamp:", err);
    return `${prefix}-${Date.now().toString().slice(-4)}`;
  }
};
