import { FC } from 'react';
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { cn } from '../lib/utils';
import { AspectRatio } from './ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  const formattedDate = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true });
  
  return (
    <Link to={`/blog/${post.id}`}>
      <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <AspectRatio ratio={16/9}>
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              />
            </AspectRatio>
          </div>
          
          <div className="p-4 md:col-span-8 md:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">{formattedDate}</span>
              </div>
              
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{post.commentsCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
