import { StaticImageData } from "next/image";
import { RefObject } from "react";

export interface UserData {
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  age: number;
  major: string;
  year: string;
  interests: string[];
  photos: string[];

  dpAgeRange: [number, number];
  dpDistance: number;
  dpShowMe: string;
  dpInterests: string[];
  dpMajors: string[];

  notiNewMatches: boolean;
  notiMessages: boolean;
  notiAppUpdates: boolean;
  notiEmailNotifications: boolean;

  priProfileVisibility: string;
  priShowOnlineStatus: boolean;
  priShowLastActive: boolean;
  priAllowTagging: boolean;
}

export interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

export interface MessageListProps {
  messages: Message[];
  scrollAreaRef: RefObject<HTMLDivElement | null>;
}

export interface ChatHeaderProps {
  user: {
    name: string;
    avatar: string | null;
  };
}

export interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export interface ChatBoxProps {
  userName: string;
  lastText: string;
  messageSentTime: string;
}

export interface SettingsProps {
  currentUser: UserData;
  majorOptions: { value: string; label: string }[];
  yearOptions: { value: string; label: string }[];
  interestOptions: { value: string; label: string }[];
}

export interface HeaderProps {
  title?: string;
}

// Matches

export interface MatchData extends UserData {
  id: number;
  matchPercentage?: number;
  lastActive?: string;
}

export interface MatchCardProps {
  match: MatchData;
  isPotential?: boolean;
  onMatchSuccess?: () => void;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface profileDataProps {
  avatar: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  bio: string;
  major: string;
  year: string;
  interests: string[];
  photos: string[];
  location: string;
  gender: string;
  genderPreference: string[];
}

export interface SwipingCarouselProps {
  images: (string | StaticImageData)[];
  name?: string;
  age?: number;
  major?: string;
  bio?: string;
}

export interface ExtendedMatchData extends MatchData {
  id: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  is_ucla_verified: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

export interface ProfileType {
  id: number;
  email: string;
  name?: string;
  bio: string;
  major: string;
  year: string;
  age: number;
  interests: string[];
  photos: string[];
  location: string;
  gender: string;
  gender_preference: string[];
  created_at: string;
  updated_at: string;
}

export interface ApiMatchData {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string | null;
  profile?: {
    bio?: string;
    age?: number;
    major?: string;
    year?: string;
    interests?: string[];
    photos?: string[];
    match_percentage?: number;
    last_active?: string;
  };
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: {
    id: number;
    username: string;
    profile_picture: string | null;
  }[];
  last_message: {
    content: string;
    timestamp: string;
  } | null;
}

export interface ApiMessage {
  id: number;
  content: string;
  sender: {
    email: string;
  };
  timestamp: string;
