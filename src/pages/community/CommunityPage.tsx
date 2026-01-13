import React, { useState, useEffect } from 'react';
import {
    Users,
    TrendingUp,
    Hash,
    Filter,
    Sparkles,
    Plus,
    AlertCircle,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CreatePostModal from '@/components/community/CreatePostModal';
import CommunityFeed from '@/components/community/CommunityFeed';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { toast } from 'sonner';

const CATEGORIES = ["All", "AI Innovation", "General", "Doubts", "Feedback", "Showcase"];

const CommunityPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTag, setActiveTag] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [trendingTags, setTrendingTags] = useState<any[]>([]);

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        let userObj = null;

        // 1. Try to get user from local storage
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                // Handle case where user is wrapped in "user" property (legacy bug)
                if (parsed.user && parsed.user._id) {
                    userObj = parsed.user;
                } else if (parsed._id) {
                    userObj = parsed;
                }
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
            }
        }

        // 2. If valid user object found, use it
        if (userObj) {
            setCurrentUser(userObj);
            // Ensure local storage is normalized
            if (JSON.stringify(userObj) !== storedUser) {
                localStorage.setItem('user', JSON.stringify(userObj));
            }
        }
        // 3. If no user but token exists, fetch from API
        else if (token) {
            axios.get(`${API}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    const userData = res.data.user || res.data;
                    setCurrentUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                })
                .catch(err => {
                    console.error("Failed to fetch user:", err);
                    // If token is invalid, maybe clear it? For now, just log.
                });
        }

        fetchPosts();
        fetchTrendingTags();
    }, [activeTag]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/community?tag=${activeTag}&search=${searchQuery}`);
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingTags = async () => {
        try {
            const res = await axios.get(`${API}/api/community/trending-tags`);
            setTrendingTags(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchPosts();
    };

    const handlePostCreated = (newPost: any) => {
        // Since posts require approval, we don't add it to the list immediately
        // setPosts([newPost, ...posts]); 
        toast.info("Post Submitted", {
            description: "Your post is pending approval and will appear once reviewed by an admin.",
        });
        fetchTrendingTags();
    };

    const handleLikeToggle = (postId: string, newLikes: string[]) => {
        setPosts((prev: any) => prev.map((p: any) =>
            p._id === postId ? { ...p, likes: newLikes } : p
        ));
    };

    const [rejectedPosts, setRejectedPosts] = useState<any[]>([]);

    useEffect(() => {
        // ... (existing user fetch logic) ...
        // We will just append fetchRejectedPosts() call here efficiently
        // Actually, we can just call it in a separate useEffect or the same one.
        // Let's add it to the existing useEffect logic or a new one dependent on currentUser?
        // Since the previous useEffect fetches currentUser, let's verify if we need currentUser to be set first?
        // Backend uses token, so as long as we have token it works.
        fetchRejectedPosts();
    }, []); // Run once on mount

    const fetchRejectedPosts = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await axios.get(`${API}/api/community/my-rejected`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRejectedPosts(res.data);
        } catch (err) {
            console.error("Failed to fetch rejected posts", err);
        }
    };

    const handleDismissRejected = async (postId: string) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API}/api/community/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRejectedPosts(prev => prev.filter(p => p._id !== postId));
            toast.success("Notification dismissed");
        } catch (err) {
            toast.error("Failed to dismiss notification");
        }
    };

    const handleRepliesUpdate = (postId: string, newReplies: any[]) => {
        setPosts((prev: any) => prev.map((p: any) =>
            p._id === postId ? { ...p, replies: newReplies } : p
        ));
    };

    return (
        <div className="h-screen bg-[#020817] text-white overflow-hidden flex flex-col">
            <Navbar />
            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onPostCreated={handlePostCreated}
            />

            {/* Main Content Area - Fixed Height minus Navbar */}
            <div className="flex-1 container mx-auto px-4 lg:px-8 overflow-hidden pt-20">
                <div className="h-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

                    {/* 🟢 LEFT LAYER: Static Wrapper */}
                    <aside className="hidden lg:flex flex-col h-full overflow-hidden pb-4">
                        <div className="h-full overflow-y-auto pr-2 scrollbar-none space-y-8">
                            <style>{`
                                .scrollbar-none::-webkit-scrollbar { display: none; }
                                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
                            `}</style>

                            <div className="space-y-4 pt-4">
                                <h1 className="text-4xl font-black tracking-tighter leading-none text-white">
                                    AIGENXT <br />
                                    <span className="text-primary italic">Talks</span>
                                </h1>
                            </div>

                            <Button
                                onClick={() => setIsCreateModalOpen(true)}
                                size="lg"
                                className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all shadow-2xl shadow-primary/20 h-12 px-6 font-black text-xs uppercase tracking-widest group rounded-none w-full"
                            >
                                <Plus className="mr-2 w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                                Start a Discussion
                            </Button>

                            {/* Discovery Sidebar */}
                            <div className="bg-[#0f1115]/90 backdrop-blur-2xl border border-white/5 rounded-none p-6 shadow-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                                <h3 className="font-bold flex items-center gap-2 mb-6 text-[10px] uppercase tracking-widest text-muted-foreground relative z-10">
                                    <Filter className="w-3.5 h-3.5" /> Discovery
                                </h3>
                                <nav className="space-y-2 relative z-10">
                                    {CATEGORIES.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveTag(category)}
                                            className={`w-full flex items-center justify-between group px-4 py-3 rounded-none transition-all duration-300 font-bold text-xs ${activeTag === category
                                                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
                                                : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Hash className={`w-3.5 h-3.5 ${activeTag === category ? "opacity-100" : "opacity-30"}`} />
                                                <span>{category}</span>
                                            </div>
                                            {activeTag === category && (
                                                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Hot Topics */}
                            <div className="bg-[#0f1115]/70 backdrop-blur-xl border border-white/5 rounded-none p-6 shadow-2xl relative overflow-hidden">
                                <h3 className="font-bold flex items-center gap-2 mb-6 text-[10px] uppercase tracking-widest text-muted-foreground">
                                    <TrendingUp className="w-4 h-4 text-primary" /> Hot Topics
                                </h3>
                                <div className="space-y-4">
                                    {trendingTags.length > 0 ? (
                                        trendingTags.map((tag, index) => (
                                            <div
                                                key={tag.name}
                                                className="flex items-center justify-between group cursor-pointer"
                                                onClick={() => setActiveTag(tag.name)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-sm font-black italic ${index === 0 ? "text-primary" : "text-muted-foreground/30"}`}>
                                                        {index + 1}
                                                    </span>
                                                    <p className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                                        {tag.name}
                                                    </p>
                                                </div>
                                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-black h-5 px-2">
                                                    {tag.count}
                                                </Badge>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-[10px] text-muted-foreground italic tracking-widest">Scanning...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>


                    {/* 🔵 CENTER LAYER: Scrollable Feed - Wrapped for alignment */}
                    <div className="h-full overflow-hidden flex flex-col pt-4 relative">

                        {/* 🔴 Rejection Notifications */}
                        {rejectedPosts.length > 0 && (
                            <div className="mb-4 space-y-2 px-2 shrink-0">
                                {rejectedPosts.map((post: any) => (
                                    <div key={post._id} className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                                        <div className="p-2 bg-red-500/20 rounded-full shrink-0">
                                            <AlertCircle className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-red-400">Post Rejected</h4>
                                            <p className="text-xs text-gray-300 mt-1">
                                                Your post starting with "{post.content.substring(0, 30)}..." was rejected by the admin.
                                            </p>
                                            <div className="mt-2 bg-black/30 p-2 rounded text-xs text-gray-400 border border-red-500/20">
                                                <span className="font-semibold text-red-400">Reason:</span> {post.rejectionReason}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDismissRejected(post._id)}
                                            className="text-gray-400 hover:text-white hover:bg-red-500/20 h-8 w-8 p-0 rounded-full"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <CommunityFeed
                            posts={posts}
                            loading={loading}
                            currentUser={currentUser}
                            activeTag={activeTag}
                            onLikeToggle={handleLikeToggle}
                            onRepliesUpdate={handleRepliesUpdate}
                            onStartDiscussion={() => setIsCreateModalOpen(true)}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
