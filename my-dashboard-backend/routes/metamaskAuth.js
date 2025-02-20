// routes/metamaskAuth.js

const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");

// Pull the whitelist from your environment, DB, or a config file
const whitelistedAddresses = process.env.WHITELISTED_ADDRESSES
  ? process.env.WHITELISTED_ADDRESSES.split(",").map(addr => addr.trim().toLowerCase())
  : [];

/**
 * Verify the signature
 */
function verifySignature(message, signature, claimedAddress) {
  try {
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === claimedAddress.toLowerCase();
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}

/**
 * Check if the address is whitelisted
 */
function isAddressWhitelisted(address) {
  return whitelistedAddresses.includes(address.toLowerCase());
}

/**
 * POST /api/metamask/login
 */
router.post("/login", async (req, res) => {
  const { message, signature, address } = req.body;

  // 1. Verify signature
  if (!verifySignature(message, signature, address)) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // 2. Check whitelist
  if (!isAddressWhitelisted(address)) {
    return res.status(403).json({ error: "Address not whitelisted" });
  }

  // 3. If successful, return some token or session info
  return res.json({
    success: true,
    message: "Login successful",
    address,
  });
});

module.exports = router;