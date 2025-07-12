
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Questions from "./pages/Questions";
import Trending from "./pages/Trending";
import Recent from "./pages/Recent";
import Unanswered from "./pages/Unanswered";
import Saved from "./pages/Saved";
import Communities from "./pages/Communities";
import CreateCommunity from "./pages/CreateCommunity";
import CommunityDetail from "./pages/CommunityDetail";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import QuestionDetail from "./pages/QuestionDetail";
import AskQuestion from "./pages/AskQuestion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="stackit-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/unanswered" element={<Unanswered />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/communities/create" element={<CreateCommunity />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
            <Route path="/ask" element={<AskQuestion />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
