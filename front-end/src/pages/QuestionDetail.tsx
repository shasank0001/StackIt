
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Clock, User, Award, Share2, Flag, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VoteSection } from "@/components/VoteSection";

// Mock data for the question detail
const mockQuestion = {
  id: 1,
  title: "How to get 2 columns in a data set to make a separate column in SQL",
  description: "I'm trying to create a new column by combining two existing columns in my SQL database. What's the best approach for this?",
  tags: ["SQL", "Database", "Columns"],
  author: "john_dev",
  votes: 15,
  views: 234,
  createdAt: "2 hours ago",
  hasAccepted: true,
  images: [
    "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Database+Schema",
    "https://via.placeholder.com/400x300/10B981/FFFFFF?text=SQL+Query+Example"
  ],
  content: `I have a table with two columns: **first_name** and **last_name**. I want to create a new column called **full_name** that combines these two columns with a space in between.

What would be the best SQL syntax to achieve this? I'm working with **MySQL**.

Here's my current table structure:
\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
\`\`\`

I've tried a few approaches but they're not working as expected. Any help would be appreciated!`
};

const mockAnswers = [
  {
    id: 1,
    content: `You can use the **CONCAT** function in MySQL to combine columns:

\`\`\`sql
SELECT first_name, last_name, 
CONCAT(first_name, ' ', last_name) AS full_name
FROM your_table;
\`\`\`

This will create a new column called \`full_name\` that combines the \`first_name\` and \`last_name\` with a space.

**Alternative approaches:**
- Use \`CONCAT_WS(' ', first_name, last_name)\` for better null handling
- For permanent changes: \`ALTER TABLE users ADD COLUMN full_name VARCHAR(101) GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name))\``,
    author: "sarah_sql",
    votes: 8,
    createdAt: "1 hour ago",
    isAccepted: true,
    images: [
      "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=CONCAT+Example"
    ]
  },
  {
    id: 2,
    content: `Another approach is to use the **||** operator (if your SQL dialect supports it):

\`\`\`sql  
SELECT first_name, last_name,
first_name || ' ' || last_name AS full_name
FROM your_table;
\`\`\`

However, **CONCAT** is more widely supported across different SQL databases and handles NULL values better.

**Pro tip:** Always consider what happens when one of the columns is NULL!`,
    author: "mike_db",
    votes: 3,
    createdAt: "45 minutes ago",
    isAccepted: false,
    images: []
  }
];

const QuestionDetail = () => {
  const { id } = useParams();
  const [newAnswer, setNewAnswer] = useState("");
  const [answerImages, setAnswerImages] = useState<File[]>([]);
  const [answerImageUrls, setAnswerImageUrls] = useState<string[]>([]);

  const handleAnswerImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB limit
    );
    
    if (answerImages.length + validFiles.length > 5) {
      alert("You can upload a maximum of 5 images");
      return;
    }

    const newImages = [...answerImages, ...validFiles];
    setAnswerImages(newImages);
    
    // Create preview URLs
    const newUrls = validFiles.map(file => URL.createObjectURL(file));
    setAnswerImageUrls([...answerImageUrls, ...newUrls]);
  };

  const removeAnswerImage = (index: number) => {
    const newImages = answerImages.filter((_, i) => i !== index);
    const newUrls = answerImageUrls.filter((_, i) => i !== index);
    setAnswerImages(newImages);
    setAnswerImageUrls(newUrls);
  };

  const handleSubmitAnswer = () => {
    console.log("Submitting answer:", { content: newAnswer, images: answerImages });
    setNewAnswer("");
    setAnswerImages([]);
    setAnswerImageUrls([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-50 dark:to-slate-900">
      {/* Enhanced Header */}
      <header className="glassmorphism border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Questions</span>
              </Link>
              
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  StackIt
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">Login</Button>
              <Button size="sm" className="gradient-primary text-white">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Question */}
        <Card className="shadow-elegant border-0 mb-8 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold text-foreground pr-4 leading-tight">
                {mockQuestion.title}
              </h1>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                  <Flag className="w-4 h-4 mr-1" />
                  Flag
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex gap-6">
              {/* Vote Section */}
              <div className="flex-shrink-0">
                <VoteSection votes={mockQuestion.votes} onBookmark={() => {}} />
              </div>

              {/* Question Content */}
              <div className="flex-1 space-y-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {mockQuestion.content}
                  </div>
                </div>

                {/* Question Images */}
                {mockQuestion.images && mockQuestion.images.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Images</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockQuestion.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Question image ${index + 1}`}
                            className="w-full rounded-lg border border-border/50 cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => window.open(image, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {mockQuestion.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 hover:from-primary/10 hover:to-primary/5 transition-all duration-200 cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>asked {mockQuestion.createdAt}</span>
                    <span>•</span>
                    <span>{mockQuestion.views} views</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white text-sm">
                        {mockQuestion.author.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{mockQuestion.author}</p>
                      <p className="text-xs text-muted-foreground">Asked 2 questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Answer - Moved to top */}
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Your Answer
            </h3>
            
            <Textarea
              placeholder="Write your answer here... You can use Markdown formatting."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="mb-4 min-h-[160px] bg-background/50 border-border/50 focus:bg-background transition-colors resize-none"
            />

            {/* Answer Image Upload */}
            <div className="space-y-3 mb-4">
              <label className="block text-sm font-semibold text-foreground">
                Images (Optional)
              </label>
              <div className="space-y-4">
                {/* Upload Button */}
                <div className="flex items-center gap-3">
                  <label htmlFor="answer-image-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Images
                      </span>
                    </Button>
                  </label>
                  <input
                    id="answer-image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleAnswerImageUpload}
                    className="hidden"
                  />
                  <span className="text-sm text-muted-foreground">
                    {answerImages.length}/5 images • Max 5MB each
                  </span>
                </div>

                {/* Image Previews */}
                {answerImageUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {answerImageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Answer Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg border border-border/50"
                        />
                        <button
                          type="button"
                          onClick={() => removeAnswerImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Upload screenshots, diagrams, or other images to support your answer
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Use Markdown for formatting. Be clear and helpful in your answer.
              </p>
              <Button 
                onClick={handleSubmitAnswer}
                className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={!newAnswer.trim()}
              >
                Submit Answer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Answers */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              {mockAnswers.length} Answer{mockAnswers.length !== 1 ? 's' : ''}
            </h2>
            <Button variant="outline" size="sm">
              Sort by: Best
            </Button>
          </div>
          
          <div className="space-y-6">
            {mockAnswers.map((answer) => (
              <Card key={answer.id} className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Vote Section */}
                    <div className="flex-shrink-0">
                      <div className="flex flex-col items-center">
                        <VoteSection votes={answer.votes} size="sm" />
                        {answer.isAccepted && (
                          <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1 space-y-4">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <div className="text-foreground leading-relaxed whitespace-pre-line">
                          {answer.content}
                        </div>
                      </div>

                      {/* Answer Images */}
                      {answer.images && answer.images.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-muted-foreground">Images</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {answer.images.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image}
                                  alt={`Answer image ${index + 1}`}
                                  className="w-full rounded-lg border border-border/50 cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => window.open(image, '_blank')}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>answered {answer.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs">
                              {answer.author.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground">{answer.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetail;
