
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Award, Users, TrendingUp, Clock, HelpCircle, Bookmark, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { icon: Home, label: "Home", path: "/", count: null },
    { icon: MessageSquare, label: "Questions", path: "/questions", count: 1247 },
    { icon: Users, label: "Communities", path: "/communities", count: 24 },
    { icon: Award, label: "Tags", path: "/tags", count: 156 },
  ];

  const filterItems = [
    { icon: TrendingUp, label: "Trending", path: "/trending", count: 24 },
    { icon: Clock, label: "Recent", path: "/recent", count: null },
    { icon: HelpCircle, label: "Unanswered", path: "/unanswered", count: 87 },
    { icon: Bookmark, label: "Saved", path: "/saved", count: 12 },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 border-r bg-card/50">
      <div className="p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">Navigation</h3>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className="w-full justify-start h-10"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && (
                    <Badge variant="secondary" className="ml-2 px-2 py-0 text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">Filters</h3>
          <nav className="space-y-1">
            {filterItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className="w-full justify-start h-10"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && (
                    <Badge variant="secondary" className="ml-2 px-2 py-0 text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* My Communities */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">My Communities</h3>
              <Link to="/communities/create">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              {['AI Club', 'Web Dev Group', 'B.Tech CSE 2025'].map((community) => (
                <Link key={community} to={`/community/${community.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
                    {community}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Tags */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-3">Popular Tags</h3>
            <div className="space-y-2">
              {['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'].map((tag) => (
                <Link key={tag} to={`/tags/${tag.toLowerCase()}`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs">
                    #{tag}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Settings */}
        <div className="pt-4 border-t">
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start h-10">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};
