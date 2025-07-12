
import { useEffect, useState } from "react";
import api from "../lib/api";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    api.get("/api/questions").then(res => {
      if (res.data.success && Array.isArray(res.data.questions)) {
        setQuestions(res.data.questions);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Questions</h1>
          {questions.length === 0 ? (
            <p className="text-muted-foreground">No questions found.</p>
          ) : (
            <ul>
              {questions.map((q: any) => (
                <li key={q.id}>{q.title}</li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
};

export default Questions;
