import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface User {
    _id: string;
    email: string;
    fullName: string;
    phone?: string;
}

interface Props {
    user: User;
    onComplete: (updatedUser: User) => void;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProfileCompletionModal = ({ user, onComplete }: Props) => {
    const [formData, setFormData] = useState({
        fullName: user.fullName || "",
        phone: user.phone || "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName.trim() || !formData.phone.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `${API}/api/auth/profile`,
                { ...formData, email: user.email }, // Send email to keep backend happy if it requires it
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Profile updated successfully!");
            onComplete(res.data.user);
            // Force reload to ensure dashboard unlocks
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Complete Your Profile</h2>
                    <p className="text-muted-foreground text-sm">
                        Please provide your details to continue to the dashboard.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Email Address</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            disabled
                            className="w-full h-11 px-4 rounded-xl bg-muted/30 border-none text-muted-foreground focus:ring-0 cursor-not-allowed"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Phone Number</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-11 px-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Saving..." : "Save & Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileCompletionModal;
