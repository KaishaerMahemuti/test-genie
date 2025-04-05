import React, { useState, useEffect } from 'react';

const FileExplorer = ({ repoUrl, onFileSelect }) => {
  const [tree, setTree] = useState([]);
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');

  useEffect(() => {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)(?:\/|$)/);
    if (!match) return;

    const [_, ownerName, repoName] = match;
    setOwner(ownerName);
    setRepo(repoName);

    const fetchTree = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/git/trees/main?recursive=1`);
        const data = await res.json();
        if (data && data.tree) {
          const filesOnly = data.tree.filter(item => item.type === 'blob');
          setTree(filesOnly);
        }
      } catch (err) {
        console.error('Failed to fetch repo tree', err);
      }
    };

    fetchTree();
  }, [repoUrl]);

  const handleClick = async (path) => {
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`);
      const content = await res.text();
      onFileSelect(content);
    } catch (err) {
      console.error('Failed to load file', err);
    }
  };

  return (
    <div className="border p-3 rounded bg-light mb-3">
      <h6>📁 Repo File Explorer</h6>
      {tree.length === 0 ? (
        <p className="text-muted">Loading files...</p>
      ) : (
        <ul className="list-unstyled" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {tree.map((file) => (
            <li key={file.path}>
              <button
                className="btn btn-link text-start"
                style={{ fontSize: '0.9rem' }}
                onClick={() => handleClick(file.path)}
              >
                📄 {file.path}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileExplorer;
