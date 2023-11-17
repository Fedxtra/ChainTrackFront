export interface Monitor {}

export interface UserData {
  profileImageUrl?: string;
  name: string;
  followers?: number;
  monitors?: Monitor[];
}
