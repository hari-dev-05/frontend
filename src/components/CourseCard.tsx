import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    level: string;
    price: number;
    rating: number;
    students: number;
    thumbnail: string;
    lessons: number;
    duration: string;
  };
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.user.adminRole === 'superadmin') {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Role check failed", err);
      }
    };
    checkRole();
  }, []);

  const handleView = () => {
    if (isAdmin) {
      navigate(`/learning/${course.id}`);
    } else {
      navigate(`/enroll/${course.id}`, {
        state: { course },
      });
    }
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <p className="text-xs text-muted-foreground">
          By {course.instructor}
        </p>

        <div className="flex justify-between text-sm">
          <span>⭐ {course.rating}</span>
          <span>{course.students.toLocaleString()} students</span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{course.lessons} lessons</span>
          <span>{course.duration}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-primary">
            ₹{course.price}
          </span>
          <Button size="sm" onClick={handleView}>
            {isAdmin ? "Start Learning" : "View MyCourse"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
