import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import BlogCard from '../components/BlogCard';
import { BlogPost } from '../types/blog';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Simulate fetching blog data from API
  useEffect(() => {
    // In a real project, this would be an API call
    const fetchPosts = () => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setPosts(mockPosts);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchPosts();
  }, []);
  
  // Filter blogs
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header area */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">BlogHub</Link>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Link to="/login">
              <Button variant="outline" className="hidden sm:inline-flex">Login</Button>
            </Link>
            
            <Link to="/register">
              <Button className="bg-primary text-primary-foreground">Register</Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile search bar */}
        <div className="md:hidden container mx-auto px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Discover Great Content</h1>
          <p className="text-muted-foreground mb-8">Explore ideas, share knowledge, connect with the world.</p>
          
          <Tabs defaultValue="featured" className="mb-8">
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            <TabsContent value="featured" className="space-y-4 mt-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No articles found</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="recent" className="space-y-4 mt-6">
              {/* Content same as featured, would be different data in a real project */}
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No articles found</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="popular" className="space-y-4 mt-6">
              {/* Content same as featured, would be different data in a real project */}
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No articles found</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-auto py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} BlogHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Mock blog data
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Improve Your Programming Skills',
    excerpt: 'This article explores how programmers can enhance their coding abilities through systematic learning and practice.',
    content: 'Detailed content would go here, including code examples, tips, and practical methods...',
    coverImage: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/89715d7b-cdac-45ac-b748-bf6fd7fe52f7.jpg',
    author: {
      id: 'u1',
      name: 'John Smith',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/cb2aa4b6-8c56-48a1-bb65-9e32e97f0dbc.jpg'
    },
    category: 'programming',
    tags: ['coding', 'learning', 'skills'],
    publishedAt: new Date('2025-06-10').toISOString(),
    likes: 42,
    commentsCount: 8
  },
  {
    id: '2',
    title: 'Frontend Frameworks Worth Learning in 2025',
    excerpt: 'With rapid developments in frontend technology, which frameworks are worth investing time in? This article breaks it down.',
    content: 'Detailed content would go here...',
    coverImage: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/48338da0-7473-48c4-80c6-2b4ff2ca7c39.jpg',
    author: {
      id: 'u2',
      name: 'Emily Johnson',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/cb2aa4b6-8c56-48a1-bb65-9e32e97f0dbc.jpg'
    },
    category: 'frontend',
    tags: ['frontend', 'React', 'Vue', 'frameworks'],
    publishedAt: new Date('2025-06-05').toISOString(),
    likes: 36,
    commentsCount: 12
  },
  {
    id: '3',
    title: 'AI Applications and Challenges in Healthcare',
    excerpt: 'AI technologies are transforming multiple aspects of healthcare, but they also face significant challenges.',
    content: 'Detailed content would go here...',
    coverImage: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/0a969225-ed4d-47a5-864d-3d2bcb94bb76.jpg',
    author: {
      id: 'u3',
      name: 'Michael Chen',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/cb2aa4b6-8c56-48a1-bb65-9e32e97f0dbc.jpg'
    },
    category: 'ai',
    tags: ['artificial intelligence', 'healthcare', 'technology'],
    publishedAt: new Date('2025-06-01').toISOString(),
    likes: 78,
    commentsCount: 23
  },
  {
    id: '4',
    title: 'Sustainable Development and Green Tech Innovation',
    excerpt: 'Exploring how the latest environmental technologies are helping to achieve global sustainability goals.',
    content: 'Detailed content would go here...',
    coverImage: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/3d9545e0-730f-401c-8e29-3395a24aea2a.jpg',
    author: {
      id: 'u4',
      name: 'Sarah Williams',
      avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/cb2aa4b6-8c56-48a1-bb65-9e32e97f0dbc.jpg'
    },
    category: 'environment',
    tags: ['environment', 'sustainability', 'innovation'],
    publishedAt: new Date('2025-05-28').toISOString(),
    likes: 56,
    commentsCount: 14
  },
];
