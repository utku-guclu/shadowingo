import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "../services/storage.service";

describe("StorageService", () => {
  const mockUser = {
    id: "1",
    username: "testUser",
    createdAt: new Date().toISOString(),
    statistics: {
      totalSessions: 0,
      averageScore: 0,
    },
  };

  beforeEach(() => {
    AsyncStorage.clear();
  });

  it("should save user data", async () => {
    await StorageService.saveUser(mockUser);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@user_data",
      JSON.stringify(mockUser),
    );
  });

  it("should retrieve user data", async () => {
    await AsyncStorage.setItem("@user_data", JSON.stringify(mockUser));
    const user = await StorageService.getUser();
    expect(user).toEqual(mockUser);
  });
});
