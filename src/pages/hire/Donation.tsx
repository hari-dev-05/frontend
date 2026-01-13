import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Donate from "./Donate";

const Donation = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Donate />
            </main>
            <Footer />
        </div>
    );
};

export default Donation;
