const dotenv = require('dotenv');
const { GoogleGenAI } = require("@google/genai");
dotenv.config()

const aiIntegrate = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) return res.status(400).json({ message: "Prompt is required" });

        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${prompt} i am beginer in coding please the code line by line. next take a input and dryrun the code line by line.`,
          }); 

        return res.status(200).json({ message: response.text });
    } catch (error) {
        console.error("Error generating AI response:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = aiIntegrate