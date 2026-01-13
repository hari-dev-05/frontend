import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Play,
    CheckCircle,
    ChevronRight,
    ChevronDown,
    FileText,
    Download,
    ArrowLeft,
    Settings,
    Maximize,
    Volume2,
    Lock,
    MessageSquare,
    ExternalLink,
    HelpCircle,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { course } from "@/data/Courses";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import DiscussionSection from "@/components/DiscussionSection";

import axios from "axios";

// --- TYPES ---
type LessonType = "video" | "assessment" | "link";

interface QuizQuestion {
    _id?: string;
    question: string;
    options: string[];
    correctAnswers: number[];
    explanation?: string;
}

interface Lesson {
    _id: string;
    title: string;
    duration: string;
    type: LessonType;
    isCompleted: boolean;
    locked: boolean;
    videoUrl?: string;
    pdfContent?: string;
    whatsappLink?: string;
    questions?: number;
    quiz?: QuizQuestion[];
}

interface Module {
    _id: string;
    index: number;
    title: string;
    lessons: Lesson[];
}

const QuizPlayer = ({ lesson, onComplete }: { lesson: Lesson; onComplete: () => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showStart, setShowStart] = useState(true);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const questions = lesson.quiz || [];
    const currentQuestion = questions[currentIndex];

    if (!questions.length) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full space-y-4">
                <HelpCircle className="w-16 h-16 text-slate-700" />
                <h3 className="text-xl font-black">No Questions Found</h3>
                <p className="text-slate-500">This assessment currently has no questions.</p>
            </div>
        );
    }

    if (showStart) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 p-12 text-center h-full relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] animate-pulse">
                    <HelpCircle className="w-10 h-10" />
                </div>
                <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2 uppercase">{lesson.title}</h3>
                    <p className="text-slate-400 max-w-md font-medium">Test your understanding of the concepts covered in this module. Prepare for {questions.length} questions.</p>
                </div>
                <Button
                    onClick={() => setShowStart(false)}
                    className="rounded-2xl px-12 h-16 font-black bg-white text-slate-950 hover:bg-slate-200 shadow-xl shadow-white/5 active:scale-95 transition-all text-xs uppercase tracking-widest"
                >
                    Start Assessment
                </Button>
            </div>
        );
    }

    if (quizFinished) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="flex flex-col items-center justify-center space-y-6 p-12 text-center h-full relative z-10">
                <div className="w-24 h-24 rounded-[40px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-2">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2 uppercase">Assessment Complete!</h3>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-5xl font-black text-white">{percentage}%</span>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">You scored {score} out of {questions.length}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        onClick={() => {
                            setCurrentIndex(0);
                            setScore(0);
                            setQuizFinished(false);
                            setIsSubmitted(false);
                            setSelectedIndices([]);
                        }}
                        variant="outline"
                        className="rounded-2xl px-8 h-12 font-black border-slate-800 hover:bg-slate-800 text-[10px] uppercase tracking-widest"
                    >
                        Retake Quiz
                    </Button>
                    <Button
                        onClick={onComplete}
                        className="rounded-2xl px-8 h-12 font-black bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-[10px] uppercase tracking-widest"
                    >
                        Continue Course
                    </Button>
                </div>
            </div>
        );
    }

    const toggleOption = (idx: number) => {
        if (isSubmitted) return;
        setSelectedIndices(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    const handleSubmit = () => {
        if (isSubmitted) {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedIndices([]);
                setIsSubmitted(false);
            } else {
                setQuizFinished(true);
            }
            return;
        }

        const isCorrect =
            selectedIndices.length === currentQuestion.correctAnswers.length &&
            selectedIndices.every(i => currentQuestion.correctAnswers.includes(i));

        if (isCorrect) setScore(score + 1);
        setIsSubmitted(true);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950/20 relative z-10">
            {/* Header Progress */}
            <div className="p-6 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Assessment</h4>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{lesson.title}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-primary uppercase mb-1">Question {currentIndex + 1} of {questions.length}</p>
                    <div className="w-32 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question Body */}
            <ScrollArea className="flex-1 p-8 sm:p-12">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h3 className="text-2xl font-black tracking-tight leading-tight text-white mb-8">
                        {currentQuestion.question}
                    </h3>

                    <div className="grid gap-3">
                        {currentQuestion.options.map((opt, idx) => {
                            const isSelected = selectedIndices.includes(idx);
                            const isCorrect = currentQuestion.correctAnswers.includes(idx);
                            let statusClasses = "border-slate-800 bg-slate-900/50 hover:border-slate-700";

                            if (isSubmitted) {
                                if (isCorrect) statusClasses = "border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_-10px_rgba(16,185,129,0.5)]";
                                else if (isSelected && !isCorrect) statusClasses = "border-red-500 bg-red-500/10 text-red-500";
                                else statusClasses = "border-slate-800 bg-slate-900/40 opacity-50";
                            } else if (isSelected) {
                                statusClasses = "border-primary bg-primary/10 text-primary shadow-[0_0_20px_-10px_rgba(59,130,246,0.5)]";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => toggleOption(idx)}
                                    disabled={isSubmitted}
                                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group ${statusClasses} active:scale-[0.98]`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs border ${isSubmitted && isCorrect ? "bg-emerald-500 border-emerald-500 text-slate-950" :
                                        isSelected ? "bg-primary border-primary text-white" : "bg-slate-950 border-slate-800 text-slate-500 group-hover:border-slate-700"
                                        }`}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <span className="flex-1 text-sm font-bold">{opt}</span>
                                    {isSubmitted && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                    {isSubmitted && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                                </button>
                            );
                        })}
                    </div>

                    <AnimatePresence>
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-6 rounded-3xl border ${selectedIndices.every(i => currentQuestion.correctAnswers.includes(i)) && selectedIndices.length === currentQuestion.correctAnswers.length
                                    ? "bg-emerald-500/5 border-emerald-500/20"
                                    : "bg-red-500/5 border-red-500/20"
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${selectedIndices.every(i => currentQuestion.correctAnswers.includes(i)) && selectedIndices.length === currentQuestion.correctAnswers.length
                                        ? "bg-emerald-500/20 text-emerald-500"
                                        : "bg-red-500/20 text-red-500"
                                        }`}>
                                        {selectedIndices.every(i => currentQuestion.correctAnswers.includes(i)) && selectedIndices.length === currentQuestion.correctAnswers.length
                                            ? <CheckCircle className="w-5 h-5" />
                                            : <X className="w-5 h-5" />}
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-black uppercase tracking-wider">
                                            {selectedIndices.every(i => currentQuestion.correctAnswers.includes(i)) && selectedIndices.length === currentQuestion.correctAnswers.length
                                                ? "Perfect! That's corrected."
                                                : `Oops! Correct answer is ${currentQuestion.correctAnswers.map(i => String.fromCharCode(65 + i)).join(", ")}.`}
                                        </h4>
                                        {currentQuestion.explanation && (
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                                                {currentQuestion.explanation}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">
                    {isSubmitted ? "Review your answer and continue." : "Choose ALL answers that apply."}
                </p>
                <Button
                    onClick={handleSubmit}
                    disabled={!isSubmitted && selectedIndices.length === 0}
                    className={`rounded-xl px-10 h-12 font-black uppercase text-[10px] tracking-widest transition-all ${isSubmitted ? "bg-emerald-500 text-slate-950 hover:bg-emerald-600" : "bg-white text-slate-950 hover:bg-slate-200"
                        }`}
                >
                    {isSubmitted ? (currentIndex < questions.length - 1 ? "Next Question" : "See Results") : "Submit Answer"}
                </Button>
            </div>
        </div>
    );
};

const CourseLearningPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modules, setModules] = useState<Module[]>([]);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [expandedModules, setExpandedModules] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
    const [totalLessonsCount, setTotalLessonsCount] = useState(0);

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // 1. Fetch Curriculum
                const modulesRes = await axios.get(`${API}/api/course/modules`);
                const allModules: Module[] = modulesRes.data;

                // Calculate total lessons
                const total = allModules.reduce((acc, m) => acc + m.lessons.length, 0);
                setTotalLessonsCount(total);

                // 2. Fetch User Progress
                const token = localStorage.getItem("token");
                let completedIds: string[] = [];
                if (token) {
                    const userRes = await axios.get(`${API}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const courseProgress = userRes.data.user.completedLessons?.find(
                        (c: any) => c.courseId === "aigenxt" // Hardcoded for now as per current setup
                    );
                    if (courseProgress) {
                        completedIds = courseProgress.lessonIds;
                    }
                }
                setCompletedLessonIds(completedIds);

                // 3. Update Modules with completion status
                const updatedModules = allModules.map(m => ({
                    ...m,
                    lessons: m.lessons.map(l => ({
                        ...l,
                        isCompleted: completedIds.includes(l._id)
                    }))
                }));

                setModules(updatedModules);

                // 4. Set Initial Active Lesson
                if (updatedModules.length > 0 && updatedModules[0].lessons.length > 0) {
                    setActiveLesson(updatedModules[0].lessons[0]);
                    setExpandedModules([updatedModules[0]._id]);
                }

                // 5. Calculate Progress
                if (total > 0) {
                    setProgress(Math.round((completedIds.length / total) * 100));
                }

            } catch (err) {
                console.error("Failed to load initial course data", err);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const toggleLessonCompletion = async (lessonId: string, currentStatus: boolean) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to save progress");
            return;
        }

        try {
            const newStatus = !currentStatus;
            await axios.post(`${API}/api/auth/lesson-completion`, {
                courseId: "aigenxt",
                lessonId,
                completed: newStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local state
            const updatedIds = newStatus
                ? [...completedLessonIds, lessonId]
                : completedLessonIds.filter(id => id !== lessonId);

            setCompletedLessonIds(updatedIds);

            // Update percentage
            if (totalLessonsCount > 0) {
                setProgress(Math.round((updatedIds.length / totalLessonsCount) * 100));
            }

            // Update modules list
            setModules(prev => prev.map(m => ({
                ...m,
                lessons: m.lessons.map(l =>
                    l._id === lessonId ? { ...l, isCompleted: newStatus } : l
                )
            })));

            // Update active lesson if it's the one we just toggled
            if (activeLesson?._id === lessonId) {
                setActiveLesson({ ...activeLesson, isCompleted: newStatus });
            }

            toast.success(newStatus ? "Lesson marked as complete" : "Lesson marked as incomplete");

        } catch (err) {
            toast.error("Failed to update progress");
        }
    };

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId) ? prev.filter(i => i !== moduleId) : [...prev, moduleId]
        );
    };

    const isEnrolled = true;

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-black uppercase tracking-widest text-xs">Loading Course...</p>
            </div>
        </div>;
    }

    // Helper to transform YouTube URLs to embed format
    const getYoutubeEmbedUrl = (url: string) => {
        if (!url) return "";
        let videoId = "";
        try {
            if (url.includes("youtube.com/watch")) {
                videoId = new URL(url).searchParams.get("v") || "";
            } else if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1]?.split("?")[0];
            } else if (url.includes("youtube.com/embed/")) {
                return url; // Already in embed format
            }
        } catch (e) {
            console.error("Invalid URL", url);
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : url;
    };

    // Helper to get lesson icon
    const getLessonIcon = (type: LessonType, active: boolean) => {
        switch (type) {
            case "video": return <Play className={`w-3 h-3 ${active ? 'fill-current' : ''}`} />;
            case "assessment": return <HelpCircle className="w-3.5 h-3.5" />;
            case "link": return <ExternalLink className="w-3 h-3" />;
            default: return <FileText className="w-3 h-3" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-primary/30">
            {/* TOP HEADER (FIXED) */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#020617] border-b border-slate-800/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
                <div className="max-w-[1700px] mx-auto px-4 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <button
                                onClick={() => navigate("/affiliate")}
                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold group mb-2"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Dashboard
                            </button>
                            <h1 className="text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-3">
                                {course.title}
                                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 hidden md:block">
                                    Professional
                                </Badge>
                            </h1>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-xl shrink-0">
                            <div className="hidden sm:block text-right">
                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Overall Progress</p>
                                <p className="text-sm font-black text-primary">{progress}% complete</p>
                            </div>
                            <div className="w-32 h-2">
                                <Progress value={progress} className="h-full bg-slate-800 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-[1700px] mx-auto px-4 lg:px-8 pt-[160px] pb-20">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: PLAYER & TABS */}
                    <div className="xl:col-span-8 space-y-8">

                        {/* CINEMATIC VIDEO PLAYER */}
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-slate-950 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-30 pointer-events-none" />

                            {activeLesson?.type === 'video' ? (
                                <div className="absolute inset-0">
                                    <iframe
                                        src={getYoutubeEmbedUrl(activeLesson.videoUrl || "")}
                                        className="w-full h-full"
                                        title={activeLesson.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : activeLesson?.type === 'assessment' ? (
                                <QuizPlayer
                                    lesson={activeLesson}
                                    onComplete={() => {
                                        if (activeLesson && !activeLesson.isCompleted) {
                                            toggleLessonCompletion(activeLesson._id, false);
                                        }
                                        toast.success("Assessment Complete!");
                                    }}
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-12 text-center">
                                    <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary mb-2">
                                        <ExternalLink className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-black">{activeLesson?.title}</h3>
                                    <p className="text-slate-400 max-w-md">This lesson contains an external resource.</p>
                                    <div className="flex gap-4">
                                        <Button
                                            onClick={() => {
                                                if (activeLesson?.type === 'link') {
                                                    window.open(activeLesson.whatsappLink, '_blank');
                                                }
                                            }}
                                            className="rounded-xl px-12 h-14 font-black bg-white text-slate-950 hover:bg-slate-200"
                                        >
                                            Open Resource
                                        </Button>
                                        <Button
                                            onClick={() => activeLesson && toggleLessonCompletion(activeLesson._id, activeLesson.isCompleted)}
                                            className={`rounded-xl px-12 h-14 font-black transition-all ${activeLesson?.isCompleted
                                                ? "bg-slate-800 text-slate-400 hover:text-white"
                                                : "bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                                                }`}
                                        >
                                            {activeLesson?.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* LESSON DETAILS & TABS */}
                        <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 mb-2">Currently {activeLesson?.type === 'video' ? 'Watching' : 'Viewing'}</p>
                                    <h2 className="text-2xl font-black tracking-tight">{activeLesson?.title}</h2>
                                </div>
                                <Button
                                    onClick={() => activeLesson && toggleLessonCompletion(activeLesson._id, activeLesson.isCompleted)}
                                    className={`rounded-xl h-12 px-8 font-black transition-all active:scale-95 shadow-lg uppercase tracking-wider text-xs ${activeLesson?.isCompleted
                                        ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                                        : "bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20"
                                        }`}
                                >
                                    {activeLesson?.isCompleted ? (
                                        <span className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Completed
                                        </span>
                                    ) : "Mark as Complete"}
                                </Button>
                            </div>

                            <DiscussionSection />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: MODULE PLAYLIST */}
                    <div className="xl:col-span-4 h-fit sticky top-[160px]">
                        <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
                            <div className="p-8 border-b border-slate-800 bg-slate-950/50">
                                <h3 className="text-lg font-black tracking-tighter uppercase mb-2">COURSE CONTENT</h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{modules.length} Levels</p>
                                    <span className="text-slate-700">•</span>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons</p>
                                </div>
                            </div>

                            <div className="bg-slate-950/40 p-4 border-b border-slate-800">
                                <div className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-2xl group hover:border-primary/20 transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-800 shadow-xl group-hover:scale-110 transition-transform">
                                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-black uppercase tracking-tight mb-0.5">THE AI CIRCLE</h4>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Join the conversation</p>
                                    </div>
                                    <Button size="icon" variant="ghost" onClick={() => navigate("/community")} className="text-slate-500 group-hover:text-primary">
                                        <MessageSquare className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <ScrollArea className="h-[calc(100vh-320px)] xl:h-[calc(100vh-320px)] bg-slate-900/50">
                                <div className="p-2 space-y-2">
                                    {modules.map((module) => (
                                        <div key={module._id} className="space-y-1">
                                            <button
                                                onClick={() => toggleModule(module._id)}
                                                className="w-full flex items-center justify-between p-5 bg-slate-950/30 rounded-2xl border border-transparent hover:border-slate-800 transition-all text-left group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${expandedModules.includes(module._id) ? "bg-primary/10 border-primary/40 text-primary" : "border-slate-800 text-slate-600"}`}>
                                                        {module.lessons.every(l => l.isCompleted) ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <span className="text-[11px] font-black tracking-tight text-slate-200 group-hover:text-white transition-colors uppercase">{module.title}</span>
                                                        <p className="text-[9px] font-bold text-slate-500 tracking-widest">{module.lessons.filter(l => l.isCompleted).length}/{module.lessons.length} LESSONS</p>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`w-3.5 h-3.5 text-slate-600 transition-transform duration-300 ${expandedModules.includes(module._id) ? "rotate-180" : ""}`} />
                                            </button>

                                            <AnimatePresence>
                                                {expandedModules.includes(module._id) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden space-y-1 px-2 pb-2"
                                                    >
                                                        {module.lessons.map((lesson) => {
                                                            const isActive = activeLesson?._id === lesson._id;
                                                            return (
                                                                <button
                                                                    key={lesson._id}
                                                                    onClick={() => !lesson.locked && setActiveLesson(lesson)}
                                                                    disabled={lesson.locked}
                                                                    className={`w-full group relative flex items-center justify-between p-4 rounded-xl border transition-all ${isActive
                                                                        ? "bg-primary/10 border-primary/30 text-primary"
                                                                        : "bg-transparent border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                                                                        } ${lesson.locked ? "opacity-30 cursor-not-allowed" : ""}`}
                                                                >
                                                                    <div className="flex items-center gap-3 relative z-10">
                                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black border transition-all ${lesson.isCompleted
                                                                            ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                                                            : lesson.locked
                                                                                ? "bg-slate-950 border-slate-900 text-slate-700"
                                                                                : isActive
                                                                                    ? "border-primary text-primary"
                                                                                    : "border-slate-800 text-slate-500"
                                                                            }`}>
                                                                            {lesson.isCompleted ? <CheckCircle className="w-3 h-3 stroke-[3]" /> : lesson.locked ? <Lock className="w-2.5 h-2.5" /> : getLessonIcon(lesson.type, isActive)}
                                                                        </div>
                                                                        <span className="text-[12px] font-bold tracking-tight text-left">{lesson.title}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 relative z-10">
                                                                        <span className="text-[9px] font-black font-mono opacity-40">{lesson.duration}</span>
                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="p-6 bg-slate-950/80 backdrop-blur-md border-t border-slate-800">
                                <Button onClick={() => navigate("/community")} className="w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-200 font-black h-12 transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-[10px]">
                                    <MessageSquare className="w-4 h-4" />
                                    Community Hub
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseLearningPage;
