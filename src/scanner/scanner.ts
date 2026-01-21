import axios from "axios";
import { payloads } from "./payloads.js";

const client = axios.create({
    timeout: 8000,
    validateStatus: () => true,
});

type Detail = {
    payload: string;
    reason: string;
};

type Report = {
    url: string;
    vulnerable: boolean;
    details: Detail[];
};

const SQL_ERRORS = [
    "sql syntax",
    "mysql",
    "postgres",
    "syntax error",
    "unterminated",
    "odbc",
    "pdo",
];

const TEST_PARAM = "id";

export async function scanUrl(url: string): Promise<Report> {
    const report: Report = {
        url,
        vulnerable: false,
        details: [],
    };

    
    let baselineSize = 0;

    try {
        const baseRes = await client.get(url);
        baselineSize = baseRes.data?.toString().length || 0;
    } catch {
        return report;
    }

    for (const payload of payloads) {
        const testUrl = `${url}?${TEST_PARAM}=${encodeURIComponent(payload)}`;

        try {
            const start = Date.now();
            const res = await client.get(testUrl);
            const elapsed = Date.now() - start;

            const body = res.data?.toString().toLowerCase() || "";
            const sizeDiff = Math.abs(body.length - baselineSize);

            
            if (res.status >= 500) {
                mark(report, payload, `HTTP ${res.status}`);
            }

            
            if (SQL_ERRORS.some(err => body.includes(err))) {
                mark(report, payload, "SQL error message detected");
            }

            
            if (sizeDiff > 1000) {
                mark(report, payload, "Response size differs from baseline");
            }

            
            if (payload.toLowerCase().includes("sleep") && elapsed > 4000) {
                mark(report, payload, `Time delay detected (${elapsed}ms)`);
            }

        } catch {

        }
    }

    return report;
}

function mark(report: Report, payload: string, reason: string) {
    report.vulnerable = true;

    
    if (!report.details.find(d => d.payload === payload && d.reason === reason)) {
        report.details.push({ payload, reason });
    }
}
