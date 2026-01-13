import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MonthlyWinners from "./MonthlyWinners";

const Winners = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                <MonthlyWinners />
            </main>
            <Footer />
        </div>
    );
};

export default Winners;
