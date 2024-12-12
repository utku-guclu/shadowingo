import { StorageService } from "./storage.service";

export interface ShadowingResult {
  id: string;
  videoId: string;
  score: number;
  grade: string;
  timestamp: string;
}

export class HistoryService {
  static async saveResult(
    result: Omit<ShadowingResult, "id" | "timestamp">,
  ): Promise<void> {
    const newResult: ShadowingResult = {
      ...result,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    const history = await this.getHistory();
    history.push(newResult);
    await StorageService.setItem("shadowing_history", JSON.stringify(history));
  }

  static async getHistory(): Promise<ShadowingResult[]> {
    const history = await StorageService.getItem("shadowing_history");
    return history ? JSON.parse(history) : [];
  }
}
