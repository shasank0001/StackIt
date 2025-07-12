
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, X, HelpCircle, Lightbulb, Upload, Image, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB limit
    );
    
    if (images.length + validFiles.length > 5) {
      alert("You can upload a maximum of 5 images");
      return;
    }

    const newImages = [...images, ...validFiles];
    setImages(newImages);
    
    // Create preview URLs
    const newUrls = validFiles.map(file => URL.createObjectURL(file));
    setImageUrls([...imageUrls, ...newUrls]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setImageUrls(newUrls);
  };

  const handleSubmit = () => {
    console.log("Submitting question:", { title, description, tags, images });
    navigate("/");
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
                <span>Home</span>
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Ask a Question
                </CardTitle>
                <p className="text-muted-foreground">
                  Get help from the community by asking a clear, specific question
                </p>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {/* Title */}
                <div className="space-y-3">
                  <label htmlFor="title" className="block text-sm font-semibold text-foreground">
                    Title *
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., How to center a div in CSS?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors"
                  />
                  <p className="text-xs text-muted-foreground">
                    Be specific and imagine you're asking a question to another person
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label htmlFor="description" className="block text-sm font-semibold text-foreground">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Provide more details about your question. Include any code, error messages, or what you've tried so far..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[200px] bg-background/50 border-border/50 focus:bg-background transition-colors resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Include code examples, error messages, and what you've already tried
                  </p>
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">
                    Images (Optional)
                  </label>
                  <div className="space-y-4">
                    {/* Upload Button */}
                    <div className="flex items-center gap-3">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Images
                          </span>
                        </Button>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <span className="text-sm text-muted-foreground">
                        {images.length}/5 images • Max 5MB each
                      </span>
                    </div>

                    {/* Image Previews */}
                    {imageUrls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-border/50"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
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
                    Upload screenshots, diagrams, or other images to help explain your question
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label htmlFor="tags" className="block text-sm font-semibold text-foreground">
                    Tags
                  </label>
                  <Input
                    id="tags"
                    placeholder="Add tags (press Enter to add, max 5)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors"
                    disabled={tags.length >= 5}
                  />
                  
                  {/* Display Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center gap-2"
                        >
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-destructive/20 hover:text-destructive"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    Add up to 5 tags to describe what your question is about ({tags.length}/5)
                  </p>
                </div>

                {/* Submit Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-border/50">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!title.trim() || !description.trim()}
                    className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                  >
                    Submit Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Tips */}
          <div className="space-y-6">
            <Card className="shadow-elegant border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">Writing Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li>• Be specific and clear in your title</li>
                  <li>• Include relevant code examples</li>
                  <li>• Mention what you've already tried</li>
                  <li>• Use proper formatting for code</li>
                  <li>• Add relevant tags to help others find your question</li>
                </ul>
              </CardContent>
            </Card>

            <Alert className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>Before posting:</strong> Search for similar questions that might already have been answered.
              </AlertDescription>
            </Alert>

            <Card className="shadow-elegant border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">Code Formatting</h3>
                <div className="text-sm text-green-800 dark:text-green-200 space-y-2">
                  <p>Use backticks for inline code: <code className="bg-green-100 dark:bg-green-800 px-1 rounded">`code`</code></p>
                  <p>Use triple backticks for code blocks:</p>
                  <pre className="bg-green-100 dark:bg-green-800 p-2 rounded text-xs">
```javascript{'\n'}console.log('Hello World');{'\n'}```
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AskQuestion;
