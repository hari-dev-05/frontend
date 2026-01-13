import { useParams } from "react-router-dom";
import { course } from "@/data/Courses";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Learning = () => {
    const { id } = useParams();
    // For now we only have one course 'aigenxt'
    const isCorrectCourse = id === course.id;

    if (!isCorrectCourse) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Course not found</h2>
                    <Button onClick={() => window.history.back()}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="pt-24 container mx-auto px-4 pb-20">
                <div className="max-w-4xl mx-auto space-y-8 text-center mt-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                        Learning Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Welcome to {course.title}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Your learning journey starts here. Get ready to master AI with insights!
                    </p>

                    <div className="aspect-video w-full rounded-3xl bg-muted flex items-center justify-center border border-border shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 opacity-50" />
                        <div className="text-center z-10">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-1" />
                            </div>
                            <p className="font-bold text-muted-foreground uppercase tracking-widest text-sm">Course Video Player Coming Soon</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                        {["Modules", "Resources", "Discussion"].map((item) => (
                            <div key={item} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                                <h3 className="font-bold mb-2">{item}</h3>
                                <p className="text-sm text-muted-foreground">Access all your {item.toLowerCase()} here.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Learning;
