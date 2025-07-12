
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QuestionCard } from "@/components/QuestionCard";
import { Users, Settings, Bell, Plus, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const CommunityDetail = () => {
  // Mock community data
  const community = {
    id: 1,
    name: "AI Club - SRM University",
    description: "A community dedicated to exploring artificial intelligence and machine learning. We share knowledge, discuss latest trends, and collaborate on projects.",
    members: 234,
    type: "public",
    joined: true,
    tags: ["AI", "ML", "Python", "Research"],
    moderators: ["alice_dev", "bob_ml", "charlie_ai"],
    createdAt: "2024-01-15"
  };

  // Mock questions data
  const communityQuestions = [
    {
      id: 1,
      title: "Best practices for training neural networks?",
      description: "I'm working on a deep learning project and looking for optimization techniques...",
      tags: ["neural-networks", "deep-learning", "optimization"],
      author: "alice_dev",
      votes: 12,
      answers: 3,
      views: 156,
      createdAt: "2 hours ago",
      hasAccepted: true
    },
    {
      id: 2,
      title: "TensorFlow vs PyTorch comparison",
      description: "Which framework would you recommend for a beginner in machine learning?",
      tags: ["tensorflow", "pytorch", "frameworks"],
      author: "bob_ml",
      votes: 8,
      answers: 5,
      views: 89,
      createdAt: "5 hours ago",
      hasAccepted: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Community Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold">{community.name}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {community.members} members
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Created {community.createdAt}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{community.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {community.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Moderators:</span>
                  <div className="flex items-center gap-2">
                    {community.moderators.map((mod) => (
                      <div key={mod} className="flex items-center gap-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {mod.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Tabs */}
            <Tabs defaultValue="questions" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="announcements">Announcements</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>
                <Link to="/ask">
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Ask Question
                  </Button>
                </Link>
              </div>

              <TabsContent value="questions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Community Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    {communityQuestions.length} questions
                  </p>
                </div>
                <div className="space-y-4">
                  {communityQuestions.map((question) => (
                    <QuestionCard key={question.id} {...question} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Shared Resources</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <h4 className="font-medium">AI Fundamentals Guide</h4>
                            <p className="text-sm text-muted-foreground">PDF • 2.3 MB</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="announcements" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Announcements</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Announcement
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">AI Workshop - January 25th</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Join us for an exciting workshop on machine learning fundamentals. 
                      We'll cover neural networks, data preprocessing, and model evaluation.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-xs">AM</AvatarFallback>
                      </Avatar>
                      <span>alice_dev • 2 days ago</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Members ({community.members})</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['alice_dev', 'bob_ml', 'charlie_ai', 'diana_data', 'evan_eng'].map((member) => (
                    <Card key={member}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {member.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{member}</h4>
                            <p className="text-sm text-muted-foreground">Member</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityDetail;
