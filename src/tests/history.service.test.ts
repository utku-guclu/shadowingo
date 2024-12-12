import { HistoryService, ShadowingResult } from "../services/history.service";
import { StorageService } from "../services/storage.service";

jest.mock("../services/storage.service");

describe("HistoryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves new result to history", async () => {
    const mockResult = {
      videoId: "123",
      score: 85,
      grade: "B",
    };

    await HistoryService.saveResult(mockResult);

    expect(StorageService.setItem).toHaveBeenCalled();
    const savedData = JSON.parse(
      (StorageService.setItem as jest.Mock).mock.calls[0][1],
    );
    expect(savedData[0]).toMatchObject(mockResult);
  });

  it("retrieves history from storage", async () => {
    const mockHistory: ShadowingResult[] = [
      {
        id: "1",
        videoId: "123",
        score: 85,
        grade: "B",
        timestamp: "2023-01-01",
      },
    ];

    (StorageService.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockHistory),
    );

    const history = await HistoryService.getHistory();
    expect(history).toEqual(mockHistory);
  });
});
