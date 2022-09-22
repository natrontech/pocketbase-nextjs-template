import Api from "../config/Api";
import { User } from 'pocketbase';

export const parseUserAvatarUrl = (userObj: User) => {
    return Api.getUri() + "/files/" + userObj?.profile?.["@collectionId"] + "/" + userObj?.profile?.id + "/" + userObj?.profile?.avatar;
}
