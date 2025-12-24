import axios from "axios";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

function Contact() {
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const uploadVideo = async (file) => {
      try {
        const formData = new FormData();
        formData.append("video", file);
        await axios.post("/api/upload", formData, {
          cancelToken: cancelToken.token,
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Upload cancelled");
        }
      }
    };
    return () => cancelToken.cancel("Component unmounted");
  }, []);

  return <>Register</>;
}
export default Contact;
