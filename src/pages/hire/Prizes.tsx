import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrandPrize from "./GrandPrize";

const Prizes = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <GrandPrize />
            </main>
            <Footer />
        </div>
    );
};

export default Prizes;
