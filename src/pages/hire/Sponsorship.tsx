import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sponsors from "./Sponsors";

const Sponsorship = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Sponsors />
            </main>
            <Footer />
        </div>
    );
};

export default Sponsorship;
