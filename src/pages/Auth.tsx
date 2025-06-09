
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"fan" | "organizer">("fan");
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log("Attempting login for:", email);
        const { error } = await signIn(email, password);
        if (error) {
          console.error("Login error:", error);
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in."
          });
          navigate("/");
        }
      } else {
        console.log("Attempting signup for:", email, "with role:", role);
        const { error } = await signUp(email, password, {
          name,
          role
        });
        if (error) {
          console.error("Signup error:", error);
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account."
          });
          // Don't navigate immediately for signup since email verification is needed
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-sm border-white/10 p-8">
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/4d06c6a1-82fc-4fbc-b781-6c35bcf89ec8.png" 
            alt="ReXDeX Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-400 mt-2">
            {isLogin ? "Sign in to your account" : "Join the ReXDeX community"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <Label className="text-white">Account Type</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="radio"
                      value="fan"
                      checked={role === "fan"}
                      onChange={(e) => setRole(e.target.value as "fan" | "organizer")}
                      className="text-blue-500"
                    />
                    <span>Fan</span>
                  </label>
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="radio"
                      value="organizer"
                      checked={role === "organizer"}
                      onChange={(e) => setRole(e.target.value as "fan" | "organizer")}
                      className="text-blue-500"
                    />
                    <span>Organizer</span>
                  </label>
                </div>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
