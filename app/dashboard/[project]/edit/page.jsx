"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function EditPage({ params }) {
  const sp = useSearchParams();
  const path = sp.get("path");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/api/github/files/${params.project}?path=${path}`)
      .then(res => res.json())
      .then(data => setContent(atob(data.content)));
  }, [path]);

  const save = async () => {
    await fetch(`/api/github/commit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        repo: params.project,
        path,
        content,
        message: `Update ${path}`,
        sha: "", // 필요시 GitHub API에서 SHA 가져오기
      }),
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Editor
        height="90%"
        defaultLanguage="javascript"
        value={content}
        onChange={setContent}
      />
      <button className="px-4 py-2 bg-black text-white" onClick={save}>
        저장하기
      </button>
    </div>
  );
}
