import { UserData, Message } from "@/types/types";

export const currentUser: UserData = {
  name: "Burak Arslan",
  username: "burak_a",
  avatar: 'https://placehold.co/400',
  email: "burak@example.com",
  bio: "Computer Science student at UCLA. Love hiking, coding, and meeting new people!",
  age: 21,
  major: "Computer Science",
  year: "Junior",
  interests: ["Hiking", "Coding", "Movies", "Basketball", "Photography"],
  photos: [
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
  ],
};

export const mockUsers = {
  "user-1": { name: "Luke", avatar: null },
  "user-2": { name: "Charles", avatar: null },
  "user-3": { name: "Jason", avatar: null },
};

export const mockMessages: Record<string, Message[]> = {
  "user-1": [
    {
      id: 1,
      text: "Hey, how are you?",
      sender: "user-1",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "I'm good, thanks! How about you?",
      sender: "me",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      text: "Doing well. Want to grab coffee later?",
      sender: "user-1",
      timestamp: "10:35 AM",
    },
    {
      id: 4,
      text: "Sure, that sounds great!",
      sender: "me",
      timestamp: "10:36 AM",
    },
    {
      id: 5,
      text: "See you at the Bruin Cafe at 3?",
      sender: "user-1",
      timestamp: "10:38 AM",
    },
    {
      id: 6,
      text: "Perfect, see you there!",
      sender: "me",
      timestamp: "10:40 AM",
    },
  ],
  "user-2": [
    { id: 1, text: "Sup?", sender: "user-2", timestamp: "7:38 PM" },
    {
      id: 2,
      text: "Not much, just studying. You?",
      sender: "me",
      timestamp: "7:45 PM",
    },
    {
      id: 3,
      text: "Same. This CS project is killing me.",
      sender: "user-2",
      timestamp: "7:50 PM",
    },
  ],
  "user-3": [
    {
      id: 1,
      text: "Hey, did you get the notes from yesterday?",
      sender: "user-3",
      timestamp: "12:15 PM",
    },
    {
      id: 2,
      text: "Yes, I'll send them to you",
      sender: "me",
      timestamp: "12:20 PM",
    },
    { id: 3, text: "Thanks!", sender: "user-3", timestamp: "12:21 PM" },
    { id: 4, text: "Gotchu", sender: "me", timestamp: "12:25 AM" },
  ],
};

export const settingsOptions = {
  majorOptions: [
    "Computer Science",
    "Engineering",
    "Business",
    "Psychology",
    "Biology",
    "Mathematics",
    "English",
    "History",
    "Physics",
    "Chemistry",
    "Art",
  ].map((item) => ({ value: item, label: item })),

  yearOptions: [
    { value: "Freshman", label: "Freshman" },
    { value: "Sophomore", label: "Sophomore" },
    { value: "Junior", label: "Junior" },
    { value: "Senior", label: "Senior" },
    { value: "Graduate", label: "Graduate" },
  ],

  interestOptions: [
    "Hiking",
    "Coding",
    "Movies",
    "Basketball",
    "Photography",
    "Reading",
    "Cooking",
    "Gaming",
    "Music",
    "Dancing",
    "Traveling",
    "Art",
  ].map((item) => ({ value: item, label: item })),
};
