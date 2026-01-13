import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./DashboardPages/Index";
import Auth from "./DashboardPages/Auth";
import AffiliateDashboard from "./DashboardPages/affiliates/AffiliateDashboard";
import NotFound from "./DashboardPages/NotFound";
import Courses from "./DashboardPages/students/Courses";
import VerifyEmail from "./DashboardPages/VerifyEmail";
import Enrollment from "./DashboardPages/students/Enrollment";
import Payment from "./DashboardPages/students/Payment";
import CourseLearningPage from "./DashboardPages/students/CourseLearningPage";

import Hiring from "./pages/hire/Hiring";
import Prizes from "./pages/hire/Prizes";
import Winners from "./pages/hire/Winners";
import Investment from "./pages/hire/Investment";
import Sponsorship from "./pages/hire/Sponsorship";
import Donation from "./pages/hire/Donation";
import CommunityPage from "./pages/community/CommunityPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/affiliate" element={<AffiliateDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/enroll/:id" element={<Enrollment />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/learning/:id" element={<CourseLearningPage />} />

        {/* Admin Routes */}
        <Route path="/hiring" element={<Hiring />} />
        <Route path="/prizes" element={<Prizes />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/invest" element={<Investment />} />
        <Route path="/sponsorship" element={<Sponsorship />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/community" element={<CommunityPage />} />


        <Route path="*" element={<NotFound />} />
      </Routes>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
