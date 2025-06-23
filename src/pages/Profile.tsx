import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { format } from 'date-fns';
import { 
  ArrowLeft,
  MapPin, 
  Calendar,
  Twitter,
  Github,
  Globe,
  Users
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import BlogCard from '../components/BlogCard';
import { BlogPost } from '../types/blog';
import { mockPosts } from '../data/mockData';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  joinedAt: string;
  website: string;
  twitter: string;
  github: string;
  following: number;
  followers: number;
}

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // In a real app, this would fetch the user profile from an API
    setIsLoading(true);
    setTimeout(() => {
      // Mock user profile data
      setProfile({
        id: id || 'u1',
        name: 'John Smith',
        username: 'johnsmith',
        avatar: 'https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/4303ac13-4c50-46dc-9c9f-ae4b3141d97a.jpg',
        bio: 'Software engineer and technical writer. I blog about web development, programming best practices, and my journey in tech.',
        location: 'San Francisco, CA',
        joinedAt: new Date('2022-03-15').toISOString(),
        website: 'https://johnsmith.dev',
        twitter: 'johnsmith',
        github: 'johnsmith',
        following: 128,
        followers: 256
      });
      
      // Get posts by this user
      setUserPosts(mockPosts.filter(post => post.author.id === id));
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground">Return to Home</Button>
        </Link>
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Profile header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
                <p className="text-muted-foreground mb-3">@{profile.username}</p>
                <p className="mb-3">{profile.bio}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {profile.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {format(new Date(profile.joinedAt), 'MMMM yyyy')}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{profile.followers} followers</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  
                  {profile.twitter && (
                    <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  
                  {profile.github && (
                    <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              
              <div>
                <Button className="w-full md:w-auto bg-primary text-primary-foreground">Follow</Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Profile content */}
          <Tabs defaultValue="posts" className="mb-8">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="space-y-6 mt-6">
              {userPosts.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <p className="text-lg text-muted-foreground">No posts yet</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {userPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">About {profile.name}</h2>
                <p className="mb-6">{profile.bio}</p>
                
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="mb-4 text-muted-foreground">{profile.location}</p>
                
                <h3 className="font-semibold mb-2">Website</h3>
                {profile.website ? (
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mb-4 inline-block"
                  >
                    {profile.website.replace(/^https?:\/\//, '')}
                  </a>
                ) : (
                  <p className="mb-4 text-muted-foreground">Not provided</p>
                )}
                
                <h3 className="font-semibold mb-2">Member since</h3>
                <p className="mb-4 text-muted-foreground">
                  {format(new Date(profile.joinedAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </TabsContent>
          </Tabs>
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
