import { useEffect, useRef, useCallback, useState } from "react";
import PostTop from './Post/PostTop';
import jsonPostData from '../../../../../../../assets/Data/post-data.json'
import { useSelector, useDispatch } from "react-redux";
import { selectAllPostIds } from '../../../../../../selectors/socialMedia';
import PostBottom from "./Post/PostBottom";
import useStyles from '../../../../../style';
import {
  getFacebookWithCommentsPosts
} from '../../../../../../actions/socialMedia';
import Progress from '../../../../../Common/Progress';
import "./Feed.css";

const Feed = ({ omitInteractionBar }) => {
  const allIds = useSelector(state => selectAllPostIds(state));
  const currentPostPage = useSelector(state => state.socialMedia.currentPostPage);
  const isLoading = useSelector(state => state.socialMedia.isLoading);
  const postEachPage = useSelector(state => state.socialMedia.postEachPage);
  const totalPostIds = useSelector(state => state.socialMedia.totalPostIds);
  const finish = useSelector(state => state.socialMedia.finish);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [postDataUpdated, setPostDataUpdated] = useState(false)
  const [postData, setPostData] = useState(jsonPostData)
  const [imgUrls, setImgUrls] = useState(["a","b","c","d","e"])

  const updatePosts = async (img_urls, post_data) => {
    await setPostData(post_data)
    await setImgUrls(img_urls)
    await setPostDataUpdated(() => true)
  }  

  useEffect(() => {
    console.log("*** Hacking Goes Here***")
    // Create readable JSON object
    const postDataObj = {}
    for (let postNum in jsonPostData) {
      postDataObj[jsonPostData[postNum]["filename"]] = jsonPostData[postNum]
    } 
    console.log(postDataObj)
    const img_urls = []
    const urlString = window.location.href
    let paramString = "?" + urlString.split('?')[1]
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      img_urls.push(pair[1] + ".png")
    }
    updatePosts(img_urls, postDataObj)
    console.log(postDataUpdated)
  }, []);
    //
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    

  const classes = useStyles();
  const dispatch = useDispatch();
  const observer = useRef();

  useEffect(() => {
    if (!finish) {
      const startIndex = currentPostPage * postEachPage;
      const slicePosts = totalPostIds.slice(startIndex, startIndex+5);
      dispatch(getFacebookWithCommentsPosts({ postIds: slicePosts }));
    }
  }, []);

  const lastPostRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !finish) {
        const startIndex = currentPostPage * postEachPage;
        const slicePosts = totalPostIds.slice(startIndex, startIndex+5);
        dispatch(getFacebookWithCommentsPosts({ postIds: slicePosts }))
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoading, finish, currentPostPage, postEachPage, totalPostIds, dispatch])

  return (
    <>
      <div className={classes.feed}>
        {allIds.map((postId, index) => {
          if (allIds.length === index + 1) {
            return (<div key={postId} ref={lastPostRef} className={classes.post}>
              <PostTop postDataUpdated={postDataUpdated} imgUrls={imgUrls} postData={postData} index={index} id={postId} />
              <PostBottom postDataUpdated={postDataUpdated} imgUrls={imgUrls} postData={postData}  index={index} id={postId} omitInteractionBar={omitInteractionBar}/>
            </div>)
          } else {
            return (<div key={postId} className={classes.post}>
              <PostTop postDataUpdated={postDataUpdated} imgUrls={imgUrls} postData={postData} index={index} id={postId} />
              <PostBottom postDataUpdated={postDataUpdated} imgUrls={imgUrls} postData={postData}  index={index} id={postId} omitInteractionBar={omitInteractionBar}/>
            </div>)
          }
        })}
      </div>
      <div className="paddingTop">
        {isLoading && <Progress />}
      </div>
    </>
  );
};

export default Feed;