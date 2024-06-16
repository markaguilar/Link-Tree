import React from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line no-unused-vars
export async function cloudinaryUpload(ev, callbackFn) {
  // @ts-ignore
  const file = ev.target.files?.[0];

  if (file) {
    const uploadPromise = new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "uoek6azl");
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => {
        if (response.ok) {
          response.json().then((link) => {
            // console.log(link.secure_url)
            callbackFn(link.secure_url);
            resolve(link.secure_url);
          });
        } else {
          reject();
        }
      });
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "Uploaded!",
      error: "Upload error!",
    });
  }
}
