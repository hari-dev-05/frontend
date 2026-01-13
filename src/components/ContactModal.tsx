import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipientType: 'investment' | 'partnership' | 'hiring';
    title: string;
    description: string;
    defaultSubject: string;
    defaultBody?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({
    isOpen,
    onClose,
    recipientType,
    title,
    description,
    defaultSubject,
    defaultBody = ""
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: defaultSubject,
        message: defaultBody
    });
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        try {
            await axios.post(`${API}/api/admin/contact`, {
                ...formData,
                recipientType
            });
            setIsSuccess(true);
            toast.success("Message sent successfully!");
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setFormData({ ...formData, message: '' });
            }, 2000);
        } catch (err) {
            console.error(err);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    const handleGmailRedirect = () => {
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(formData.message);
        const url = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
        window.open(url, '_blank');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl p-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                <DialogHeader className="p-6 pb-2 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold tracking-tight">{title}</DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-2">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300 relative z-10">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold">Message Sent!</h3>
                        <p className="text-muted-foreground mt-2">The AIGENXT team will get back to you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4 relative z-10">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-muted/10 border-border/30 focus:border-primary/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-muted/10 border-border/30 focus:border-primary/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                placeholder="What is this about?"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="bg-muted/10 border-border/30 focus:border-primary/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Write your inquiry here..."
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="bg-muted/10 border-border/30 focus:border-primary/50 transition-all resize-none"
                            />
                        </div>

                        <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                className="flex-1 gap-2 border-border/50 hover:bg-muted/10"
                                onClick={handleGmailRedirect}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Open in Gmail
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                                disabled={isSending}
                            >
                                {isSending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                                Send Message
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ContactModal;
