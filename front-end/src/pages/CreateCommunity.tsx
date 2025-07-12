import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Upload, 
  Users, 
  Lock, 
  Globe, 
  Hash, 
  X, 
  Plus,
  Eye,
  EyeOff,
  Shield,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CreateCommunity = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    privacy: "public",
    tags: [] as string[],
    avatar: null as File | null,
    allowInvites: true,
    requireApproval: false,
    allowMemberPosts: true,
    customUrl: ""
  });

  const [tagInput, setTagInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Creating community:", formData);
  };

  const privacyOptions = [
    {
      value: "public",
      title: "Public",
      description: "Anyone can view and join this community",
      icon: Globe
    },
    {
      value: "private",
      title: "Private",
      description: "Only invited members can join this community",
      icon: Lock
    },
    {
      value: "restricted",
      title: "Restricted",
      description: "Anyone can view but only approved members can join",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Link to="/communities">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Communities
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Create Community</h1>
                <p className="text-muted-foreground">
                  Build a space for people to connect and share knowledge
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Community Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Community Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter community name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      maxLength={50}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.name.length}/50 characters
                    </p>
                  </div>

                  {/* Community Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what your community is about"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      maxLength={500}
                      rows={4}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.description.length}/500 characters
                    </p>
                  </div>

                  {/* Custom URL */}
                  <div className="space-y-2">
                    <Label htmlFor="customUrl">Custom URL</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">dev-qa-circle.com/community/</span>
                      <Input
                        id="customUrl"
                        placeholder="your-community-name"
                        value={formData.customUrl}
                        onChange={(e) => handleInputChange("customUrl", e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Optional. Leave empty to use the community name.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Community Avatar */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Avatar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={previewUrl} />
                      <AvatarFallback className="text-lg">
                        {formData.name ? formData.name.substring(0, 2).toUpperCase() : "CO"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Label htmlFor="avatar" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </span>
                        </Button>
                      </Label>
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended: 256x256px, PNG or JPG
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.privacy}
                    onValueChange={(value) => handleInputChange("privacy", value)}
                    className="space-y-4"
                  >
                    {privacyOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <div key={option.value} className="flex items-center space-x-3">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex items-center gap-3 cursor-pointer">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{option.title}</div>
                              <div className="text-sm text-muted-foreground">{option.description}</div>
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      maxLength={20}
                    />
                    <Button type="button" variant="outline" onClick={addTag} disabled={!tagInput.trim() || formData.tags.length >= 5}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add up to 5 tags to help people find your community
                  </p>
                </CardContent>
              </Card>

              {/* Community Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Allow member invites</Label>
                      <p className="text-xs text-muted-foreground">
                        Members can invite others to join the community
                      </p>
                    </div>
                    <Switch
                      checked={formData.allowInvites}
                      onCheckedChange={(checked) => handleInputChange("allowInvites", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Require approval for new members</Label>
                      <p className="text-xs text-muted-foreground">
                        New join requests must be approved by moderators
                      </p>
                    </div>
                    <Switch
                      checked={formData.requireApproval}
                      onCheckedChange={(checked) => handleInputChange("requireApproval", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Allow members to create posts</Label>
                      <p className="text-xs text-muted-foreground">
                        Members can create new posts and discussions
                      </p>
                    </div>
                    <Switch
                      checked={formData.allowMemberPosts}
                      onCheckedChange={(checked) => handleInputChange("allowMemberPosts", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={previewUrl} />
                        <AvatarFallback>
                          {formData.name ? formData.name.substring(0, 2).toUpperCase() : "CO"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {formData.name || "Community Name"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>1 member</span>
                          {formData.privacy === 'private' ? (
                            <Lock className="w-4 h-4" />
                          ) : formData.privacy === 'restricted' ? (
                            <Shield className="w-4 h-4" />
                          ) : (
                            <Globe className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {formData.description || "Community description will appear here"}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3">
                <Link to="/communities">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={!formData.name || !formData.description}>
                  Create Community
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateCommunity; 