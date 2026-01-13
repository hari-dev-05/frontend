import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const curriculum = [
    {
        title: "MUST WATCH BEFORE YOU START",
        items: [
            "IF YOU ARE A NON CODER",
            "IF YOU ARE FROM CODING BACKGROUND",
            "IF YOU ARE FROM TEACHING FRATERNITY",
        ],
    },
    {
        title: "LEVEL 1 : AIGENXT",
        items: ["Level 1 & 2 Whatsapp Link", "ROAD MAP TO AI"],
    },
    {
        title: "Prerequisite",
        items: [
            "Intro to AI and Its family",
            "Elements in AI and Challenges faced",
            "Categories of AI",
            "Usage and Implementation",
            "TEST YOUR KNOWLEDGE",
        ],
    },
    {
        title: "LEVEL 2 : Getting Started With Google Colab",
        items: [
            "Introduction to Google Colab",
            "Steps for Google Colab setup",
            "Frequently asked questions ( FAQ )",
        ],
    },
    {
        title: "Python Basics",
        items: [
            "Hello World and Data Types",
            "Math Operations and Booleans",
            "Art of Printing",
            "String Basics",
            "String Slicing",
            "Conditions",
            "While Loops",
            "Range and For Loops",
            "List",
            "Tuple",
            "Dictionary and Set",
            "Functions",
            "Class - Methods, Attributes",
            "Exception Handling",
            "Assessment",
        ],
    },
    {
        title: "LEVEL 3 : Modules and Libraries",
        items: [
            "LEVEL 3 Whatsapp Link",
            "Numpy - Basic",
            "Numpy - Array Creation and Math Operations",
            "Numpy - Array Concat and Reshaping",
            "Random Library",
            "OS Library",
            "Time Library",
            "Assessment 2",
        ],
    },
    { title: "Statistics and Probability", items: [] },
    {
        title: "LEVEL 4 : Exploratory Data Analysis",
        items: [
            "LEVEL 4 Whatsapp Link",
            "Basic Plotting",
            "Loading External Data and Understanding",
            "Visualization - Bi Variant Analysis",
            "Visualization - Uni Variant Analysis",
            "Visualization - Multi Variant Analysis",
            "Data Cleaning - 1",
            "Data Cleaning - 2",
            "Assessment 4",
        ],
    },
    {
        title: "LEVEL 5 : Linear Regression",
        items: [
            "LEVEL 5 Whatsapp Link",
            "Theory - Introduction and Measure of Association",
            "Theory - Co-Variance and Correlation",
            "Theory - Residual and MSE",
            "P1-Hands On - Car Price prediction",
            "Hands On - Fine tuning model",
            "Assessment 5",
        ],
    },
    {
        title: "LEVEL 6 : Classification Models",
        items: [
            "LEVEL 6 Whatsapp Link",
            "Theory - Introduction to Classification",
            "Theory - Decision Trees",
            "P2 - Hands on - Decision Tree Implementation and Fine tuning",
            "Accuracy Metrics - Precision, Recall, F1 Score",
            "Decision Tree - Feature Splits",
            "Theory - Random Forest",
            "P3 - Hands on - Random Forest Implementation and Fine tuning",
            "Theory - K Nearest Neighbors",
            "P4 - Hands on - KNN Implementation and Fine tuning",
            "Theory - Support Vector Machines",
            "P5 - Hands on - SVM Implementation and Fine tuning",
            "Theory - Logistic Regression",
            "P6 - Hands on - Logistic Regression Implementation and Fine tuning",
            "Theory - Gaussian Naïve Bayes",
            "P7 - Hands on - GNB Implementation and Fine tuning",
            "Assessment 6",
        ],
    },
    {
        title: "LEVEL 7 : Image Processing",
        items: [
            "LEVEL 7 Whatsapp Link",
            "Hello World",
            "Drawing Operations",
            "Basic Image Handling",
            "Masking",
            "Smoothing and Blurring",
            "Thresholding",
            "P8 - Contours and License Plate Detection",
            "Assessment 7",
        ],
    },
    {
        title: "LEVEL 8 : Image based Machine Learning",
        items: [
            "LEVEL 8 Whatsapp Link",
            "Feature Extraction and Challenges Faced",
            "P9 - Haralick Textures",
            "P10 - Multi - Feature Extraction - Sign Board Classification",
            "P11 - Face Detection - Haar Cascade Classifier",
            "P12 - Local Binary Pattern Histogram - Face Recognition",
            "P13 - Histograms of Oriented Gradients",
            "Assignment - Handwritten character Recognition",
            "Assignment - Face Emotion Recognition System",
            "Assignment - Numerical Data Classification",
            "Assessment 8",
        ],
    },
    {
        title: "LEVEL 9 : Unsupervised Classification",
        items: [
            "LEVEL 9 Whatsapp Link",
            "Theory - Introduction to Clustering",
            "Theory - K Means and DB clustering",
            "P14 - Hands on - Kmeans Clustering",
            "Hands on - DB Scan",
            "Assignment - MNIST Clustering",
            "Assessment 9",
        ],
    },
    {
        title: "Deep Learning",
        items: [
            "Introduction to Neural Networks",
            "Neuron, Layers, Activation Functions",
            "Forward and Back Propagation",
            "Gradient Optimization and weight updation",
            "P15 - Hands on - Multi Layer Perceptron for numerical data",
            "Hands on - Model Fine tuning",
            "P16 - Categorical Data and K Fold Validation",
            "P17 - Hands on - MLP for Images",
            "Hands on - Model Analysis and saving",
            "Introduction to CNN",
            "Convolution and Pooling Layers",
            "P18 - CNN_Implementation",
            "P19 - Car Classification using CNN with Callbacks",
            "Transfer learning",
            "P20 - Transfer Learning implementation",
            "Assignment - Classification with localization",
            "Assignment - Plant Disease Classification",
            "Assessment 10",
        ],
    },
    {
        title: "LEVEL 10 : Bonus Content",
        items: [
            "LEVEL 10 Whatsapp Link",
            "Introduction to Object detection",
            "Introduction to Yolo Architecture",
            "P21 - Implementing Yolo Architecture and model training",
            "Model Inference",
            "Introduction to GAN",
            "Assignment - Custom Object Detection for helmet detection",
        ],
    },
    {
        title: "THE FINAL ASSESSMENT",
        items: ["FINAL ASSESSMENT"],
    },
];
const Enrollment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const course = state?.course;
    const [showAll, setShowAll] = useState(false);
    const [openIndices, setOpenIndices] = useState<number[]>([0]);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const checkEnrollment = async () => {
            const token = localStorage.getItem("token");
            if (token && course) {
                try {
                    const response = await fetch("http://localhost:5000/api/auth/me", {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const data = await response.json();
                    if (data.user && data.user.enrolledCourses) {
                        setIsEnrolled(data.user.enrolledCourses.includes(course.id));
                    }
                } catch (error) {
                    console.error("Error checking enrollment:", error);
                }
            }
        };
        checkEnrollment();
    }, [course]);

    if (!course) return <p className="p-6">Course not found</p>;

    const visibleCurriculum = showAll ? curriculum : curriculum.slice(0, 6);

    return (
        <div className="max-w-7xl mx-auto p-6 pt-24 space-y-10">
            {/* COURSE HEADER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                {/* LEFT: COURSE CARD */}
                <div className="lg:col-span-2 flex gap-6 border rounded-xl p-6 bg-card">
                    <img
                        src={course.thumbnail}
                        className="w-48 h-32 object-cover rounded-lg shrink-0"
                    />
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">{course.title}</h1>
                        <p className="text-sm">
                            📘 {course.lessons} lessons • ⏱ {course.duration}
                        </p>
                        {!isEnrolled && <p className="text-lg font-bold text-primary">₹{course.price}</p>}
                        {isEnrolled ? (
                            <Button
                                className="w-full sm:w-auto mt-4 bg-green-600 hover:bg-green-700"
                                size="lg"
                                onClick={() => navigate(`/learning/${course.id}`)}
                            >
                                Start Learning
                            </Button>
                        ) : (
                            <Button
                                className="w-full sm:w-auto mt-4"
                                size="lg"
                                onClick={() => navigate("/payment", { state: { course } })}
                            >
                                Enroll Now
                            </Button>
                        )}
                    </div>
                </div>

                {/* RIGHT: DESCRIPTION */}
                <div className="space-y-3 p-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Course Overview</h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {course.description}
                    </p>
                </div>
            </div>

            {/* CURRICULUM */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold mb-6">Course curriculum</h2>

                <div className="border rounded-lg divide-y">
                    {visibleCurriculum.map((section, index) => {
                        const isOpen = openIndices.includes(index);

                        return (
                            <div key={index} className="px-4 py-5">
                                {/* HEADER (CLICKABLE) */}
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() =>
                                        setOpenIndices(
                                            isOpen
                                                ? openIndices.filter((i) => i !== index)
                                                : [...openIndices, index]
                                        )
                                    }
                                >
                                    <span className="text-sm font-medium">
                                        {section.title}
                                    </span>

                                    <ChevronDown
                                        className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>

                                {/* CONTENT (EXPAND / COLLAPSE) */}
                                {isOpen && section.items.length > 0 && (
                                    <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                                        {section.items.map((item, i) => (
                                            <li key={i}>• {item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* SHOW MORE / LESS */}
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 text-primary font-medium"
                >
                    {showAll ? "Show less" : "Show more"}
                </button>
            </div>

        </div>
    );
};

export default Enrollment;
