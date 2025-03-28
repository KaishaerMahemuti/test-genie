import React, { useState } from 'react';

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('jest');
  const [testOutput, setTestOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setCode(e.target.result);
    reader.readAsText(file);
  };

  const handleGenerateTest = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setTestOutput(""); // Clear old result
  
    try {
      const response = await fetch('http://localhost:5002/generate-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, framework }),
      });
  
      const data = await response.json();
      setTestOutput(response.ok ? data.testCode : `❌ Error: ${data.error}`);
    } catch (err) {
      console.error(err);
      setTestOutput('❌ Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🧪 Test Genie</h1>

      <div className="mb-3">
        <label className="form-label">Paste your code:</label>
        <textarea
          className="form-control"
          rows="8"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload a code file:</label>
        <input type="file" className="form-control" onChange={handleFileUpload} />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Language</label>
          <select
            className="form-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="col">
          <label className="form-label">Testing Framework</label>
          <select
            className="form-select"
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
          >
            <option value="jest">Jest</option>
            <option value="mocha">Mocha</option>
            <option value="pytest">PyTest</option>
          </select>
        </div>
      </div>

      <div className="text-center">
      <button className="btn btn-primary" onClick={handleGenerateTest} disabled={isLoading}>
  {isLoading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Generating...
    </>
  ) : (
    '✨ Generate Tests'
  )}
</button>

      </div>

      {testOutput && (
        <div className="mt-5">
          <h5>Generated Test Code:</h5>
          <pre className="bg-light p-3 border rounded">
            <code>{testOutput}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
