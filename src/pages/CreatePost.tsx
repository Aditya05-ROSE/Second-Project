import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";

const categories = [
  { value: 'programming', label: 'Programming' },
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'ai', label: 'Artificial Intelligence' },
  { value: 'devops', label: 'DevOps' },
  { value: 'design', label: 'Design' },
  { value: 'career', label: 'Career' },
  { value: 'environment', label: 'Environment' },
];

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagAdd = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would make an API call to create the post
    setTimeout(() => {
      console.log('Created post:', { title, excerpt, content, category, tags, coverImage });
      setIsSubmitting(false);
      // Navigate to dashboard after successful creation
      window.location.hash = '#/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Create New Post</h1>
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground"
            disabled={isSubmitting || !title || !content || !category}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                Publishing...
              </div>
            ) : (
              'Publish'
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cover image section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <Label htmlFor="cover-image" className="text-lg font-medium mb-4 block">Cover Image</Label>
              
              {coverImage ? (
                <div className="relative">
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="w-full h-[250px] object-cover rounded-md"
                  />
                  <Button
                    type="button" 
                    variant="destructive" 
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setCoverImage('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center p-12 text-muted-foreground">
                  <ImagePlus className="h-10 w-10 mb-2" />
                  <p className="mb-2">Drag and drop an image, or click to upload</p>
                  <p className="text-sm mb-4">Recommended size: 1200 x 630px</p>
                  <Input
                    id="cover-image"
                    type="url"
                    placeholder="Or paste an image URL"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              )}
            </div>
            
            {/* Title and excerpt */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <Label htmlFor="title" className="text-lg font-medium mb-2 block">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="excerpt" className="text-lg font-medium mb-2 block">
                  Excerpt <span className="text-sm font-normal text-muted-foreground">(A short summary of your post)</span>
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Enter a short excerpt (150-200 characters)"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="resize-none h-20"
                  maxLength={200}
                />
                <p className="text-sm text-muted-foreground mt-1 text-right">
                  {excerpt.length}/200 characters
                </p>
              </div>
            </div>
            
            {/* Content */}
            <div className="bg-card border border-border rounded-lg p-6">
              <Label htmlFor="content" className="text-lg font-medium mb-2 block">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px]"
                required
              />
              <p className="text-sm text-muted-foreground mt-2">
                In a real application, this would be a rich text editor with formatting options.
              </p>
            </div>
            
            {/* Category and Tags */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <Label htmlFor="category" className="text-lg font-medium mb-2 block">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="tags" className="text-lg font-medium mb-2 block">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => handleTagRemove(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag and press Enter"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                  />
                  <Button
                    type="button"
                    onClick={handleTagAdd}
                    disabled={!currentTag.trim() || tags.includes(currentTag.trim())}
                  >
                    Add
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">
                  Add up to 5 tags to help readers discover your post
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-muted mt-auto py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} BlogHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
