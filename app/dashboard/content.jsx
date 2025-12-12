"use client";
import React from "react";

export default function Content({ repos }) {
  return (
    <div className="sidebar">
      {repos && repos.length > 0 ? (
        repos.map((repo) => <div key={repo}>{repo}</div>)
      ) : (
        <p>No repositories found</p>
      )}
    </div>
  );
}
