import React from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const { currentUser } = user;

  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePerc(Math.round(progress));
      },

      (error) => {
        console.log('Error in file Upload : ', error);
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold  text-center my-7">Profile</h1>

      <form className="flex flex-col gap-y-4 ">
        {/* ------------ image --------------- */}

        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(events) => setFile(events.target.files[0])}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <p className='text-center'>
          {
            fileUploadError ? (<span className='text-red-700'>Error in Image Upload (image must be less than 2mb)</span> ): filePerc > 0 && filePerc < 100 ? (<span className='text-slate-700'>{`Uploading ${filePerc}`}</span>) : filePerc === 100 ? (<span className='text-green-700 '>Image Successfully Uploaded</span>) : ""
          }
        </p>

        {/* ---------------- username ----------------- */}

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />

        {/* ---------------- email ----------------- */}

        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />

        {/* ---------------- password ----------------- */}

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />

        {/* -------------- Update  ----------------------- */}

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>

      {/* ----------------- button groups ------------------ */}

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer ">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
