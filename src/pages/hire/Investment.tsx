import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Invest from "./Invest";

const Investment = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Invest />
            </main>
            <Footer />
        </div>
    );
};

export default Investment;
