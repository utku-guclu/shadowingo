export class ScoringService {
  static calculateSimilarity(original: string, spoken: string): number {
    const originalWords = original.toLowerCase().split(" ");
    const spokenWords = spoken.toLowerCase().split(" ");

    let matches = 0;
    spokenWords.forEach((word) => {
      if (originalWords.includes(word)) matches++;
    });

    return (matches / originalWords.length) * 100;
  }

  static getGrade(score: number): string {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  }
}
