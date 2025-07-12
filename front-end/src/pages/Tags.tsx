
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Tags = () => {
  const tags = [
    { name: "React", count: 245, description: "A JavaScript library for building user interfaces" },
    { name: "JavaScript", count: 189, description: "High-level programming language for web development" },
    { name: "TypeScript", count: 156, description: "Typed superset of JavaScript" },
    { name: "Node.js", count: 134, description: "JavaScript runtime for server-side development" },
    { name: "CSS", count: 98, description: "Cascading Style Sheets for styling web pages" },
    { name: "Python", count: 87, description: "High-level programming language" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Tags</h1>
            <p className="text-muted-foreground">
              Browse questions by tags to find topics you're interested in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <Card key={tag.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-sm font-medium">
                      #{tag.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {tag.count} questions
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tag.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tags;
