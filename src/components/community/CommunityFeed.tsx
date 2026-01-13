import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/community/PostCard';

interface CommunityFeedProps {
    posts: any[];
    loading: boolean;
    currentUser: any;
    activeTag: string;
    onLikeToggle: (postId: string, newLikes: string[]) => void;
    onRepliesUpdate: (postId: string, newReplies: any[]) => void;
    onStartDiscussion: () => void;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({
    posts,
    loading,
    currentUser,
    activeTag,
    onLikeToggle,
    onRepliesUpdate,
    onStartDiscussion
}) => {
    return (
        <main className="bg-[#0f1115]/50 backdrop-blur-md border-x border-white/5 h-full overflow-y-auto scrollbar-none relative rounded-t-xl pb-20">
            <style>{`
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="p-4 sm:p-6 space-y-6">
                {/* Mobile Branding (only visible on small screens) */}
                <div className="lg:hidden mb-6 space-y-2">
                    <h1 className="text-3xl font-black tracking-tighter leading-none text-white text-center">
                        AIGENXT <span className="text-primary italic">Talks</span>
                    </h1>
                </div>

                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-[50vh]">
                            <div className="relative">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse" />
                            </div>
                            <p className="text-[10px] font-black tracking-widest text-muted-foreground animate-pulse uppercase">
                                Syncing neural network...
                            </p>
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid gap-6">
                            {posts.map((post: any) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    layout
                                    className="relative z-10"
                                >
                                    <PostCard
                                        post={post}
                                        currentUser={currentUser}
                                        onLikeToggle={onLikeToggle}
                                        onRepliesUpdate={onRepliesUpdate}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-32 text-center min-h-[50vh]"
                        >
                            <div className="bg-white/5 p-6 rounded-full mb-6 ring-1 ring-white/10">
                                <Ghost className="w-12 h-12 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-xl font-black tracking-tighter mb-2 text-white">
                                The Frequency is Silent
                            </h3>
                            <p className="text-xs text-muted-foreground max-w-[250px] mx-auto uppercase tracking-widest font-bold mb-8">
                                Be the first to broadcast in <span className="text-primary">#{activeTag}</span>
                            </p>
                            <Button
                                variant="outline"
                                className="rounded-none h-12 px-8 text-xs font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                onClick={onStartDiscussion}
                            >
                                Initiate Signal
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
};

export default CommunityFeed;
