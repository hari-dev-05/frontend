import React from 'react';
import Navbar from "@/components/Navbar";

const Webinar = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="p-6 pt-24 text-center">
                <h1 className="text-3xl font-bold">MyWebinar</h1>
                <p className="text-muted-foreground mt-2">Coming soon!</p>
            </div>
        </div>
    );
}

export default Webinar