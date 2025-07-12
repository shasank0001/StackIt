
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Users = () => {
  const users = [
    { name: "john_dev", questions: 12, answers: 45, reputation: 1250, tags: ["React", "JavaScript"] },
    { name: "sarah_dba", questions: 8, answers: 67, reputation: 2100, tags: ["PostgreSQL", "Database"] },
    { name: "mike_frontend", questions: 15, answers: 23, reputation: 890, tags: ["CSS", "HTML", "React"] },
    { name: "alex_devops", questions: 6, answers: 34, reputation: 1450, tags: ["Docker", "AWS"] }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Users</h1>
            <p className="text-muted-foreground">
              Discover the community members contributing to StackIt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card key={user.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar>
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.reputation} reputation</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-lg font-bold">{user.questions}</p>
                      <p className="text-xs text-muted-foreground">Questions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{user.answers}</p>
                      <p className="text-xs text-muted-foreground">Answers</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {user.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
