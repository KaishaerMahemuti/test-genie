const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate-tests', async (req, res) => {
  const { code, language, framework } = req.body;

  if (!code || !language || !framework) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const prompt = `
You are an expert software tester.
Generate ${framework} test cases for the following ${language} code.

Code:
${code}

Focus on edge cases, include mock functions if needed.
Output only the test code.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    const testCode = completion.choices[0].message.content.trim();
    res.json({ testCode });
  } catch (err) {
    console.error('OpenAI error:', err.message);
    res.status(500).json({ error: 'Failed to generate tests' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
