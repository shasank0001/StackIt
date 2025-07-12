
import { useState } from "react";
import { ChevronUp, ChevronDown, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoteSectionProps {
  votes: number;
  isUpvoted?: boolean;
  isDownvoted?: boolean;
  isBookmarked?: boolean;
  onUpvote?: () => void;
  onDownvote?: () => void;
  onBookmark?: () => void;
  size?: "sm" | "md" | "lg";
}

export const VoteSection = ({
  votes,
  isUpvoted = false,
  isDownvoted = false,
  isBookmarked = false,
  onUpvote,
  onDownvote,
  onBookmark,
  size = "md"
}: VoteSectionProps) => {
  const [localVotes, setLocalVotes] = useState(votes);
  const [localUpvoted, setLocalUpvoted] = useState(isUpvoted);
  const [localDownvoted, setLocalDownvoted] = useState(isDownvoted);
  const [localBookmarked, setLocalBookmarked] = useState(isBookmarked);

  const handleUpvote = () => {
    if (localUpvoted) {
      setLocalVotes(prev => prev - 1);
      setLocalUpvoted(false);
    } else {
      setLocalVotes(prev => prev + (localDownvoted ? 2 : 1));
      setLocalUpvoted(true);
      setLocalDownvoted(false);
    }
    onUpvote?.();
  };

  const handleDownvote = () => {
    if (localDownvoted) {
      setLocalVotes(prev => prev + 1);
      setLocalDownvoted(false);
    } else {
      setLocalVotes(prev => prev - (localUpvoted ? 2 : 1));
      setLocalDownvoted(true);
      setLocalUpvoted(false);
    }
    onDownvote?.();
  };

  const handleBookmark = () => {
    setLocalBookmarked(!localBookmarked);
    onBookmark?.();
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "vote-button rounded-full",
          sizeClasses[size],
          localUpvoted 
            ? "text-orange-500 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30" 
            : "text-muted-foreground hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20"
        )}
        onClick={handleUpvote}
      >
        <ChevronUp className={iconSizes[size]} />
      </Button>
      
      <span className={cn(
        "font-semibold select-none min-w-[2rem] text-center",
        textSizes[size],
        localVotes > 0 ? "text-orange-600 dark:text-orange-400" : 
        localVotes < 0 ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
      )}>
        {localVotes}
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "vote-button rounded-full",
          sizeClasses[size],
          localDownvoted 
            ? "text-blue-500 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30" 
            : "text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        )}
        onClick={handleDownvote}
      >
        <ChevronDown className={iconSizes[size]} />
      </Button>

      {onBookmark && (
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "vote-button rounded-full mt-2",
            sizeClasses[size],
            localBookmarked 
              ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30" 
              : "text-muted-foreground hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
          )}
          onClick={handleBookmark}
        >
          <Bookmark className={cn(iconSizes[size], localBookmarked && "fill-current")} />
        </Button>
      )}
    </div>
  );
};
