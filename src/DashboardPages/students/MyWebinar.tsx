import React from "react";

const Webinar = () => {
  const dataset = [
    {
      id: "aigenxt-pro",
      title: "AIGENXT - Professional AI Program",
      progress: 80,
      enrolled: true,
      price: null,
      thumbnail: "https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg",
      status: "Resume MyCourse",
    },
    {
      id: "build-python",
      title: "BUILD WITH PYTHON - BEGINNER TO ADVANCE",
      progress: 0,
      enrolled: true,
      price: null,
      thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg",
      status: "Start MyCourse",
    },
    {
      id: "ai-pro-recordings",
      title: "AI Program For Professionals - Recordings",
      progress: 0,
      enrolled: true,
      price: null,
      thumbnail: "https://i.ytimg.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
      status: "Start MyCourse",
    },
    {
      id: "aigenxt-meet",
      title: "AIGENXT MEET RECORDINGS",
      progress: 0,
      enrolled: true,
      price: null,
      thumbnail: "https://i.ytimg.com/vi/ua-CiDNNj30/maxresdefault.jpg",
      status: "Start MyCourse",
    },
    {
      id: "data-analytics-python",
      title: "DATA ANALYTICS USING PYTHON FOR BANKING AND STOCK MARKET",
      progress: null,
      enrolled: false,
      price: 499,
      thumbnail: "https://i.ytimg.com/vi/ua-CiDNNj30/maxresdefault.jpg",
      status: "View MyCourse",
    },
    {
      id: "blockchain-overview",
      title: "BLOCK CHAIN OVERVIEW",
      progress: null,
      enrolled: false,
      price: 499,
      thumbnail: "https://i.ytimg.com/vi/SSo_EIwHSd4/maxresdefault.jpg",
      status: "View MyCourse",
    },
    {
      id: "nlp-crash-python",
      title: "NLP CRASH COURSE WITH PYTHON",
      progress: null,
      enrolled: false,
      price: 699,
      thumbnail: "https://i.ytimg.com/vi/fOvTtapxa9c/maxresdefault.jpg",
      status: "View MyCourse",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        MyWebinar
      </h1>

      {/* Video Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {dataset.map((course) => (
          <div
            key={course.id}
            style={{
              cursor: "pointer",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {/* Thumbnail */}
            <div style={{ position: "relative" }}>
              <img
                src={course.thumbnail}
                alt={course.title}
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
              />

              {/* Progress Bar */}
              {course.enrolled && course.progress !== null && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "4px",
                    width: `${course.progress}%`,
                    backgroundColor: "#22c55e",
                  }}
                />
              )}
            </div>

            {/* Info */}
            <div style={{ padding: "10px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600 }}>
                {course.title}
              </h3>

              {course.enrolled ? (
                <p style={{ fontSize: "12px", color: "#666" }}>
                  {course.status}
                </p>
              ) : (
                <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                  ₹{course.price}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Webinar;
