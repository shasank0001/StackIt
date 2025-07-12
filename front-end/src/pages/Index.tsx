
import { useState } from "react";
import { TrendingUp, MessageSquare, Users, Clock, Eye, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { QuestionCard } from "@/components/QuestionCard";

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    title: "How to implement JWT authentication in React with TypeScript?",
    description: "I'm trying to set up JWT authentication in my React TypeScript app but having issues with token storage and refresh logic. The tokens seem to expire faster than expected and I'm getting CORS errors when trying to refresh them.",
    tags: ["React", "TypeScript", "JWT", "Authentication"],
    author: "john_dev",
    votes: 24,
    answers: 3,
    views: 1247,
    createdAt: "2 hours ago",
    hasAccepted: true
  },
  {
    id: 2,
    title: "Best practices for database indexing in PostgreSQL for high-traffic applications",
    description: "What are the recommended approaches for indexing in PostgreSQL when dealing with millions of records? I'm specifically interested in composite indexes and when to use partial indexes.",
    tags: ["PostgreSQL", "Database", "Performance", "Indexing"],
    author: "sarah_dba",
    votes: 18,
    answers: 5,
    views: 892,
    createdAt: "4 hours ago",
    hasAccepted: true
  },
  {
    id: 3,
    title: "React useEffect cleanup function not working as expected",
    description: "My cleanup function in useEffect doesn't seem to be running when component unmounts. I'm trying to clear an interval but it keeps running even after navigation.",
    tags: ["React", "Hooks", "JavaScript", "useEffect"],
    author: "mike_frontend",
    votes: 12,
    answers: 2,
    views: 456,
    createdAt: "6 hours ago",
    hasAccepted: false
  },
  {
    id: 4,
    title: "Optimizing Docker container build times for Node.js applications",
    description: "My Docker builds are taking 10+ minutes for a simple Node.js app. I've tried multi-stage builds but still seeing slow performance. Any suggestions for optimization?",
    tags: ["Docker", "Node.js", "DevOps", "Performance"],
    author: "alex_devops",
    votes: 31,
    answers: 7,
    views: 2103,
    createdAt: "8 hours ago",
    hasAccepted: true
  }
];

const Index = () => {
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">342</p>
                  <p className="text-sm text-muted-foreground">Users</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Tags</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Header and Filters */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">All Questions</h1>
              <p className="text-muted-foreground">
                {mockQuestions.length} questions found
              </p>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="votes">Most Voted</SelectItem>
                <SelectItem value="active">Most Active</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {mockQuestions.map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline">Load More Questions</Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
