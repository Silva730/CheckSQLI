import { Router } from "express";
import { scanUrl } from "../scanner/scanner.js";

const router = Router();

router.post("/scan", async (req, res) => {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "URL is required" });
    }
    if (
        url.startsWith("http://localhost") ||
        url.startsWith("http://127.0.0.1") ||
        url.startsWith("http://0.0.0.0") ||
        url.includes("://localhost") ||
        url.includes("://127.0.0.1")
    ) {
        return res.status(400).json({ error: "URL is not allowed" });
    }
    try {
        const report = await scanUrl(url);
        return res.json(report);
    } catch (error) {
        console.error("Error scanning URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

export default router;