export interface User {
  id: string;
  avatar: string;
  username: string;
  createdAt: string;
  preferences?: {
    language: string;
    difficulty: "beginner" | "intermediate" | "advanced";
  };
  statistics: {
    totalSessions: number;
    averageScore: number;
  };
}
