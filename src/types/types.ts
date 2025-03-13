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
