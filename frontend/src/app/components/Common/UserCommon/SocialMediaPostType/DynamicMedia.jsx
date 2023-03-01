import { useEffect, useRef, useState } from "react";
import "./DynamicMedia.css";

const DynamicMedia = ({ attachedMedia, customCSS, index }) => {
  // we only handle cases for image and videos
  const [imgUrls, setImgUrls] = useState(["a","b","c","d","e"])
  const [mediaType, setMediaType] = useState(null);
  const [isPhoto, setIsPhoto] = useState(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);

  const updateState = async () => {
    await setMediaType(attachedMedia.mimeType);
    await setIsPhoto(attachedMedia.mimeType.indexOf('image') === -1 ? false : true);
  }  

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const updateUrls = async (img_urls) => {
    await setImgUrls(img_urls)
  }  

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // useEffect(() => {
  //   // if (attachedMedia) {
  //   //   updateState();
  //   //   window.global = window;
  //   //   window.Buffer = window.Buffer || require('buffer').Buffer;  
  //   //   let bufferd = window.Buffer.from(attachedMedia.media.data);
  //   //   let arraybuffer = Uint8Array.from(bufferd).buffer;

  //   //   const image = new Blob([arraybuffer], {
  //   //     type: mediaType
  //   //   });
  //   //   const url = URL.createObjectURL(image);
  //   //   if (isPhoto) imageRef.current.src = url;
  //   //   else {   
  //   //     videoRef.current.src = url;
  //   //     let options = {
  //   //       rootMargin: "0px",
  //   //       threshold: 0.25
  //   //     };
  //   //     let handlePlay = (entries, observer) => {
  //   //       if (videoRef.current && !entries[0].isIntersecting && !videoRef.current.paused) {
  //   //         videoRef.current.pause();
  //   //       }
  //   //     };
  //   //     let observer = new IntersectionObserver(handlePlay, options);
  //   //     observer.observe(videoRef.current);  
  //   //   }
  //   // }
  // });

  useEffect(() => {
    updateState()
    console.log("*** Hacking Goes Here***")
    const img_urls = []
    const urlString = window.location.href
    let paramString = "?" + urlString.split('?')[1]
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      img_urls.push("https://misinformation-images.s3.amazonaws.com/" + pair[1] + ".png")
    }
    updateUrls(img_urls)
  }, []);

  return (
    <>
      {attachedMedia && <div className="postImage">
        {isPhoto ? 
          <img src={imgUrls[index]} alt="" className={`${customCSS}`} key={attachedMedia._id} /> : <div></div>
        }
        </div>
      }
    </>
  );
}

export default DynamicMedia;
