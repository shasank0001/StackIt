
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Users, Lock, Globe, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Communities = () => {
  // Mock data for communities
  const joinedCommunities = [
    {
      id: 1,
      name: "AI Club - SRM University",
      description: "Exploring artificial intelligence and machine learning together",
      members: 234,
      type: "public",
      joined: true,
      tags: ["AI", "ML", "Python"]
    },
    {
      id: 2,
      name: "Web Dev Group",
      description: "Frontend and backend development discussions",
      members: 156,
      type: "public",
      joined: true,
      tags: ["React", "Node.js", "JavaScript"]
    }
  ];

  const publicCommunities = [
    {
      id: 3,
      name: "B.Tech CSE 2025",
      description: "Computer Science students batch 2025",
      members: 89,
      type: "private",
      joined: false,
      tags: ["CSE", "College", "Study"]
    },
    {
      id: 4,
      name: "Open Source Contributors",
      description: "Contributing to open source projects and sharing knowledge",
      members: 342,
      type: "public",
      joined: false,
      tags: ["GitHub", "OpenSource", "Collaboration"]
    },
    {
      id: 5,
      name: "Data Science Enthusiasts",
      description: "Data analysis, visualization, and machine learning",
      members: 198,
      type: "public",
      joined: false,
      tags: ["DataScience", "Analytics", "ML"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Communities</h1>
                <p className="text-muted-foreground mt-1">
                  Join communities to connect with like-minded people
                </p>
              </div>
              <Link to="/communities/create">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Community
                </Button>
              </Link>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search communities..."
                className="pl-10"
              />
            </div>

            {/* My Communities */}
            {joinedCommunities.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">My Communities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {joinedCommunities.map((community) => (
                    <Card key={community.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {community.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{community.name}</CardTitle>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Users className="w-3 h-3" />
                                {community.members} members
                              </div>
                            </div>
                          </div>
                          {community.type === 'private' ? (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Globe className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {community.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {community.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link to={`/community/${community.id}`}>
                          <Button variant="outline" className="w-full">
                            View Community
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Explore Communities */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Explore Communities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publicCommunities.map((community) => (
                  <Card key={community.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {community.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{community.name}</CardTitle>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="w-3 h-3" />
                              {community.members} members
                            </div>
                          </div>
                        </div>
                        {community.type === 'private' ? (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Globe className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {community.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {community.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full">
                        {community.type === 'private' ? 'Request to Join' : 'Join Community'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Communities;
