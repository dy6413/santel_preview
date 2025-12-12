export default function ProjectPage({ params }) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">{params.project}</h1>
        <p>여기에 해당 프로젝트의 파일 목록, 수정기 등이 들어갑니다.</p>
      </div>
    );
  }
  