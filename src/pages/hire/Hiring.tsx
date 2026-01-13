import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Recruiters from "@/components/Recruiters";

const Hiring = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                <Recruiters />
            </main>
            <Footer />
        </div>
    );
};

export default Hiring;
