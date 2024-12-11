export interface VideoDetails {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

interface YouTubeSearchResultItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export class YouTubeService {
  private static API_KEY = process.env.YOUTUBE_API_KEY; // We'll handle this properly with environment variables later

  static async searchVideos(query: string): Promise<VideoDetails[]> {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${this.API_KEY}`,
    );
    const data = await response.json();

    return data.items.map((item: YouTubeSearchResultItem) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: "", // We'll fetch this in a separate call
    }));
  }
}
