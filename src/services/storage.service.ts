import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";

export class StorageService {
  private static readonly USER_KEY = "@user_data";

  static async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      throw new Error("Failed to save user data");
    }
  }

  static async getUser(): Promise<User | null> {
    try {
      const data = await AsyncStorage.getItem(this.USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw new Error("Failed to retrieve user data");
    }
  }
}
