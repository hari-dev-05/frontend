import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  MessageSquare,
  Share2,
  MoreVertical,
  Send,
  Loader2,
  BarChart2,
  CheckCircle2,
  ThumbsUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { toast } from "sonner";

interface PostCardProps {
  post: any;
  currentUser: any;
  onLikeToggle: (postId: string, newLikes: string[]) => void;
  onRepliesUpdate: (postId: string, newReplies: any[]) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLikeToggle,
  onRepliesUpdate,
}) => {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* ===================== HELPERS ===================== */
  const normalizeLikes = (arr: any[] = []) =>
    arr.map((l) => String(l?._id ?? l));

  const getMediaUrl = (url: string) =>
    url?.startsWith("http") ? url : `${API}/${url}`;

  /* ===================== STATE ===================== */
  const initialLikes = useMemo(() => normalizeLikes(post.likes), [post.likes]);
  const initialIsLiked = useMemo(() => {
    if (!currentUser?._id) return false;
    return initialLikes.includes(String(currentUser._id));
  }, [initialLikes, currentUser]);

  const [localLiked, setLocalLiked] = useState<boolean>(initialIsLiked);
  const [localCount, setLocalCount] = useState<number>(post.likes.length);
  const [showChat, setShowChat] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Synchronization Lock
  const lastInteractTime = useRef<number>(0);
  const isRequesting = useRef<boolean>(false);

  /* ===================== ROBUST SYNC ===================== */
  useEffect(() => {
    const now = Date.now();
    if (now - lastInteractTime.current < 2000 || isRequesting.current) return;

    const incomingLikes = normalizeLikes(post.likes);
    const incomingIsLiked = currentUser?._id ? incomingLikes.includes(String(currentUser._id)) : false;

    setLocalLiked(incomingIsLiked);
    setLocalCount(post.likes.length);
  }, [post.likes, currentUser]);

  /* ===================== LIKE HANDLER ===================== */
  const handleLike = async () => {
    if (!currentUser?._id) {
      toast.info("Please login to like posts");
      return;
    }

    lastInteractTime.current = Date.now();
    isRequesting.current = true;

    // Instant feedback
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    const targetState = !localLiked;
    setLocalLiked(targetState);
    setLocalCount(prev => targetState ? prev + 1 : prev - 1);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/api/community/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const serverLikes = normalizeLikes(res.data);
      onLikeToggle(post._id, serverLikes);

      setLocalLiked(serverLikes.includes(String(currentUser._id)));
      setLocalCount(serverLikes.length);
    } catch (err) {
      setLocalLiked(!targetState);
      setLocalCount(prev => !targetState ? prev + 1 : prev - 1);
    } finally {
      isRequesting.current = false;
    }
  };

  /* ===================== SHARE ===================== */
  const handleShare = async () => {
    const url = `${window.location.origin}/community`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AIGENXT Community",
          text: post.content,
          url,
        });
      } catch { }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    }
  };

  /* ===================== VOTE HANDLER ===================== */
  const handleVote = async (optionIndex: number) => {
    if (!currentUser?._id) return toast.info("Please login to vote");
    if (isVoting) return;

    setIsVoting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/api/community/${post._id}/vote`,
        { optionIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vote recorded");
    } catch {
      toast.error("Vote failed");
    } finally {
      setIsVoting(false);
    }
  };

  /* ===================== REPLY ===================== */
  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !currentUser?._id) return;

    setIsSubmittingReply(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/api/community/${post._id}/reply`,
        { content: replyContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onRepliesUpdate(post._id, res.data);
      setReplyContent("");
      toast.success("Comment posted");
    } catch {
      toast.error("Failed to comment");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  /* ===================== POLL HELPERS ===================== */
  const totalVotes =
    post.poll?.options?.reduce((acc: number, o: any) => acc + o.votes.length, 0) || 0;

  const hasStatus = post.poll?.options?.findIndex((o: any) =>
    normalizeLikes(o.votes).includes(String(currentUser?._id))
  );

  /* ===================== UI ===================== */
  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-2xl max-w-[600px] mx-auto text-white overflow-hidden shadow-2xl transition-all hover:border-white/20">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b border-white/5 bg-white/2 backdrop-blur-sm">
        <div className="flex gap-3 items-center">
          <Avatar className="w-10 h-10 border border-white/10">
            <AvatarImage src={post.author?.profileImage} />
            <AvatarFallback className="bg-primary/20 text-primary font-bold">
              {post.author?.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-sm tracking-tight">{post.author?.fullName}</p>
            <span className="text-[9px] text-primary/80 font-black uppercase tracking-widest px-1.5 py-0.5 bg-primary/10 rounded">
              {post.author?.role || "Member"}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-200 leading-relaxed font-medium">{post.content}</p>

        {post.mediaUrl && (
          <div className="relative group overflow-hidden rounded-xl border border-white/5 bg-black/40">
            <img
              src={getMediaUrl(post.mediaUrl)}
              className="w-full max-h-[500px] object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
              draggable={false}
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* POLL DISPLAY */}
        {post.poll && (post.poll.question || post.poll.options?.length > 0) && (
          <div className="bg-[#151921] border border-white/5 rounded-2xl p-5 space-y-4 shadow-inner">
            <h4 className="text-sm font-bold flex items-center gap-2 text-primary/90">
              <BarChart2 className="w-4 h-4" />
              {post.poll.question}
            </h4>
            <div className="space-y-3">
              {post.poll.options.map((option: any, index: number) => {
                const percentage = totalVotes > 0 ? Math.round((option.votes.length / totalVotes) * 100) : 0;
                const votedForThis = hasStatus === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleVote(index)}
                    disabled={isVoting}
                    className={`w-full group relative h-12 rounded-xl border transition-all overflow-hidden flex items-center justify-between px-4 ${votedForThis
                      ? "border-primary/40 bg-primary/5"
                      : "border-white/5 hover:border-white/10 hover:bg-white/5"
                      }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 ${votedForThis ? "bg-primary/20" : "bg-white/5"} transition-all duration-700 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex items-center gap-3 z-10">
                      <span className={`text-xs font-bold ${votedForThis ? "text-primary" : "text-gray-300"}`}>{option.text}</span>
                      {votedForThis && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                    </div>
                    <span className="relative z-10 text-[10px] font-black font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                      {percentage}%
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-500 pt-1">
              <span>{totalVotes} Votes</span>
              {hasStatus !== -1 && <span className="text-primary/70 animate-pulse">Vote Recorded</span>}
            </div>
          </div>
        )}

        {post.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-[9px] font-bold border-white/5 text-gray-400 hover:text-primary transition-colors cursor-pointer">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 bg-white/1 border-t border-white/5">
        <div className="flex justify-between items-center text-xs">
          <div className="flex gap-4 items-center">
            {/* 👍 STABLE LIKE BUTTON (FIXED WIDTH) */}
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors select-none group relative w-[90px] justify-start"
            >
              <AnimatePresence>
                {isAnimating && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-2 top-0 bottom-0 m-auto w-4 h-4 bg-white/20 rounded-full z-0 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
                className="relative z-10"
              >
                <ThumbsUp className={`w-5 h-5 ${localLiked ? "fill-white text-white" : ""}`} />
              </motion.div>

              <span className={`font-bold relative z-10 w-9 ${localLiked ? "text-white" : ""}`}>Like</span>

              <span className="font-bold bg-white/5 px-2 py-0.5 rounded-full min-w-[32px] text-center tabular-nums relative z-10">
                {localCount}
              </span>
            </button>

            {/* COMMENTS (FIXED WIDTH) */}
            <button
              onClick={() => setShowChat(!showChat)}
              className="flex gap-2.5 items-center text-gray-400 hover:text-white transition-colors group w-[120px] justify-start"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-bold w-12 text-left">Comment</span>
              <span className="font-bold bg-white/5 px-2 py-0.5 rounded-full min-w-[32px] text-center tabular-nums">
                {post.replies?.length || 0}
              </span>
            </button>

            {/* SHARE */}
            <button
              onClick={handleShare}
              className="flex items-center justify-center text-gray-400 hover:text-white transition-colors w-8 h-8"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <span className="font-bold text-gray-600 uppercase tracking-tighter">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        {/* COMMENTS SECTION */}
        {showChat && (
          <div className="mt-5 space-y-4 animate-in slide-in-from-top-3 duration-300">
            {post.replies?.length > 0 && (
              <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 pr-2">
                {post.replies.map((r: any, i: number) => (
                  <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                    <p className="text-[10px] font-black text-primary/80 uppercase tracking-widest">
                      {r.author?.fullName}
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed">{r.content}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handlePostReply} className="flex gap-3 pt-2">
              <Input
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="h-11 bg-white/5 border-white/10 rounded-xl text-xs focus:ring-primary/50"
              />
              <Button size="icon" className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 transition-colors" disabled={isSubmittingReply}>
                {isSubmittingReply ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4 ml-0.5" />
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
