import { StorageService } from "./storage.service";
import { User } from "../types/user";

export interface SessionStats {
  date: string;
  score: number;
  duration: number;
}

export class StatisticsService {
  static async updateUserStats(sessionScore: number): Promise<void> {
    const user = await StorageService.getUser();
    if (!user) return;

    const newStats = {
      totalSessions: user.statistics.totalSessions + 1,
      averageScore: Number(
        (
          (user.statistics.averageScore * user.statistics.totalSessions +
            sessionScore) /
          (user.statistics.totalSessions + 1)
        ).toFixed(2),
      ),
    };

    const updatedUser: User = {
      ...user,
      statistics: newStats,
    };

    await StorageService.saveUser(updatedUser);
  }
}
