import * as ActionTypes from './ActionTypes.js';

const Reducer = (Posts, action) => {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            return action.post;
        case ActionTypes.ADD_POST:
            return Posts.concat(action.post);
        default:
            return Posts;
    }

}
export default Reducer;