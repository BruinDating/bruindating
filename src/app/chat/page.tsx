"use client";
import { useEffect, useState } from "react";
import Profile from "@/components/chat/Profile";
import ChatWindow from "@/components/chat/ChatWindow";
import Contacts from "@/components/chat/Contacts";

// User & friend info structure
export interface User {
    name: string;
    country: string;
    age: number;
    height: string;
    religion: string;
    status: string;
    Hobbies: string;
    imageUrl: string;
}

// friend list structure
export interface Contact {
    id: number;
    name: string;
    imageUrl: string;
}

// Default user info - use to test the UI
const defaultUser: User = {
    name: "Ethan Zuo",
    country: "USA",
    age: 38,
    height: "6.1",
    religion: "Atheist",
    status: "Married",
    Hobbies: "Gym",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
};

// Default friend list - use to test the UI
const defaultFriends: Contact[] = [
    { id: 1, name: "Charles", imageUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
    { id: 2, name: "Burak", imageUrl: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 3, name: "Luck", imageUrl: "https://randomuser.me/api/portraits/men/10.jpg" },
    { id: 4, name: "Jason", imageUrl: "https://randomuser.me/api/portraits/women/12.jpg" },
    { id: 5, name: "Michael", imageUrl: "https://randomuser.me/api/portraits/men/15.jpg" }
];

export default function ChatPage() {
    // store user and friend info
    const [user, setUser] = useState<User>(defaultUser);
    const [friends, setFriends] = useState<Contact[]>(defaultFriends);

    // current selected friend(default is the first one)
    const [selectedUser, setSelectedUser] = useState<Contact>(friends[0]);

    // Dynamic API - fetch user and friend info from backend instead of using default data
    /*
    useEffect(() => {
        // fetch user info
        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => setUser(data));

        // fetch friend list
        fetch("/api/friends")
            .then((res) => res.json())
            .then((data) => {
                setFriends(data);
                setSelectedUser(data[0]); // default select the first friend
            });
    }, []);
    */

    return (
        <div className="flex h-screen bg-gray-100">
            <Profile {...user} />
            <ChatWindow user={selectedUser} />
            <Contacts friends={friends} onSelectUser={setSelectedUser} />
        </div>
    );
}
