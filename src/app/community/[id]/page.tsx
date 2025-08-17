
"use client";

import { useState, type FormEvent, useEffect } from "react";
import { forumPosts } from "@/lib/data";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Send, User, Trash2 } from "lucide-react";
import type { ForumReply } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function CommunityPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const post = forumPosts.find((p) => p.id === id);
  const [replies, setReplies] = useState<ForumReply[]>(post?.replies || []);
  const [newReply, setNewReply] = useState("");
  const { toast } = useToast();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (!post) {
    notFound();
  }

  const handleReplySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !user) return;

    const reply: ForumReply = {
      id: `reply-${Date.now()}`,
      author: user.displayName || 'Anonymous',
      avatar: user.photoURL || '',
      date: 'Just now',
      content: newReply,
    };

    setReplies([...replies, reply]);
    setNewReply("");
    
    toast({
      title: "Reply Posted!",
      description: "Your reply has been added to the discussion.",
    });
  };

  const handleDelete = () => {
    // In a real app, you'd call an API to delete the post.
    // Here, we'll just show a toast and redirect.
    toast({
      title: "Post Deleted",
      description: "The discussion has been removed.",
    });
    router.push("/community");
  };

  if (loading || !user) {
    return <div className="container text-center py-12">Loading...</div>
  }


  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-3xl">{post.title}</CardTitle>
                <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2">
                    <Avatar className="h-8 w-8">
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>
                    Posted by <span className="font-semibold text-foreground">{post.author}</span> on {post.date}
                    </span>
                </div>
            </div>
            {/* Only show delete button if the user is the author of the post */}
            {user && user.displayName === post.author && (
              <Button variant="destructive" size="icon" onClick={handleDelete} aria-label="Delete post">
                  <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none">
            <p>{post.content}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold font-headline mb-4">{replies.length} Replies</h2>
        <div className="space-y-6">
          {replies.map((reply) => (
            <Card key={reply.id} className="bg-secondary/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={reply.avatar} alt={reply.author} />
                    <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">{reply.author}</p>
                        <p className="text-xs text-muted-foreground">{reply.date}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{reply.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <div className="mt-8">
        <h3 className="text-xl font-bold font-headline mb-4">Join the discussion</h3>
        <form onSubmit={handleReplySubmit}>
          <div className="grid w-full gap-2">
            <Textarea 
              placeholder="Write your reply..." 
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={4}
            />
            <Button type="submit" className="w-fit self-end bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-4 w-4" />
              Post Reply
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
}
