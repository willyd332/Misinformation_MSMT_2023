import {
  STACK_FB_STATE,
  SET_FB_POST_LIKE,
  SET_FB_POST_UNLIKE,
  SET_FB_POST_COMMENT,
  SET_POST_REPORT,
  SET_POST_UNREPORT,
  CREATE_FB_POST,
  SET_FB_LOADING,
  SET_FB_POST_IDS_AND_COUNT,
  SET_FB_POST_FETCH_FINISH,
  UPDATE_FACEBOOK_PAGE_STATE,
  CLEAR_FB_STATE,
  UNDO_POST,
  INCREMENT_REPLIES_COUNT,
  INCREMENT_QUOTE_RETWEET_COUNT,
  DECREMENT_QUOTE_RETWEET_COUNT
} from "../actions/types";
import { removePropery } from '../utils';

const initialState = {
  posts: {},
  metaData: {},
  allIds: [],
  isLoading: false,
  pageId: null,
  totalPostCount: 0,
  currentPostPage: 0,
  postEachPage: 5,
  totalPostIds: [],
  finish: false,
  socialMediaTranslations: null,
  authors: null
};

// this is bad and goes against whole point of using redux but for
// now we can use it as it is a standalone component and we do not have seperate states for post component
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_FB_POST_IDS_AND_COUNT:
      return {
        totalPostCount: payload.totalPostCount,
        currentPostPage: 0,
        postEachPage: 5,
        totalPostIds: payload.totalPostIds,
        pageId: payload.pageId,
        posts: {},
        metaData: {},
        allIds: [],
        isLoading: false,
        finish: false,
        socialMediaTranslations: payload.socialMediaTranslations || null,
        authors: payload.authors,
      };

    case STACK_FB_STATE:
      return {
        ...state,
        posts: {
          ...state.posts,
          ...payload.posts,
        },
        metaData: {
          ...state.metaData,
          ...payload.metaData,
        },
        allIds: [
          ...state.allIds,
          ...payload.allIds,
        ],
        isLoading: payload.isLoading,
      };

      case SET_FB_POST_FETCH_FINISH:
        return {
          ...state,
          finish: true
        }

      case UPDATE_FACEBOOK_PAGE_STATE:
        let nextCurrentPostPage = state.currentPostPage;
        let finish = false;
        if ((nextCurrentPostPage+1) * 5 < state.totalPostCount) {
          nextCurrentPostPage++;
        } else {
          finish = true;
        }
        return {
          ...state,
          currentPostPage: nextCurrentPostPage,
          finish,
        };

      case SET_FB_POST_LIKE:
        return {
          ...state,
          metaData: {
            ...state.metaData,
            [payload.postId]: {
              ...state.metaData[payload.postId],
              like: payload.like,
              actionId: payload.actionId
            }
          }
        };

    case SET_FB_POST_UNLIKE:
      return {
        ...state,
        metaData: {
          ...state.metaData,
          [payload.postId]: {
            ...state.metaData[payload.postId],
            like: 'default',
            actionId: null
          }
        }
      };

    case SET_POST_REPORT:
      return {
        ...state,
        metaData: {
          ...state.metaData,
          [payload.postId]: {
            ...state.metaData[payload.postId],
            reportId: payload.reportId
          }
        }
      };
      
    case SET_POST_UNREPORT:
      return {
        ...state,
        metaData: {
          ...state.metaData,
          [payload.postId]: {
            ...state.metaData[payload.postId],
            reportId: null
          }
        }
      };

    case SET_FB_POST_COMMENT:
      return {
        ...state,
        metaData: {
          ...state.metaData,
          [payload.postId]: {
            ...state.metaData[payload.postId],
            comments: 
              [
                ...state.metaData[payload.postId].comments,
                {
                  comment: payload.comment,
                  userComment: payload.userComment,
                  attachedAuthorPicture: payload.attachedAuthorPicture,
                  authorId: payload.authorId
                }
              ]
          }
        }
      };

    case INCREMENT_REPLIES_COUNT:
      return {
        ...state,
        metaData: {
          ...state.metaData,
          [payload._id]: {
            ...state.metaData[payload._id],
            initReply: state.metaData[payload._id].initReply + 1
          }
        }
      };

    case INCREMENT_QUOTE_RETWEET_COUNT:
      return {
        ...state,
        metaData: {
          ...state.metaData,
          [payload._id]: {
            ...state.metaData[payload._id],
            initTweet: state.metaData[payload._id].initTweet + 1
          }
        }
      };

    case DECREMENT_QUOTE_RETWEET_COUNT:
      return {
        ...state,
        metaData: {
          ...state.metaData,
          [payload._id]: {
            ...state.metaData[payload._id],
            initTweet: state.metaData[payload._id].initTweet - 1
          }
        }
      };

    case CREATE_FB_POST:
      const { type, parentPostId, postMessage, initLike, isReplyTo, quoteTweetTo } = payload.post;
      return {
        ...state,
        posts: {
          [payload._id]: {
            _id: payload._id,
            type: type,
            userPost: true,
            postMessage: postMessage,
            parentPostId: parentPostId,
            attachedMedia: payload.attachedMedia,
            isReplyTo: isReplyTo,
            quoteTweetTo: quoteTweetTo,
          },
          ...state.posts,
        },
        metaData: {
          [payload._id]: {
            comments: [],
            like: 'default',
            type: type,
            initLike: 0,
            initReply: 0,
            initTweet: 0,
            actionId: null,
            parentPostId: parentPostId,
          },
          ...state.metaData,
        },
        allIds: [payload._id, ...state.allIds]
      };

    case UNDO_POST:
      return {
        ...state,
        posts: removePropery(payload.postId, state.posts),
        metaData: removePropery(payload.postId, state.metaData),
        allIds: state.allIds.filter(item => item !== payload.postId)
      };

    case SET_FB_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    
    case CLEAR_FB_STATE:
      return {
        ...state,
        posts: {},
        metaData: {},
        allIds: [],
        isLoading: false,
        pageId: null,
        totalPostCount: 0,
        currentPostPage: 0,
        postEachPage: 5,
        totalPostIds: [],
        finish: false,
        socialMediaTranslations: null,
        authors: {}
      }
    
    default:
      return state;
  }
}
