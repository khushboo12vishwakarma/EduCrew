// // import axios from 'axios';

// // const API_BASE_URL = 'http://localhost:8000/api/EduCrew_Backend';
// // const AUTH_BASE_URL = 'http://localhost:8000/api/auth';

// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Add authentication token to requests
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('authToken');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // // Authentication API
// // export const authAPI = {
// //   login: (credentials) => axios.post(`${AUTH_BASE_URL}/token/`, credentials),
// //   register: (userData) => axios.post(`${API_BASE_URL}/register/`, userData),
// //   refreshToken: (refreshToken) => axios.post(`${AUTH_BASE_URL}/token/refresh/`, { refresh: refreshToken }),
// //   logout: () => {
// //     localStorage.removeItem('authToken');
// //     localStorage.removeItem('refreshToken');
// //     localStorage.removeItem('user');
// //   },
// // };

// // // Research Librarian API
// // export const researchLibrarianAPI = {
// //   searchPapers: (data) => api.post('/top-papers/', data),
// // };

// // export const studyCoachAPI = {
// //   uploadNotes: (formData) => api.post('/upload-notes/', formData, {
// //     headers: { 'Content-Type': 'multipart/form-data' },
// //   }),
// // };

// // export const presentationAPI = {
// //   generateFromTopic: (data) => api.post('/presentations/generate_from_topic/', data),
// //   generateFromContent: (data) => api.post('/presentations/generate_from_content/', data),
// //   download: (id) => api.get(`/presentations/${id}/download/`),
// // };

// // export const codeMentorAPI = {
// //   runCode: (data) => api.post('/code/run/', data),
// //   reviewCode: (data) => api.post('/code/review/', data),
// //   explainCode: (data) => api.post('/code/explain/', data),
// //   generateCode: (data) => api.post('/code/generate/', data),
// //   animateCode: (data) => api.post('/code/animate/', data),
// //   startInterview: (data) => api.post('/interview/start/', data),
// //   submitInterview: (id, data) => api.post(`/interview/${id}/submit/`, data),
// //   getInterviewReport: (id) => api.get(`/interview/${id}/report/`),
// // };

// // export const projectPlannerAPI = {
// //   createPlan: (data) => api.post('/project/planner/', data),
// //   getTodayTasks: () => api.get('/project/tasks/today/'),
// //   completeTask: (id) => api.post(`/project/tasks/${id}/complete/`),
// // };

// // export const qualityReviewerAPI = {
// //   reviewDocument: (formData) => api.post('/quality/review/', formData, {
// //     headers: { 'Content-Type': 'multipart/form-data' },
// //   }),
// // };

// // export default api;
// import axios from "axios";

// /* ============================
//    BASE URLS (MATCH DJANGO)
// ============================ */

// const API_BASE_URL = "http://127.0.0.1:8000/api/EduCrew_Backend";
// const AUTH_BASE_URL = "http://127.0.0.1:8000/api/auth";

// /* ============================
//    MAIN AXIOS INSTANCE
// ============================ */

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // 🔴 REQUIRED FOR CSRF
// });

// /* ============================
//    CSRF HELPER
// ============================ */

// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

// /* ============================
//    INTERCEPTOR (AUTH + CSRF)
// ============================ */

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");

//     // 🔴 DO NOT SEND TOKEN FOR STUDY COACH
//     if (token && !config.url.includes("/upload-notes/")) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// /* ============================
//    AUTHENTICATION API
// ============================ */

// export const authAPI = {
//   login: (credentials) =>
//     axios.post(`${AUTH_BASE_URL}/token/`, credentials),

//   register: (userData) =>
//     axios.post(`${API_BASE_URL}/register/`, userData),

//   refreshToken: (refreshToken) =>
//     axios.post(`${AUTH_BASE_URL}/token/refresh/`, { refresh: refreshToken }),

//   logout: () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//   },
// };

// /* ============================
//    🔥 RESEARCH LIBRARIAN API (KEEP AS IS)
// ============================ */

