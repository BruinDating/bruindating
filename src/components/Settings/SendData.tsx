import { UserData } from "@/types/types";

export function SendData({updateUser}:{updateUser: UserData}){
    const accessToken = localStorage.getItem("access_token");

    // Send updated user data to backend
    const sendUserData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/update/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateUser)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
        } catch(error){
            //==!! implement error handler !!==//
            //errorHandler(error);
        }
    };

    // Call the function to send data
    sendUserData();

    console.log("Data sent profile: %s", (updateUser.name));
    console.log("Data sent profile: %s", (updateUser.username));
    console.log("Data sent profile: %s", (updateUser.email));
    console.log("Data sent profile: %s", (updateUser.avatar));
    console.log("Data sent profile: %s", (updateUser.bio));
    console.log("Data sent profile: %s", (updateUser.age));
    console.log("Data sent profile: %s", (updateUser.major));
    console.log("Data sent profile: %s", (updateUser.year));
    console.log("Data sent profile: %s", (updateUser.interests));
    console.log("Data sent profile: %s", (updateUser.photos));

    console.log("Data sent profile: %s", (updateUser.dpAgeRange));
    console.log("Data sent profile: %s", (updateUser.dpDistance));
    console.log("Data sent profile: %s", (updateUser.dpShowMe));
    console.log("Data sent profile: %s", (updateUser.dpInterests));
    console.log("Data sent profile: %s", (updateUser.dpMajors));

    console.log("Data sent profile: %s", (updateUser.notiNewMatches));
    console.log("Data sent profile: %s", (updateUser.notiMessages));
    console.log("Data sent profile: %s", (updateUser.notiAppUpdates));
    console.log("Data sent profile: %s", (updateUser.notiEmailNotifications));

    console.log("Data sent profile: %s", (updateUser.priProfileVisibility));
    console.log("Data sent profile: %s", (updateUser.priShowOnlineStatus));
    console.log("Data sent profile: %s", (updateUser.priShowLastActive));
    console.log("Data sent profile: %s", (updateUser.priAllowTagging));

    
}