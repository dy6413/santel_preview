"use client";

import { useEffect, useState } from "react";

function TreeNode({ node }) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (node.type !== "dir") return;
    if (!expanded) {
      setLoading(true);
      const res = await fetch(`/api/github/files?path=${encodeURIComponent(node.path)}`);
      const data = await res.json();
      setChildren(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    setExpanded(!expanded);
  };

  return (
    <div style={{ paddingLeft: 20 }}>
      <div onClick={toggle} style={{ cursor: node.type === "dir" ? "pointer" : "default" }}>
        {node.type === "dir" ? (expanded ? "▼ " : "▶︎ ") : "📄 "}
        {node.name}
      </div>
      {expanded && (
        <div style={{ marginLeft: 16 }}>
          {loading ? <p>Loading...</p> : children.map(child => (
            <TreeNode key={child.sha} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RepoPage() {
  const [rootNodes, setRootNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/github/files")
      .then(res => res.json())
      .then(data => setRootNodes(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading root files...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Repo 파일 트리 구조</h2>
      {rootNodes.length === 0 ? (
        <p>파일이 없습니다.</p>
      ) : (
        rootNodes.map(node => <TreeNode key={node.sha} node={node} />)
      )}
    </div>
  );
}
