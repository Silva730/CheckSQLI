import axios from "axios";
import { payloads } from "./payloads.js";

const client = axios.create({
    timeout: 5000,
    validateStatus: () => true,
});

type Report = {
    url: string;
    vulnerable: boolean;
    details: string[];
};

export async function scanUrl(url: string): Promise<Report> {
    const report: Report = {
        url,
        vulnerable: false,
        details: [],
    };

    for (const payload of payloads) {
        const testUrl = `${url}${payload}`;

        try {
            const res = await client.get(testUrl);
            const body = res.data?.toString().toLowerCase() || "";

            if (res.status >= 500) {
                report.vulnerable = true;
                report.details.push(
                    `Payload "${payload}" causou erro ${res.status}`
                );
            }

            if (
                body.includes("sql") ||
                body.includes("syntax") ||
                body.includes("mysql") ||
                body.includes("postgres")
            ) {
                report.vulnerable = true;
                report.details.push(
                    `Payload "${payload}" retornou erro de banco`
                );
            }
        } catch (err) {
            report.details.push(
                `Erro ao testar payload "${payload}"`
            );
        }
    }

    return report;
}
