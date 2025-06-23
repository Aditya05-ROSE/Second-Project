import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { formatDistanceToNow, format } from 'date-fns';
import { ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { BlogPost, Comment } from '../types/blog';
import { mockPosts } from '../data/mockData';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPost = () => {
      setIsLoading(true);
      setTimeout(() => {
        const foundPost = mockPosts.find(p => p.id === id);
        setPost(foundPost || null);
        
        // Mock comments
        setComments([
          {
            id: 'c1',
            content: 'Great article! I learned a lot from this.',
            author: {
              id: 'u5',
              name: 'Alex Turner',
              avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/2b2ff05e-4fb6-4a96-8b4c-e3e1fa613f66.jpg'
            },
            createdAt: new Date('2025-06-12').toISOString(),
            likes: 4
          },
          {
            id: 'c2',
            content: 'I have a question about the third point you made. Could you elaborate more on that?',
            author: {
              id: 'u6',
              name: 'Jessica Lee',
              avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/2b2ff05e-4fb6-4a96-8b4c-e3e1fa613f66.jpg'
            },
            createdAt: new Date('2025-06-11').toISOString(),
            likes: 2
          }
        ]);
        
        setIsLoading(false);
      }, 1000);
    };
    
    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground">Return to Home</Button>
        </Link>
      </div>
    );
  }

  const formattedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy');

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/" className="text-2xl font-bold text-primary">BlogHub</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="hidden sm:inline-flex">Login</Button>
            </Link>
            
            <Link to="/register">
              <Button className="bg-primary text-primary-foreground">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Article header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground">{formattedDate}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <Link to={`/profile/${post.author.id}`} className="font-medium hover:underline">
                    {post.author.name}
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.commentsCount}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Featured image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          {/* Article content */}
          <div className="prose prose-lg max-w-none">
            <p>
              This is where the full article content would be displayed. In a real application, this would be rich text content, possibly rendered from markdown or from a rich text editor's output.
            </p>
            <p>
              The article would include formatting such as <strong>bold text</strong>, <em>italics</em>, lists, links, and possibly code blocks or embedded media.
            </p>
            <h2>Key Points</h2>
            <ul>
              <li>First important point about the topic</li>
              <li>Second point with additional details</li>
              <li>Third point expanding on the concept</li>
            </ul>
            <p>
              Further paragraphs would develop the ideas presented in the article, possibly with examples, case studies, or data to support the arguments being made.
            </p>
            <blockquote>
              An important quote or highlight from the article could be displayed here to emphasize a key concept.
            </blockquote>
            <p>
              The conclusion would summarize the main points and possibly suggest further reading or actions for the reader to take.
            </p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-8">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <Separator className="my-8" />
          
          {/* Comments section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
            
            {/* Add comment form */}
            <div className="mb-8">
              <textarea 
                className="w-full p-4 rounded-lg border border-border bg-background resize-none min-h-[100px]" 
                placeholder="Add your comment..."
              ></textarea>
              <div className="mt-2 flex justify-end">
                <Button className="bg-primary text-primary-foreground">Post Comment</Button>
              </div>
            </div>
            
            {/* Comments list */}
            <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{comment.author.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-foreground mt-1">{comment.content}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-xs">
                      <Heart className="h-3 w-3" />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">Reply</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-muted mt-auto py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} BlogHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
