
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, User, Plus, Home, MessageSquare, Users, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [notifications] = useState(3); // Mock notification count

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">StackIt</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 flex-1">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
          <Link to="/questions">
            <Button 
              variant={isActive("/questions") ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Questions
            </Button>
          </Link>
          <Link to="/communities">
            <Button 
              variant={isActive("/communities") ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Communities
            </Button>
          </Link>
          <Link to="/tags">
            <Button 
              variant={isActive("/tags") ? "secondary" : "ghost"} 
              size="sm"
              className="flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              Tags
            </Button>
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 ml-auto">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Ask Question Button */}
          <Link to="/ask">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Question</span>
            </Button>
          </Link>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h4 className="font-semibold">Notifications</h4>
              </div>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">New answer on your question</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Someone mentioned you</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Your answer was accepted</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">john_dev</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
