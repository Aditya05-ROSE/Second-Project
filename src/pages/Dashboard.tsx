import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { format } from 'date-fns';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Heart, 
  Settings, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BlogPost } from '../types/blog';
import { mockPosts } from '../data/mockData';

export default function Dashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // In a real app, this would fetch the user's posts
    setIsLoading(true);
    setTimeout(() => {
      // Filter posts to show only those by the current user
      // For demo, we'll just use the first two posts
      setPosts(mockPosts.slice(0, 2));
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id: string) => {
    // In a real app, this would make an API call to delete the post
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:block">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-primary">BlogHub</Link>
        </div>
        <nav className="space-y-1 px-3">
          <Link to="/dashboard" className="flex items-center space-x-2 px-3 py-2 rounded-md bg-accent text-accent-foreground">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/dashboard/posts" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <FileText className="h-4 w-4" />
            <span>My Posts</span>
          </Link>
          <Link to="/dashboard/comments" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span>Comments</span>
          </Link>
          <Link to="/dashboard/likes" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <Heart className="h-4 w-4" />
            <span>Likes</span>
          </Link>
          <Link to="/dashboard/settings" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="absolute bottom-4 px-6 w-64">
          <div className="flex items-center space-x-2 p-3">
            <Avatar>
              <AvatarImage src="https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/259d2fd0-1fe8-431c-b802-63665d524aea.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden border-b border-border p-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">BlogHub</Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <LayoutDashboard className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/259d2fd0-1fe8-431c-b802-63665d524aea.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Link to="/create">
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-muted-foreground mb-2">Total Posts</div>
              <div className="text-3xl font-bold">{posts.length}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-muted-foreground mb-2">Total Views</div>
              <div className="text-3xl font-bold">1,248</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-muted-foreground mb-2">Total Comments</div>
              <div className="text-3xl font-bold">42</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-muted-foreground mb-2">Total Likes</div>
              <div className="text-3xl font-bold">128</div>
            </div>
          </div>
          
          <Tabs defaultValue="recent">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Recent Posts</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">You haven't created any posts yet</p>
                    <Link to="/create" className="mt-4 inline-block">
                      <Button className="bg-primary text-primary-foreground">Create Your First Post</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-border bg-muted">
                          <th className="px-4 py-3 font-medium">Title</th>
                          <th className="px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                          <th className="px-4 py-3 font-medium text-center hidden md:table-cell">Views</th>
                          <th className="px-4 py-3 font-medium text-center hidden md:table-cell">Likes</th>
                          <th className="px-4 py-3 font-medium text-center hidden md:table-cell">Comments</th>
                          <th className="px-4 py-3 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map(post => (
                          <tr key={post.id} className="border-b border-border">
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded overflow-hidden hidden sm:block">
                                  <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="truncate max-w-[200px] lg:max-w-[300px]">
                                  <Link to={`/blog/${post.id}`} className="font-medium hover:underline">
                                    {post.title}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                            </td>
                            <td className="px-4 py-3 text-center hidden md:table-cell">248</td>
                            <td className="px-4 py-3 text-center hidden md:table-cell">{post.likes}</td>
                            <td className="px-4 py-3 text-center hidden md:table-cell">{post.commentsCount}</td>
                            <td className="px-4 py-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Link to={`/blog/${post.id}`} className="flex items-center w-full">
                                      View
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Link to={`/edit/${post.id}`} className="flex items-center w-full">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDelete(post.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="draft">
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-lg text-muted-foreground">You don't have any drafts</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
