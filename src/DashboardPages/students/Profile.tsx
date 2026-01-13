import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Phone, ShieldCheck, Camera, Loader2 } from "lucide-react";

interface UserData {
    fullName: string;
    email: string;
    phone?: string;
    authProvider: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    profileImage?: string;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profile = ({ onProfileUpdate }: { onProfileUpdate?: (user: any) => void }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [editData, setEditData] = useState({
        fullName: "",
        email: "",
        phone: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`${API}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    const u = res.data.user;
                    if (u) {
                        setUser(u);
                        setEditData({
                            fullName: u.fullName || "",
                            email: u.email || "",
                            phone: u.phone || "",
                        });
                    }
                })
                .catch((err) => console.error("Error fetching profile:", err));
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;

        setIsLoading(true);
        try {
            const res = await axios.put(`${API}/api/auth/profile`, editData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Optionally show a success toast here
            // Update local state immediately
            if (res.data.user) {
                const u = res.data.user;
                setUser(u);
                setEditData({
                    fullName: u.fullName || "",
                    email: u.email || "",
                    phone: u.phone || "",
                });
                if (onProfileUpdate) {
                    onProfileUpdate(u);
                }
                // Force reload as requested to ensure UI sync
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            // fetchProfile(); // Removed as we are reloading
        } catch (err: any) {
            console.error("Error updating profile:", err);
            // Optionally show an error toast here
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendOtp = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setIsSendingOtp(true);
        setOtpMessage("");
        try {
            await axios.post(`${API}/api/auth/send-phone-otp`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowOtpInput(true);
            setOtpMessage("OTP sent! Please check server console.");
        } catch (err: any) {
            console.error("Error sending OTP:", err);
            setOtpMessage("Failed to send OTP.");
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (!otpValue) {
            setOtpMessage("Please enter the OTP.");
            return;
        }

        setIsVerifyingOtp(true);
        setOtpMessage("");
        try {
            await axios.post(`${API}/api/auth/verify-phone-otp`, { otp: otpValue }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowOtpInput(false);
            setOtpValue("");
            fetchProfile();
            setOtpMessage("Phone verified successfully!");
        } catch (err: any) {
            console.error("Error verifying OTP:", err);
            setOtpMessage(err.response?.data?.message || "Invalid OTP.");
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        const formData = new FormData();
        formData.append("image", file);

        setIsUploading(true);
        try {
            const res = await axios.post(`${API}/api/auth/upload-profile-image`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });

            // Update local state with new image
            if (res.data.imageUrl) {
                const updatedUser = { ...user!, profileImage: res.data.imageUrl };
                setUser(updatedUser);
                if (onProfileUpdate) {
                    onProfileUpdate(updatedUser);
                }
                // Force reload to sync everywhere
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (err) {
            console.error("Error uploading image:", err);
            // toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    if (!user) return <div className="p-6">Loading profile...</div>;

    return (
        <div className="p-6 max-w-4xl space-y-10 animate-in fade-in duration-500">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
                <p className="text-muted-foreground">Manage your account information and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Profile Card (Read Only) */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-8">
                    <div className="flex items-center gap-6 pb-6 border-b border-border">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner overflow-hidden">
                                {user.profileImage ? (
                                    <img
                                        src={`${API}${user.profileImage}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-12 h-12" />
                                )}
                            </div>

                            {/* Upload Overlay */}
                            <div
                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {isUploading ? (
                                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                                ) : (
                                    <Camera className="w-8 h-8 text-white" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{user.fullName || "User"}</h3>
                            <p className="text-muted-foreground capitalize">{user.authProvider} Account</p>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Email Address</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Phone Number</p>
                                    <p className="font-medium">{user.phone || "Not provided"}</p>
                                </div>
                            </div>
                            {user.phone && user.phoneVerified ? (
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                                        <span className="text-lg font-bold leading-none">!</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Not Verified</span>
                                    </div>
                                    {user.phone && !showOtpInput && (
                                        <button
                                            onClick={handleSendOtp}
                                            disabled={isSendingOtp}
                                            className="text-[10px] font-bold uppercase tracking-wider bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 transition disabled:opacity-50"
                                        >
                                            {isSendingOtp ? "Sending..." : "Verify"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {showOtpInput && (
                            <div className="bg-muted p-4 rounded-xl space-y-4 animate-in slide-in-from-top duration-300">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Enter 6-digit OTP</p>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={otpValue}
                                            onChange={(e) => setOtpValue(e.target.value)}
                                            className="flex-1 h-10 px-3 rounded-lg bg-background border-none focus:ring-2 focus:ring-primary/50 transition-all outline-none text-center font-bold tracking-[0.5em]"
                                            placeholder="000000"
                                        />
                                        <button
                                            onClick={handleVerifyOtp}
                                            disabled={isVerifyingOtp}
                                            className="bg-primary text-white px-6 rounded-lg font-bold text-sm hover:bg-primary/90 transition disabled:opacity-50"
                                        >
                                            {isVerifyingOtp ? "..." : "Confirm"}
                                        </button>
                                    </div>
                                </div>
                                {otpMessage && (
                                    <p className={`text-[10px] font-medium ${otpMessage.includes("success") ? "text-green-500" : "text-yellow-600"}`}>
                                        {otpMessage}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Account Status</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    <p className="font-medium text-green-500">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="border rounded-2xl p-8 bg-card shadow-sm space-y-8 h-full flex flex-col justify-between">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold">Edit Details</h3>
                        <p className="text-sm text-muted-foreground">Update your personal information below.</p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editData.fullName}
                                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={editData.phone}
                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                    placeholder="Enter your phone"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] mt-10 disabled:opacity-50"
                        >
                            {isLoading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
