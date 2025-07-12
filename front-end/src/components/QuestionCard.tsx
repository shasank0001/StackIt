
import { Link } from "react-router-dom";
import { Clock, MessageCircle, Eye, User, Award, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: string;
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  hasAccepted: boolean;
}

export const QuestionCard = ({
  id,
  title,
  description,
  tags,
  author,
  votes,
  answers,
  views,
  createdAt,
  hasAccepted
}: QuestionCardProps) => {
  return (
    <Card className="question-card border border-border/50">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-2 min-w-[60px]">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronUp className="w-4 h-4" />
            </Button>
            <span className="text-lg font-semibold text-center min-w-[2rem]">
              {votes}
            </span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Title */}
            <Link to={`/question/${id}`}>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-snug">
                {title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2 py-1 text-xs hover:bg-accent transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className={hasAccepted ? "text-green-600 font-medium" : ""}>
                    {answers} {answers === 1 ? 'answer' : 'answers'}
                  </span>
                  {hasAccepted && <Award className="w-3 h-3 text-green-600" />}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{createdAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {author}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
