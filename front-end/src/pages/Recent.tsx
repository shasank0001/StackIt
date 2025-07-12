import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, Eye, User, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Recent = () => {
  const recentQuestions = [
    {
      id: 1,
      title: "How to set up a Next.js project with TypeScript and Tailwind CSS?",
      excerpt: "I'm starting a new project and want to use Next.js with TypeScript and Tailwind CSS. What's the best way to set this up?",
      author: "new_dev",
      views: 23,
      answers: 0,
      votes: 2,
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Setup"],
      timeAgo: "5 minutes ago",
      isNew: true
    },
    {
      id: 2,
      title: "Understanding React hooks: useEffect vs useLayoutEffect",
      excerpt: "Can someone explain the difference between useEffect and useLayoutEffect? When should I use each one?",
      author: "react_learner",
      views: 45,
      answers: 1,
      votes: 3,
      tags: ["React", "Hooks", "useEffect", "useLayoutEffect"],
      timeAgo: "12 minutes ago",
      isNew: true
    },
    {
      id: 3,
      title: "Best way to handle form validation in React",
      excerpt: "I'm building a form in React and need to implement validation. Should I use a library like Formik or build it from scratch?",
      author: "form_builder",
      views: 67,
      answers: 2,
      votes: 1,
      tags: ["React", "Forms", "Validation", "Formik"],
      timeAgo: "25 minutes ago",
      isNew: false
    },
    {
      id: 4,
      title: "How to deploy a React app to Vercel?",
      excerpt: "I have a React app ready and want to deploy it to Vercel. What are the steps and best practices?",
      author: "deploy_master",
      views: 89,
      answers: 3,
      votes: 5,
      tags: ["React", "Deployment", "Vercel", "Hosting"],
      timeAgo: "1 hour ago",
      isNew: false
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox: When to use which?",
      excerpt: "I'm confused about when to use CSS Grid vs Flexbox. Can someone provide clear examples and use cases?",
      author: "css_enthusiast",
      views: 156,
      answers: 4,
      votes: 8,
      tags: ["CSS", "Grid", "Flexbox", "Layout"],
      timeAgo: "2 hours ago",
      isNew: false
    },
    {
      id: 6,
      title: "Setting up authentication with Firebase in React",
      excerpt: "I want to add user authentication to my React app using Firebase. What's the best approach?",
      author: "firebase_dev",
      views: 234,
      answers: 6,
      votes: 12,
      tags: ["React", "Firebase", "Authentication", "Security"],
      timeAgo: "3 hours ago",
      isNew: false
    }
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
                <Clock className="w-8 h-8 text-blue-500" />
                <div>
                  <h1 className="text-3xl font-bold">Recent Questions</h1>
                  <p className="text-muted-foreground">
                    Latest questions from the community
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Questions</SelectItem>
                    <SelectItem value="unanswered">Unanswered</SelectItem>
                    <SelectItem value="answered">Answered</SelectItem>
                    <SelectItem value="new">New (24h)</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {recentQuestions.map((question) => (
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
                      {question.isNew && (
                        <Badge variant="default" className="ml-2 bg-green-500">
                          New
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
                Load More Recent Questions
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Recent; 