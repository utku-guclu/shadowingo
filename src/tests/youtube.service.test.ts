import { YouTubeService } from "../services/youtube.service";

describe("YouTubeService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("should fetch videos from YouTube API", async () => {
    const mockResponse = {
      items: [
        {
          id: { videoId: "123" },
          snippet: {
            title: "Test Video",
            thumbnails: {
              medium: { url: "http://example.com/thumb.jpg" },
            },
          },
        },
      ],
    };

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const videos = await YouTubeService.searchVideos("test query");

    expect(videos).toHaveLength(1);
    expect(videos[0]).toEqual({
      id: "123",
      title: "Test Video",
      thumbnail: "http://example.com/thumb.jpg",
      duration: "",
    });
  });
});
