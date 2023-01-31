import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { uploadImage, uploadPost } from "../../Actions/uploadAction";
import { toast } from "react-toastify";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

export default function PostShare() {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const desc = useRef();
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [crop, setCrop] = useState({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  })

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (
        event.target.files[0].type !== "image/jpeg" &&
        event.target.files[0].type !== "image/jpg" &&
        event.target.files[0].type !== "image/png" &&
        event.target.files[0].type !== "image/svg"
      ) {
        toast.error("This file type not allowed");
        return;
      } 
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!desc.current?.value && !image) {
      toast.error("Field Empty");
      return;
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "profiledemo.webp"
        }
        alt=""
      />

      <div className="textpost">
        <input ref={desc} required type="text" placeholder="What's happening" />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <div>
            <button
              className="button ps-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Uploading" : "Share"}
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            {/* <ReactCrop crop={crop} onChange={(crop) => setCrop(crop)} >

            </ReactCrop> */}
          <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
