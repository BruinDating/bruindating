import { UserData } from "@/types/types";

export function SendData({updateUser}:{updateUser: UserData}){
    // test to see if data can be sent 
    console.log("Data sent profile: %s", (updateUser.name));
    console.log("Data sent preference %s", (updateUser.dpDistance));
    console.log("Data sent notification %s", (updateUser.notiAppUpdates));
    console.log("Data sent privacy %s", (updateUser.priAllowTagging));

    //==!! add code to end data !!==//
}