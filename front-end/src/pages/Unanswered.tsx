import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, Eye, User, Clock, Filter, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Unanswered = () => {
  const unansweredQuestions = [
    {
      id: 1,
      title: "How to implement infinite scrolling with React Query?",
      excerpt: "I'm trying to implement infinite scrolling in my React app using React Query. Can someone help me with the implementation?",
      author: "scroll_dev",
      views: 156,
      answers: 0,
      votes: 5,
      tags: ["React", "React Query", "Infinite Scroll", "Performance"],
      timeAgo: "30 minutes ago",
      bounty: 50
    },
    {
      id: 2,
      title: "Best practices for error handling in Node.js APIs",
      excerpt: "I'm building a REST API with Node.js and Express. What are the best practices for error handling and logging?",
      author: "api_builder",
      views: 89,
      answers: 0,
      votes: 3,
      tags: ["Node.js", "Express", "Error Handling", "API"],
      timeAgo: "2 hours ago",
      bounty: 25
    },
    {
      id: 3,
      title: "How to optimize images for web performance?",
      excerpt: "My website has many images and they're affecting loading speed. What are the best techniques for image optimization?",
      author: "web_perf",
      views: 234,
      answers: 0,
      votes: 8,
      tags: ["Performance", "Images", "Web Optimization", "SEO"],
      timeAgo: "4 hours ago",
      bounty: 75
    },
    {
      id: 4,
      title: "Setting up CI/CD pipeline with GitHub Actions",
      excerpt: "I want to set up a CI/CD pipeline for my React app using GitHub Actions. Can someone provide a step-by-step guide?",
      author: "devops_new",
      views: 167,
      answers: 0,
      votes: 4,
      tags: ["CI/CD", "GitHub Actions", "Deployment", "DevOps"],
      timeAgo: "6 hours ago",
      bounty: 40
    },
    {
      id: 5,
      title: "How to implement real-time notifications with WebSockets?",
      excerpt: "I need to add real-time notifications to my web app. What's the best way to implement this using WebSockets?",
      author: "realtime_dev",
      views: 123,
      answers: 0,
      votes: 6,
      tags: ["WebSockets", "Real-time", "Notifications", "JavaScript"],
      timeAgo: "8 hours ago",
      bounty: 60
    },
    {
      id: 6,
      title: "Best way to handle state in large Vue.js applications",
      excerpt: "Our Vue.js app is growing and we need a better state management solution. Should we use Vuex or Pinia?",
      author: "vue_master",
      views: 198,
      answers: 0,
      votes: 7,
      tags: ["Vue.js", "State Management", "Vuex", "Pinia"],
      timeAgo: "12 hours ago",
      bounty: 35
    },
    {
      id: 7,
      title: "How to implement search functionality with Elasticsearch?",
      excerpt: "I want to add advanced search to my application using Elasticsearch. What's the best approach for implementation?",
      author: "search_dev",
      views: 145,
      answers: 0,
      votes: 9,
      tags: ["Elasticsearch", "Search", "Backend", "Database"],
      timeAgo: "1 day ago",
      bounty: 100
    },
    {
      id: 8,
      title: "Setting up automated testing with Jest and React Testing Library",
      excerpt: "I need to set up comprehensive testing for my React app. How do I configure Jest and React Testing Library?",
      author: "test_enthusiast",
      views: 112,
      answers: 0,
      votes: 2,
      tags: ["Testing", "Jest", "React Testing Library", "Quality Assurance"],
      timeAgo: "1 day ago",
      bounty: 30
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
                <HelpCircle className="w-8 h-8 text-red-500" />
                <div>
                  <h1 className="text-3xl font-bold">Unanswered Questions</h1>
                  <p className="text-muted-foreground">
                    Questions waiting for your expertise
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Questions</SelectItem>
                    <SelectItem value="bounty">Bounty</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                    <SelectItem value="votes">Most Votes</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {unansweredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">
                            <a href={`/question/${question.id}`} className="hover:text-primary transition-colors">
                              {question.title}
                            </a>
                          </CardTitle>
                          {question.bounty && (
                            <Badge variant="default" className="bg-orange-500">
                              ${question.bounty} bounty
                            </Badge>
                          )}
                        </div>
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
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="destructive" className="text-xs">
                          <HelpCircle className="w-3 h-3 mr-1" />
                          Unanswered
                        </Badge>
                        {question.bounty && (
                          <div className="text-sm font-medium text-orange-600">
                            ${question.bounty} bounty
                          </div>
                        )}
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
                          <span>{question.answers} answers</span>
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
                Load More Unanswered Questions
              </Button>
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <div className="text-center">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Help the Community</h3>
                <p className="text-muted-foreground mb-4">
                  These questions are waiting for answers. Share your knowledge and help others!
                </p>
                <Button>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Questions by Tags
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Unanswered; 