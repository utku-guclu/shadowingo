import { StatisticsService } from "../services/statistics.service";
import { StorageService } from "../services/storage.service";

jest.mock("../services/storage.service");

describe("StatisticsService", () => {
  const mockUser = {
    id: "123",
    username: "testuser",
    createdAt: "2023-01-01",
    statistics: {
      totalSessions: 10,
      averageScore: 80,
    },
  };

  beforeEach(() => {
    (StorageService.getUser as jest.Mock).mockResolvedValue(mockUser);
  });

  it("updates user statistics correctly", async () => {
    await StatisticsService.updateUserStats(90);

    const expectedUser = {
      ...mockUser,
      statistics: {
        totalSessions: 11,
        averageScore: 80.91, // (80 * 10 + 90) / 11
      },
    };

    expect(StorageService.saveUser).toHaveBeenCalledWith(expectedUser);
  });
});
