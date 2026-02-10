import { type NextRequest, NextResponse } from "next/server";

// --- ADVANCED PROMPTS FOR THE ULTIMATE HYBRID ENGINE ---

// PROMPT 1: For the new AI Query Brainstorming step.
const TEXT_SYSTEM_PROMPT_BRAINSTORM_QUERIES = `You are a master research analyst. Your sole task is to take a user's raw text input and generate a JSON array of 3 to 5 diverse, highly effective search engine queries that will find factual news articles about the topic. Respond ONLY with the JSON array of strings.`;

// PROMPT 2: Used when LIVE web search results are available.
const TEXT_SYSTEM_PROMPT_VERIFY_WITH_CONTEXT = (claim: string, searchResults: any[], currentDate: string) => `You are a senior investigative editor, TrustShield. The current date is ${currentDate}. You have received a claim and a set of LIVE web search results. Your SOLE task is to analyze the provided search results to determine if the claim is true and you MUST cite your sources.
- If the search results contain multiple, reputable news sources confirming the claim, return a 'Verified Factual' verdict with a trustScore > 90.
- If the search results contradict the claim, return a 'Debunked' verdict with a trustScore < 10.
- If the search results are ambiguous or only from unreliable sources, return an 'Unverifiable - Lacks Evidence' verdict.
Base your reasoning STRICTLY on the provided search results. Respond ONLY with a JSON object: {"trustScore": number (0-100), "verdict": string, "reason": string, "sources": ["url1", "url2", ...]}. The 'sources' array MUST contain the URLs of the top 2-3 most relevant articles from the search results that support your verdict.
Claim to verify: "${claim}".
Live Search Results:
${JSON.stringify(searchResults, null, 2)}`;

// PROMPT 3: The FALLBACK, used when all web search attempts fail.
const TEXT_SYSTEM_PROMPT_INTERNAL_KNOWLEDGE = (claim: string, currentDate: string) => `You are a senior investigative editor, TrustShield. The current date is ${currentDate}. A comprehensive live web search returned no relevant results. Your task is to fallback and use your own vast internal knowledge base (pre-2024) to verify the following historical claim.
Your reasoning must clearly state that the claim was analyzed against internal data because a live web search was unsuccessful. Respond ONLY with a JSON object: {"trustScore": number (0-100), "verdict": string, "reason": string, "sources": []}. The 'sources' array MUST be empty.
Claim to verify: "${claim}".`;

const IMAGE_SYSTEM_PROMPT = `
You are an expert investigative journalist and forensic analyst named TrustShield. Your analysis is extremely rigorous. Respond ONLY with a strict JSON object: {"trustScore": number (0-100), "verdict": string, "reason": string, "sources": []}. The 'sources' array MUST be empty.
Your analysis MUST follow a FIVE-step process:
1.  **Technical Forensics:** Analyze pixels for signs of AI-generation or manipulation.
2.  **Source & Context Triangulation:** Identify the image's likely origin and common usage.
3.  **Content Plausibility:** Assess if the scene is plausible or extraordinary.
4.  **Geopolitical Analysis (MAPS OF INDIA ONLY):** Validate against the official sovereign map of India.
5.  **Editor's Final Call & Synthesis:** Your final verdict MUST prioritize context over technical authenticity. If a real image is used to mislead, the verdict MUST be "Misleading Context" with a low score.`;

// --- CORE FUNCTIONS ---
async function handleApiError(response: Response) {
    try {
        const errorBody = await response.json();
        return errorBody?.error?.message || `API request failed with status ${response.status}`;
    } catch (e) {
        return `API request failed with status ${response.status} (${response.statusText})`;
    }
}

async function performWebSearch(query: string) {
    if (!process.env.TAVILY_API_KEY) {
        console.error("TAVILY_API_KEY is not set. Web search will be skipped.");
        return [];
    }
    try {
        const response = await fetch("https://api.tavily.com/search", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: process.env.TAVILY_API_KEY, query: query, search_depth: "basic", max_results: 5
            }),
        });
        if (!response.ok) return [];
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Tavily search failed:", error);
        return [];
    }
}

export async function POST(req: NextRequest) {
    try {
        const { type, input } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
        }
        if (!type || !input || typeof input !== "string") {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        let result;
        if (type === "text") {
            result = await analyzeTextWithUltimateHybridEngine(input, process.env.OPENAI_API_KEY);
        } else if (type === "image" || type === "imageUrl") {
            result = await analyzeImageAdvanced(input, process.env.OPENAI_API_KEY);
        } else {
            return NextResponse.json({ error: "Invalid analysis type." }, { status: 400 });
        }

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("[API_ANALYZE_ERROR]", error);
        return NextResponse.json({ error: "An unexpected error occurred.", detail: error.message }, { status: 500 });
    }
}


// --- ULTIMATE HYBRID ANALYSIS ENGINE FUNCTIONS ---

async function analyzeTextWithUltimateHybridEngine(text: string, apiKey: string) {
    // Step 1: Brainstorm a list of enhanced search queries.
    const brainstormResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: TEXT_SYSTEM_PROMPT_BRAINSTORM_QUERIES }, { role: "user", content: text }],
            response_format: { type: "json_object" },
        }),
    });

    let searchQueries = [text]; // Fallback to the original text if brainstorming fails
    if (brainstormResponse.ok) {
        try {
            const brainstormData = await brainstormResponse.json();
            const parsedQueries = JSON.parse(brainstormData?.choices?.[0]?.message?.content);
            if (Array.isArray(parsedQueries) && parsedQueries.length > 0) {
                searchQueries = parsedQueries;
            }
        } catch (e) {
            console.error("Failed to parse brainstormed queries, using original text.");
        }
    }

    // Step 2: Iteratively try each query until results are found.
    let searchResults = [];
    for (const query of searchQueries) {
        const results = await performWebSearch(query);
        if (results && results.length > 0) {
            searchResults = results;
            break; // Stop on the first successful search
        }
    }

    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    let verificationPrompt;

    // Step 3: Choose the correct analysis path.
    if (searchResults.length > 0) {
        verificationPrompt = TEXT_SYSTEM_PROMPT_VERIFY_WITH_CONTEXT(text, searchResults, currentDate);
    } else {
        verificationPrompt = TEXT_SYSTEM_PROMPT_INTERNAL_KNOWLEDGE(text, currentDate);
    }
    
    // Step 4: Execute the chosen analysis.
    const verificationResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "system", content: verificationPrompt }],
            response_format: { type: "json_object" },
        }),
    });

    if (!verificationResponse.ok) {
        const errorMessage = await handleApiError(verificationResponse);
        throw new Error(errorMessage);
    }
    const verificationData = await verificationResponse.json();
    return JSON.parse(verificationData.choices[0].message.content);
}

async function analyzeImageAdvanced(imageUrl: string, apiKey: string) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [
                { role: "system", content: IMAGE_SYSTEM_PROMPT },
                { role: "user", content: [{ type: "image_url", image_url: { url: imageUrl } }] }
            ],
            response_format: { type: "json_object" },
        }),
    });
    if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
    }
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}

