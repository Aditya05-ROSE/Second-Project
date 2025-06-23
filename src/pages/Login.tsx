import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would make an API call to authenticate
    setTimeout(() => {
      console.log('Logged in with:', { email, password });
      setIsLoading(false);
      // Navigate to dashboard or home after successful login
      window.location.hash = '#/';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold text-primary inline-block mb-2">BlogHub</Link>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground text-sm">OR</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <img src="https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/88d6841c-1d42-4265-a534-5d8b5eedd791.jpg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          
          <Button variant="outline" className="w-full">
            <img src="https://pub-cdn.sider.ai/u/U07GH2VZNKJ/web-coder/684c15b8060d7d85c71155ae/resource/8c0c851a-9e7d-46ce-8957-3e7c004db78b.jpg" alt="GitHub" className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
