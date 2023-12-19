import { User } from '@/api/api';

export interface UserData extends User {
  profileImageUrl?: string;
  name: string;
}