// export const researchLibrarianAPI = {
//   searchPapers: (data) =>
//     axios.post(
//       "http://127.0.0.1:8000/api/EduCrew_Backend/top-papers/",
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     ),
// };

// /* ============================
//    ✅ STUDY COACH API (FIXED)
// ============================ */

// export const studyCoachAPI = {
//   uploadNotes: (formData) =>
//     api.post("/upload-notes/", formData, {
//       headers: {
//         Authorization: "",   // 🔴 DO NOT SEND TOKEN
//       },
//     }),
// };


// /* ============================
//    PRESENTATION API
// ============================ */

// export const presentationAPI = {
//   generateFromTopic: (data) =>
//     api.post("/presentations/generate_from_topic/", data),

//   generateFromContent: (data) =>
//     api.post("/presentations/generate_from_content/", data),

//   download: (id) =>
//     api.get(`/presentations/${id}/download/`),
// };

// /* ============================
//    CODE MENTOR API
// ============================ */

// export const codeMentorAPI = {
//   runCode: (data) =>
//     api.post("/code/run/", data),

//   reviewCode: (data) =>
//     api.post("/code/review/", data),

//   explainCode: (data) =>
//     api.post("/code/explain/", data),

//   generateCode: (data) =>
//     api.post("/code/generate/", data),

//   animateCode: (data) =>
//     api.post("/code/animate/", data),

//   startInterview: (data) =>
//     api.post("/interview/start/", data),

//   submitInterview: (id, data) =>
//     api.post(`/interview/${id}/submit/`, data),

//   getInterviewReport: (id) =>
//     api.get(`/interview/${id}/report/`),
// };

// /* ============================
//    PROJECT PLANNER API
// ============================ */

// export const projectPlannerAPI = {
//   createPlan: (data) =>
//     api.post("/project/planner/", data),

//   getTodayTasks: () =>
//     api.get("/project/tasks/today/"),

//   completeTask: (id) =>
//     api.post(`/project/tasks/${id}/complete/`),
// };

// /* ============================
//    QUALITY REVIEWER API (FIXED)
// ============================ */

// export const qualityReviewerAPI = {
//   reviewDocument: (formData) =>
//     api.post("/quality/review/", formData), // 🔴 NO HEADERS
// };

// export default api;





import axios from "axios";

/* ============================
   BASE URLS
============================ */

const API_BASE_URL = "http://127.0.0.1:8000/api/EduCrew_Backend";
const AUTH_BASE_URL = "http://127.0.0.1:8000/api/auth";

/* ============================
   MAIN AXIOS INSTANCE (JWT ONLY)
============================ */




const api = axios.create({
  baseURL: API_BASE_URL,
  // 🔴 DO NOT use withCredentials for JWT
});

