// app/dashboard/[repo]/page.jsx
export default function RepoPage({ params }) {
    return (
      <div>
        <h1>Repo: {params.repo}</h1>
        <p>여기에 해당 repo 콘텐츠를 렌더링합니다.</p>
      </div>
    );
  }
  