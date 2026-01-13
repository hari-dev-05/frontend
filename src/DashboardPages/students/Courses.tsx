import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { course } from "@/data/Courses";

const Courses = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="p-6 pt-24 max-w-7xl mx-auto">
        <div className="mb-8">
         
          <p className="text-muted-foreground">
            Learn skills that matter. Upgrade your career.
          </p>
        </div>

        {/* ONLY ONE COURSE */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard course={course} />
        </div>
      </div>
    </div>
  );
};

export default Courses;
