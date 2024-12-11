import { ScoringService } from "../services/scoring.service";

describe("ScoringService", () => {
  it("calculates similarity score correctly", () => {
    const original = "Hello world how are you";
    const spoken = "Hello world how is he";

    const score = ScoringService.calculateSimilarity(original, spoken);
    expect(score).toBe(60); // 3 matching words out of 5
  });

  it("returns correct grade based on score", () => {
    expect(ScoringService.getGrade(95)).toBe("A");
    expect(ScoringService.getGrade(85)).toBe("B");
    expect(ScoringService.getGrade(75)).toBe("C");
    expect(ScoringService.getGrade(65)).toBe("D");
    expect(ScoringService.getGrade(55)).toBe("F");
  });
});
