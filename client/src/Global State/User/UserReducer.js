import * as ActionTypes from './ActionTypes.js';

const UserReducer = (User, action) => {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            return action.post;
        case ActionTypes.ADD_POST:
            return User.concat(action.post);
        default:
            return User;
    }
}
export default UserReducer;