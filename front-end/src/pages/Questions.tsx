
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";

const Questions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Questions</h1>
          <p className="text-muted-foreground">All available questions will be displayed here.</p>
        </main>
      </div>
    </div>
  );
};

export default Questions;
