import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, MessageSquare, Eye, User, Clock, Filter, Folder, Trash2, Share2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Saved = () => {
  const savedQuestions = [
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
      savedAt: "1 day ago",
      folder: "Authentication"
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
      savedAt: "2 days ago",
      folder: "React"
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
      savedAt: "3 days ago",
      folder: "Database"
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
      savedAt: "1 week ago",
      folder: "CSS"
    },
    {
      id: 5,
      title: "Setting up CI/CD pipeline with GitHub Actions",
      excerpt: "I want to set up a CI/CD pipeline for my React app using GitHub Actions. Can someone provide a step-by-step guide?",
      author: "devops_new",
      views: 167,
      answers: 0,
      votes: 4,
      tags: ["CI/CD", "GitHub Actions", "Deployment", "DevOps"],
      timeAgo: "6 hours ago",
      savedAt: "1 week ago",
      folder: "DevOps"
    }
  ];

  const folders = [
    { name: "All", count: 5 },
    { name: "React", count: 2 },
    { name: "Authentication", count: 1 },
    { name: "Database", count: 1 },
    { name: "CSS", count: 1 },
    { name: "DevOps", count: 1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Bookmark className="w-8 h-8 text-blue-500" />
                <div>
                  <h1 className="text-3xl font-bold">Saved Questions</h1>
                  <p className="text-muted-foreground">
                    Your bookmarked questions and resources
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Saved</SelectItem>
                    <SelectItem value="recent">Recently Saved</SelectItem>
                    <SelectItem value="oldest">Oldest Saved</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                {folders.map((folder) => (
                  <TabsTrigger key={folder.name} value={folder.name.toLowerCase()} className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    {folder.name}
                    <Badge variant="secondary" className="text-xs">
                      {folder.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {savedQuestions.map((question) => (
                    <Card key={question.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">
                                <a href={`/question/${question.id}`} className="hover:text-primary transition-colors">
                                  {question.title}
                                </a>
                              </CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                {question.folder}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {question.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {question.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Saved {question.savedAt}
                            </div>
                          </div>
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
              </TabsContent>

              {folders.slice(1).map((folder) => (
                <TabsContent key={folder.name} value={folder.name.toLowerCase()} className="mt-6">
                  <div className="space-y-4">
                    {savedQuestions
                      .filter((question) => question.folder === folder.name)
                      .map((question) => (
                        <Card key={question.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
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
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Share2 className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Saved {question.savedAt}
                                </div>
                              </div>
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
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Saved Questions
              </Button>
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <div className="text-center">
                <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Organize Your Knowledge</h3>
                <p className="text-muted-foreground mb-4">
                  Create folders to organize your saved questions and build your personal knowledge base.
                </p>
                <Button>
                  <Folder className="w-4 h-4 mr-2" />
                  Create New Folder
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Saved; 