const aiIntegrate = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) return res.status(400).json({ message: "Prompt is required" });

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const generatedResult = result.response.text();

        return res.status(200).json({ message: generatedResult });
    } catch (error) {
        console.error("Error generating AI response:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = aiIntegrate