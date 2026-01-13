import React, { useState, useRef } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Video, X, Loader2, Send, Hash, BarChart2, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPostCreated: (post: any) => void;
}

const AVAILABLE_TAGS = ["AI Innovation", "General", "Doubts", "Feedback", "Showcase"];

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPostCreated }) => {
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>(["General"]);
    const [media, setMedia] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPollMode, setIsPollMode] = useState(false);
    const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const token = localStorage.getItem('token');

        try {
            const formData = new FormData();
            formData.append('content', content);
            formData.append('tags', JSON.stringify(selectedTags));
            if (media) {
                formData.append('media', media);
            }
            if (isPollMode) {
                const pollData = {
                    question: content,
                    options: pollOptions.filter(opt => opt.trim() !== '').map(opt => ({ text: opt, votes: [] })),
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                };
                formData.append('poll', JSON.stringify(pollData));
                formData.append('mediaType', 'poll');
            }

            const res = await axios.post(`${API}/api/community`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            onPostCreated(res.data);
            toast.success("Post shared with the community!");
            handleClose();
        } catch (err: any) {
            console.error(err);
            const errorMsg = err.response?.data?.error || err.response?.data?.msg || "Failed to share post. Please try again.";
            const details = err.response?.data?.details; // Mongoose validation errors

            toast.error(errorMsg, {
                description: details ? details.join(", ") : "Check console for more details."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setContent('');
        setSelectedTags(["General"]);
        setMedia(null);
        setPreviewUrl(null);
        setIsPollMode(false);
        setPollOptions(['', '']);
        onClose();
    };

    const addPollOption = () => {
        if (pollOptions.length < 6) {
            setPollOptions([...pollOptions, '']);
        }
    };

    const removePollOption = (index: number) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    };

    const updatePollOption = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[550px] bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl p-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                <DialogHeader className="p-6 pb-2 relative z-10">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Send className="w-4 h-4 text-primary" />
                        </span>
                        Share with Community
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                        Post your thoughts, share images, or ask the community a question.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-5 relative z-10">
                    <Textarea
                        placeholder="What's on your mind? Share your thoughts, AI innovations, or ask a doubt..."
                        className="min-h-[120px] bg-muted/10 border-border/30 focus:border-primary/50 transition-all resize-none text-base leading-relaxed"
                        value={content}
                        required
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {/* Tags Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                            <Hash className="w-4 h-4" /> Categorize your post
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {AVAILABLE_TAGS.map(tag => (
                                <Badge
                                    key={tag}
                                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                                    className={`cursor-pointer transition-all px-3 py-1 text-xs font-medium ${selectedTags.includes(tag)
                                        ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                                        : "hover:bg-primary/5 border-border/50"
                                        }`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Media Preview */}
                    {previewUrl && (
                        <div className="relative rounded-xl overflow-hidden border border-border/50 bg-muted/20 aspect-video group">
                            {media?.type.startsWith('video') ? (
                                <video src={previewUrl} className="w-full h-full object-cover" controls />
                            ) : (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            )}
                            <button
                                type="button"
                                onClick={() => { setMedia(null); setPreviewUrl(null); }}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Poll Section */}
                    {isPollMode && (
                        <div className="space-y-3 bg-muted/5 p-4 rounded-xl border border-border/30">
                            <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground mb-2">
                                <BarChart2 className="w-4 h-4 text-primary" /> Poll Options
                            </label>
                            <div className="space-y-2">
                                {pollOptions.map((option, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            onChange={(e) => updatePollOption(index, e.target.value)}
                                            className="bg-background/50 border-border/30 focus:border-primary/50"
                                        />
                                        {pollOptions.length > 2 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removePollOption(index)}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {pollOptions.length < 6 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addPollOption}
                                    className="w-full mt-2 border-dashed border-border/50 hover:bg-primary/5 text-xs font-bold gap-2"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Add Option
                                </Button>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="gap-2 border-border/50 hover:bg-primary/5"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImageIcon className="w-4 h-4 text-blue-500" />
                                <span className="hidden sm:inline">Photo</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="gap-2 border-border/50 hover:bg-primary/5"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Video className="w-4 h-4 text-purple-500" />
                                <span className="hidden sm:inline">Video</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={`gap-2 border-border/50 ${isPollMode ? 'bg-primary/10 border-primary/50 text-primary' : 'hover:bg-primary/5'}`}
                                onClick={() => {
                                    setIsPollMode(!isPollMode);
                                    if (!isPollMode) {
                                        setMedia(null);
                                        setPreviewUrl(null);
                                    }
                                }}
                            >
                                <BarChart2 className="w-4 h-4 text-primary" />
                                <span className="hidden sm:inline">Poll</span>
                            </Button>
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                accept="image/*,video/*"
                                onChange={handleMediaChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting || !content.trim() || (isPollMode && pollOptions.filter(o => o.trim()).length < 2)}
                            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all font-bold px-8 shadow-lg shadow-primary/20"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Send className="w-4 h-4 mr-2" />
                            )}
                            Post
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePostModal;
