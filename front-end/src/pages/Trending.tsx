import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, MessageSquare, Eye, Clock, User } from "lucide-react";

const Trending = () => {
  const trendingQuestions = [
    {
      id: 1,
      title: "How to implement JWT authentication in React with TypeScript?",
      excerpt: "I'm building a React app with TypeScript and need to implement JWT authentication. What's the best approach for handling tokens and user sessions?",
      author: "john_doe",
      views: 1247,
      answers: 8,
      votes: 45,
      tags: ["React", "TypeScript", "JWT", "Authentication"],
      timeAgo: "2 hours ago",
      trending: true
    },
    {
      id: 2,
      title: "Best practices for state management in large React applications",
      excerpt: "Our React app is growing and we're experiencing state management issues. Should we use Redux, Zustand, or Context API?",
      author: "sarah_dev",
      views: 892,
      answers: 12,
      votes: 38,
      tags: ["React", "State Management", "Redux", "Performance"],
      timeAgo: "4 hours ago",
      trending: true
    },
    {
      id: 3,
      title: "How to optimize database queries for better performance?",
      excerpt: "Our application is experiencing slow database queries. What are the best practices for optimizing SQL queries and database performance?",
      author: "db_expert",
      views: 567,
      answers: 6,
      votes: 29,
      tags: ["Database", "SQL", "Performance", "Optimization"],
      timeAgo: "6 hours ago",
      trending: true
    },
    {
      id: 4,
      title: "Implementing dark mode with CSS custom properties",
      excerpt: "I want to add dark mode to my website using CSS custom properties. What's the most efficient way to implement this?",
      author: "css_master",
      views: 445,
      answers: 4,
      votes: 22,
      tags: ["CSS", "Dark Mode", "Custom Properties", "Design"],
      timeAgo: "8 hours ago",
      trending: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-3xl font-bold">Trending Questions</h1>
                <p className="text-muted-foreground">
                  Most popular questions in the last 24 hours
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {trendingQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          <a href={`/question/${question.id}`} className="hover:text-primary transition-colors">
                            {question.title}
                          </a>
                        </CardTitle>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {question.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {question.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {question.trending && (
                        <Badge variant="destructive" className="ml-2">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{question.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{question.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{question.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{question.answers}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {question.votes} votes
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Trending Questions
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Trending; 