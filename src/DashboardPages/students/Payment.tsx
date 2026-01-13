import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CourseCard from "@/components/CourseCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const Payment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const course = state?.course;

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        redeem: "",
    });

    const [isValidating, setIsValidating] = useState(false);
    const [redeemStatus, setRedeemStatus] = useState<"idle" | "valid" | "invalid">("idle");
    const [redeemMessage, setRedeemMessage] = useState("");
    const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);

    // ✅ Fetch logged in user email
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch("http://localhost:5000/api/auth/me", {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const data = await response.json();
                    if (data.user) {
                        setLoggedInEmail(data.user.email);
                        setFormData(prev => ({
                            ...prev,
                            email: data.user.email,
                            name: prev.name || data.user.fullName || "",
                            phone: prev.phone || data.user.phone || ""
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };
        fetchUser();
    }, []);

    // Automatically validate when code reaches 9 characters, email changes, or loggedInEmail is fetched
    useEffect(() => {
        if (formData.redeem.length === 9) {
            handleValidateRedeem(formData.redeem, formData.email, loggedInEmail);
        } else {
            setRedeemStatus("idle");
            setRedeemMessage("");
        }
    }, [formData.redeem, formData.email, loggedInEmail]);

    const handleValidateRedeem = async (code: string, formEmail?: string, authEmail?: string | null) => {
        const regex = /^c[a-zA-Z0-9]{8}$/;
        if (!regex.test(code)) {
            setRedeemStatus("invalid");
            setRedeemMessage("Pattern must be cXXXXXXXX (9 chars)");
            return;
        }

        setIsValidating(true);
        try {
            // Use a template string for the URL to avoid any URL constructor issues
            let fetchUrl = `http://localhost:5000/api/auth/validate-redeem-code/${code}?`;
            if (formEmail) fetchUrl += `formEmail=${encodeURIComponent(formEmail)}&`;
            if (authEmail) fetchUrl += `authEmail=${encodeURIComponent(authEmail)}`;

            const response = await fetch(fetchUrl);

            // Check if response is ok and is JSON
            const contentType = response.headers.get("content-type");
            if (!response.ok || !contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                console.error("Server error response:", text);
                throw new Error("Invalid server response");
            }

            const data = await response.json();

            if (data.valid) {
                setRedeemStatus("valid");
                setRedeemMessage(data.message);
                toast.success("Redeem code verified!");
            } else {
                setRedeemStatus("invalid");
                setRedeemMessage(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            setRedeemStatus("invalid");
            setRedeemMessage("Error connecting to server");
        } finally {
            setIsValidating(false);
        }
    };

    const handleEnroll = async () => {
        const missingFields = [];
        if (!formData.name) missingFields.push("Full Name");
        if (!formData.phone) missingFields.push("Phone Number");
        if (!formData.email) missingFields.push("Email");
        if (!formData.redeem) missingFields.push("Redeem Code");

        if (missingFields.length > 0) {
            toast.error(`Please fill: ${missingFields.join(", ")}`);
            return;
        }

        if (redeemStatus !== "valid") {
            toast.error("Please provide a valid redeem code from another student");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please log in to complete enrollment");
                navigate("/auth");
                return;
            }

            const response = await fetch("http://localhost:5000/api/auth/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseId: course._id || course.id,
                    courseTitle: course.title,
                    redeemCode: formData.redeem
                })
            });

            if (response.ok) {
                toast.success("Enrollment Successful! Welcome to " + course.title);

                // Wait 2 seconds then redirect to Dashboard (MyCourse section)
                setTimeout(() => {
                    navigate("/affiliate?section=courses");
                }, 2000);
            } else {
                toast.error("Failed to save enrollment");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error during enrollment");
        }
    };

    if (!course) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Course not found</h2>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* LEFT: COURSE CARD */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Your Selection</h2>
                            <p className="text-muted-foreground mt-2">You're one step away from excellence.</p>
                        </div>
                        <div className="max-w-md mx-auto lg:mx-0">
                            <CourseCard course={course} />
                        </div>

                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-4">
                            <h4 className="font-semibold flex items-center gap-2">
                                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">i</span>
                                Why choose this course?
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Expert-led instruction with real-world projects</li>
                                <li>• Lifetime access to course materials and updates</li>
                                <li>• Industry-recognized certificate upon completion</li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: PAYMENT FORM */}
                    <div className="relative group animate-in fade-in slide-in-from-right duration-700">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative border rounded-3xl p-8 md:p-10 space-y-8 bg-card shadow-2xl">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Secure Checkout</h2>
                                <p className="text-muted-foreground">Please enter your billing details to proceed.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
                                            disabled={!!loggedInEmail}
                                        />
                                        {loggedInEmail && <p className="text-[10px] text-muted-foreground ml-1">Using logged in account</p>}
                                    </div>
                                </div>



                                <div className="space-y-2 pt-2">
                                    <Label htmlFor="redeem" className="text-sm font-bold text-primary uppercase tracking-widest flex justify-between">
                                        Redeem Code
                                        <span className="text-[10px] font-normal text-muted-foreground lowercase">Pattern: cXXXXXXXX</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="redeem"
                                            placeholder="cxxxxxxxx"
                                            maxLength={9}
                                            value={formData.redeem}
                                            onChange={(e) => setFormData({ ...formData, redeem: e.target.value })}
                                            className={`h-12 border-dashed bg-primary/5 focus-visible:ring-2 transition-all placeholder:opacity-50 pr-10 ${redeemStatus === "valid" ? "border-green-500 ring-green-500/20" :
                                                redeemStatus === "invalid" ? "border-red-500 ring-red-500/20" : "border-primary/30"
                                                }`}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {isValidating && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                                            {redeemStatus === "valid" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                            {redeemStatus === "invalid" && <XCircle className="w-5 h-5 text-red-500" />}
                                        </div>
                                    </div>
                                    {redeemMessage && (
                                        <p className={`text-[11px] font-medium ${redeemStatus === "valid" ? "text-green-500" : "text-red-500"}`}>
                                            {redeemMessage}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <div className="flex justify-between items-center mb-6 px-1">
                                        <span className="text-muted-foreground">Total Amount</span>
                                        <span className="text-3xl font-black text-primary">₹{course.price}</span>
                                    </div>
                                    <Button
                                        onClick={handleEnroll}
                                        disabled={redeemStatus !== "valid"}
                                        className="w-full h-16 text-xl font-black rounded-2xl transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:grayscale"
                                        size="lg"
                                    >
                                        Complete Enrollment
                                    </Button>
                                </div>

                                <div className="flex items-center justify-center gap-4 pt-4 grayscale opacity-50">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" className="h-4" alt="UPI" />
                                </div>

                                <p className="text-center text-[10px] text-muted-foreground leading-relaxed px-10">
                                    By clicking "Complete Enrollment", you agree to AIGENXT's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
