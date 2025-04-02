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

  // 🧠 Dynamic prompt builder based on language/framework
  let prompt = `You are an expert software tester.\n`;

  switch (language) {
    case 'javascript':
      prompt += `Generate test cases using ${framework} for the following JavaScript code.\n`;
      break;
    case 'python':
      prompt += `Generate test cases using ${framework} for the following Python code.\n`;
      break;
    case 'java':
      prompt += `Generate JUnit test cases for the following Java code.\nUse standard JUnit 5 style with proper annotations.\n`;
      break;
    case 'swift':
      prompt += `Generate XCTest test cases for the following Swift code.\nMake sure the tests are in idiomatic Swift.\n`;
      break;
    default:
      prompt += `Generate generic test cases for this ${language} code using ${framework}.\n`;
  }

  prompt += `\nCode:\n${code}\n\nInclude edge cases. Use mock functions or objects where needed.\nOutput only the test code.`;

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
