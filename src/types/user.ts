export interface User {
  id: string;
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
