import { useSelector, useDispatch } from "react-redux";
import { likeFbPost, unlikeFbPost, commentFbPost } from '../../../../../../../actions/socialMedia';
import { selectPostsMetadata } from '../../../../../../../selectors/socialMedia';
import { useState } from "react";
import { Avatar } from "@material-ui/core";
import ShareModal from './ShareModal';
import { FB_TRANSLATIONS_DEFAULT } from '../../../../../../../constants';
import { FacebookSelector } from '@charkour/react-reactions';
import FacebookCounter from "../../FacebookCounter/FacebookCounter";
import InputEmoji from "react-input-emoji";
import IconSendViaIconduckSvg from '../../../../../../../../assets/Facebook/icon-send-via-iconduck.svg';
import PostBottomComments from "./PostBottomComments/PostBottomComments";
import "./Post.css";

const initLikes = [651, 1600, 12000, 50, 5300]

const PostBottom = ({ id, omitInteractionBar, index, postData, imgUrls, postDataUpdated}) => {
  const postMetadata = useSelector(state => selectPostsMetadata(state, id));
  const socialMediaTranslations = useSelector(state => state.socialMedia.socialMediaTranslations);
  const userRegisterData = useSelector(state => state.userRegister.metaData);
  

  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [currentComment, setCurrentComment] = useState("");
  const [modalOpen , setModalOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  const handleToggleLike = (e) => {
    e.preventDefault();
    if (postMetadata.actionId) {
      dispatch(unlikeFbPost(postMetadata.actionId, id));
    } else {
      const data = {
        action: 'LIKE',
        comment: null,
        userPostId: id,
      };
      dispatch(likeFbPost(data, id));
    }
    setDisplay(false);
  };

  const toggleComment = () => {
    setOpenCommentBox(!openCommentBox);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (currentComment) {
      const data = {
        action: 'COMMENT',
        comment: currentComment,
        userPostId: id
      };
      dispatch(commentFbPost(data, id));
      setCurrentComment("");
    }
  };

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleReactions = async (reaction) => {
    setDisplay(false);
    // fire the actual action event
    if (postMetadata.actionId) await dispatch(unlikeFbPost(postMetadata.actionId, id));
    const data = {
      action: reaction.toUpperCase(),
      comment: null,
      userPostId: id,
    };
    await dispatch(likeFbPost(data, id));
  } 
  return (
    <>
    {!omitInteractionBar &&
      <div onMouseLeave={() => setDisplay(false)}>
        <div className="postActionsContainer">
          <div className="postAction reactionContainer childrenReactions">
          {display && <FacebookSelector onSelect={handleReactions} iconSize={30} />}
          {!display && index >= 0 && (imgUrls[index] in postData) &&
            <div style={{paddingTop: '15px'}}>
              <FacebookCounter onClick={() => setDisplay(true)} counters={postData[imgUrls[index]]["initLike"]}/>
            </div>
          }
          {!display && index >= 0 && !(imgUrls[index] in postData) &&
            <div style={{paddingTop: '15px'}}>
              <FacebookCounter onClick={() => setDisplay(true)} counters={initLikes[index]}/>
            </div>
          }
          {!display && index < 0 &&
            <div style={{paddingTop: '15px'}}>
              <FacebookCounter onClick={() => setDisplay(true)} counters={0}/>
            </div>
          }
          </div>
          <div className="postAction totalComments">
            <p>{(postMetadata?.comments?.length.toString() || "0") + " " + (socialMediaTranslations?.comments || FB_TRANSLATIONS_DEFAULT?.COMMENTS)}</p>
          </div>
        </div>
        <div className="postOptions">
          <div className="postOption parentReactions"
            onMouseOver={() => setDisplay(true)}
            onClick={(e) => handleToggleLike(e)}>
              <div className={postMetadata.like.toLowerCase() + 'Emoji'}></div>
              <p className={postMetadata.like.toLowerCase() + 'Text'}>
                <strong>
                {postMetadata.like === 'default' ? socialMediaTranslations?.['like'] || FB_TRANSLATIONS_DEFAULT?.['LIKE'] : 
                  socialMediaTranslations?.[postMetadata.like.toLowerCase()] || FB_TRANSLATIONS_DEFAULT?.[postMetadata.like]}
                </strong>
              </p>
          </div>
          <div className="postOption" onClick={toggleComment}>
            <div className={'commentEmoji'}></div>
            <p><strong>{socialMediaTranslations?.comment || FB_TRANSLATIONS_DEFAULT.COMMENT}</strong></p>
          </div>
          {/* <div className="postOption" onClick={openModal}>
            <div className={'shareEmoji'}></div>
            <p><strong>{socialMediaTranslations?.share || FB_TRANSLATIONS_DEFAULT.SHARE}</strong></p>
          </div> */}
        </div>

        {/* preserve the parent post data */}
        {modalOpen && <ShareModal index={0} id={postMetadata.parentPostId || id} setModalOpen={setModalOpen}/>}
      </div>
    }

    {(openCommentBox || omitInteractionBar) && 
      <div className="comment">
        {postMetadata.comments?.length > 0 ? postMetadata.comments.map((commentMetaData, index) => (
          <div key={index}
            className={index === 0 ? 'fbPostBottomTopMargin' : ''}
          >
            <PostBottomComments commentMetaData={commentMetaData} />
          </div>
        )) : null}

        <div className="createComment">
          <Avatar 
            src={userRegisterData['PROFILEPHOTO'] || ""}
          />
          {/* <input
          value={currentComment}
          onChange={({ target }) => setCurrentComment(target.value)}
          className="createCommentInputText"
          type="text"
          placeholder={socialMediaTranslations?.write_a_comment || FB_TRANSLATIONS_DEFAULT.WRITE_A_COMMENT} /> */}
          <InputEmoji
            value={currentComment}
            onChange={setCurrentComment}
            onKeyDown={e => (e.key === 'Enter' ? handleSubmitComment(e) : null)}
            theme={"light"}
            placeholder={socialMediaTranslations?.write_a_comment || FB_TRANSLATIONS_DEFAULT.WRITE_A_COMMENT}
            className="createCommentInputText"
          />
          <button className="postComment" onClick={e => handleSubmitComment(e)} type="submit">
            {socialMediaTranslations?.post || FB_TRANSLATIONS_DEFAULT.POST}
          </button>
          <button 
            className="postCommentMobile" 
            onClick={e => handleSubmitComment(e)}
            type="submit"
          >
            <IconSendViaIconduckSvg 
              fill='gray'
            />
          </button>
        </div>
      </div>
    }
   </> 
  );
};

export default PostBottom;