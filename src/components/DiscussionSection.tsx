import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
    id: string;
    user: {
        name: string;
        avatar?: string;
        fallback: string;
    };
    content: string;
    timestamp: Date;
}

const MOCK_COMMENTS: Comment[] = [
    {
        id: "1",
        user: {
            name: "Alex Johnson",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            fallback: "AJ"
        },
        content: "This lesson really clarified the difference between supervised and unsupervised learning for me. The examples were spot on!",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    },
    {
        id: "2",
        user: {
            name: "Sarah Chen",
            fallback: "SC"
        },
        content: "Could you explain the part about 'Gradient Descent' again? I felt it was a bit rushed towards the end.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
        id: "3",
        user: {
            name: "Mike Ross",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
            fallback: "MR"
        },
        content: "Great pacing. I'm excited for the next module!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    }
];

const DiscussionSection = () => {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState("");

    const handlePostComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            user: {
                name: "You",
                fallback: "ME"
            },
            content: newComment,
            timestamp: new Date()
        };

        setComments([comment, ...comments]);
        setNewComment("");
    };

    return (
        <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl backdrop-blur-sm overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="p-6 border-b border-slate-800/50 flex items-center justify-between bg-slate-950/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-black text-lg tracking-tight">Discussion</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{comments.length} Comments</p>
                    </div>
                </div>
            </div>

            {/* Inputs */}
            <div className="p-6 border-b border-slate-800/50 bg-slate-950/10">
                <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border border-slate-800">
                        <AvatarFallback className="bg-primary/10 text-primary font-black">ME</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                        <Textarea
                            placeholder="Join the discussion..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="bg-slate-950/50 border-slate-800 focus:border-primary/50 min-h-[80px] resize-none rounded-xl"
                        />
                        <div className="flex justify-end">
                            <Button
                                onClick={handlePostComment}
                                disabled={!newComment.trim()}
                                className="rounded-xl px-6 font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Post Comment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lists */}
            <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 group animate-in slide-in-from-bottom-2 duration-500">
                            <Avatar className="w-10 h-10 border border-slate-800 mt-1">
                                {comment.user.avatar && <AvatarImage src={comment.user.avatar} />}
                                <AvatarFallback className="bg-slate-800 text-slate-400 font-bold text-xs">{comment.user.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm text-slate-200">{comment.user.name}</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{formatDistanceToNow(comment.timestamp, { addSuffix: true })}</span>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default DiscussionSection;