/* ============================
   INTERCEPTOR (ADD JWT TOKEN)
============================ */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/token/refresh/")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const res = await axios.post(
          `${AUTH_BASE_URL}/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = res.data.access;

        localStorage.setItem("authToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);



/* ============================
   AUTHENTICATION API
============================ */

export const authAPI = {
  // In your api.js or authAPI
 forgotPassword: (data) => 
    axios.post(`${API_BASE_URL}/forgot-password/`, data),
 // authAPI
resetPassword: (data) => axios.post(`${API_BASE_URL}/reset-password/`, data),
  login: (credentials) =>
    axios.post(`${AUTH_BASE_URL}/token/`, credentials),

  register: (userData) =>
    axios.post(`${API_BASE_URL}/register/`, userData),

  refreshToken: (refreshToken) =>
    axios.post(`${AUTH_BASE_URL}/token/refresh/`, { refresh: refreshToken }),

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },
 // To:
updateProfile: (data) => api.patch('/profile/', data),
updateProfileWithAvatar: (formData) => api.patch('/profile/', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}),
changePassword: (data) => api.post('/change-password/', data),
getProfile: () => api.get('/profile/'),
};


/* ============================
   PRESENTATION API (PROTECTED)
============================ */

export const presentationAPI = {
  generateFromTopic: (data) =>
    api.post("/presentations/generate_from_topic/", data),

  generateFromContent: (data) =>
    api.post("/presentations/generate_from_content/", data),
  download: (id) =>
    api.get(`/presentations/${id}/download/`, {
      responseType: 'blob',  // ← CRITICAL: tells axios to handle binary data
    }),

  download: (id) =>
    api.get(`/presentations/${id}/download/`),
   getMyPresentations: () => api.get("/presentations/my-presentations/"),
};

api.presentationAPI = presentationAPI;

/* ============================
   STUDY COACH API (PUBLIC)
============================ */

export const studyCoachAPI = {
  uploadNotes: (formData) =>
    api.post("/upload-notes/", formData),
};


/* ============================
   RESEARCH LIBRARIAN API
============================ */

export const researchLibrarianAPI = {
  searchPapers: (data) =>
    api.post("/top-papers/", data),
};



export const dashboardAPI = {
  getOverview: () => api.get('/dashboard/overview/'),
  getStudyMaterials: () => api.get('/dashboard/study-materials/'),
  getCodeProgress: () => api.get('/dashboard/code-progress/'),
  getProjectTimeline: () => api.get('/dashboard/project-timeline/'),
  getAchievements: () => api.get('/dashboard/achievements/'),
  comparePeriods: () => api.get('/dashboard/compare/'),
  exportSummary: () => api.get('/dashboard/export/'),

};

/* ============================
   CODE MENTOR API
============================ */

export const codeMentorAPI = {
  runCode: (data) => api.post("/code/run/", data),
  reviewCode: (data) => api.post("/code/review/", data),
  explainCode: (data) => api.post("/code/explain/", data),
  generateCode: (data) => api.post("/code/generate/", data),
  animateCode: (data) => api.post("/code/animate/", data),
  startInterview: (data) => api.post("/interview/start/", data),
  submitInterview: (id, data) =>
    api.post(`/interview/${id}/submit/`, data),
  getInterviewReport: (id) =>
    api.get(`/interview/${id}/report/`),
};

/* ============================
   PROJECT PLANNER API
============================ */

// export const projectPlannerAPI = {
//   createPlan: (data) => api.post("/project/planner/", data),
//   getTodayTasks: () => api.get("/project/tasks/today/"),
//   completeTask: (id) =>
//     api.post(`/project/tasks/${id}/complete/`),
//     // NEW endpoints
//   getUserProjects: () => api.get('/planner/projects/'),
//   getProjectDetail: (projectId) => api.get(`/planner/projects/${projectId}/`),
//   getProjectTasks: (projectId) => api.get(`/planner/projects/${projectId}/tasks/`),
//   deleteProject: (projectId) => api.delete(`/planner/projects/${projectId}/delete/`),
// };

export const projectPlannerAPI = {
  createPlan: (data) => api.post('/planner/create/', data),
  getTodayTasks: () => api.get('/planner/tasks/today/'),
  completeTask: (taskId) => api.post(`/planner/tasks/${taskId}/complete/`),
  getUserProjects: () => api.get('/planner/projects/'),
  getProjectDetail: (projectId) => api.get(`/planner/projects/${projectId}/`),
  getProjectTasks: (projectId) => api.get(`/planner/projects/${projectId}/tasks/`),
  deleteProject: (projectId) => api.delete(`/planner/projects/${projectId}/delete/`),
  updateEmail: (data) => api.post('/planner/update-email/', data),
  sendTestReminder: (taskId) => api.post(`/planner/tasks/${taskId}/send-reminder/`),
};

/* ============================
   QUALITY REVIEWER API
============================ */

export const qualityReviewerAPI = {
  reviewDocument: (formData) =>
    api.post("/quality-review/", formData),  // Must match your Django URL pattern
};


export default api;
