"use client";
import styles from "./signInCard.module.scss";
import Image from "next/image";
import signInImage from "../../assets/images/signInImage.png";
import Logo from "@/components/logo/logo";
import { SignIn } from "@/app/api/auth/actions";
import google from "../../assets/icons/google.png";
import { SyntheticEvent, use, useEffect, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";
import { SignOut } from "@/app/api/auth/actions";
import { useRouter } from "next/navigation";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import Upload from "@/assets/icons/upload";
import { majorOptions } from "@/assets/lists/majorOptions";
import { pronounOptions } from "@/assets/lists/pronouns";
import Xmark from "@/assets/icons/Xmark";
import Checkmark from "@/assets/icons/checkmark";
import ProfileCard from "../profileCard/profileCard";

// formats email to hidden email
function formatEmail(email: String) {
  // Split the email into username and domain
  const [username, domain] = email?.split("@");

  // Replace characters in the username with asterisks
  const formattedUsername = username.slice(0, 3) + "****";

  // Return the formatted email
  return `${formattedUsername}@${domain}`;
}

type PageProps = {
  pageName: String;
  userId?: String;
  email?: String | undefined | null;
};

// Type for select options
type OptionType = {
  value: string;
  label: string;
};

export default function SignInCard({ pageName, userId, email }: PageProps) {
  const [formData, setFormData] = useState({
    user_id: userId,
    email: email,
    first_name: "",
    last_name: "",
    major: "",
    pronouns: "",
    profile_picture: "",
  });
  const [validForm, setValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationPage, setRegistrationPage] = useState(1);

  // image variables
  const [crop, setCrop] = useState<Crop>();
  const [imageError, setImageError] = useState("");
  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 100;
  const [pictureConfirmed, setPictureConfirmed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [tempImg, setTempImg] = useState("");
  const [blob, setBlob] = useState<File>();
  const [s3Link, setS3Link] = useState("");

  const router = useRouter();

  // uploads profile picture to s3 then submits form
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (registrationPage == 2) await uploadToS3();
    else if (checkForm()) setRegistrationPage(2);
  }

  useEffect(() => {
    async function trySubmit() {
      if (checkForm()) {
        // POST request to create account
        try {
          const response = await fetch("http://localhost:8000/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (!response.ok) {
            console.error("Registration response was not ok");
          }
          if (response?.status == 200) {
            if (await response.json()) router.push("/");
          } else {
            setErrorMessage("** Error creating account");
          }
        } catch (error) {
          console.error("Error completing registration:", error);
        }
      } else {
        setErrorMessage("* Must complete all fields!");
      }
    }
    if (registrationPage == 2) trySubmit();
  }, [s3Link]);

  // Updates formData per key input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Updates formData on select
  function handleSelect(e: SingleValue<OptionType>, name: string) {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e?.value,
    }));
  }

  // Checks if form is valid/complete
  function checkForm() {
    if (
      formData.email &&
      formData.user_id &&
      formData.first_name &&
      formData.last_name &&
      formData.major &&
      formData.pronouns
    )
      return true;
    return false;
  }

  // Checks to see if component is mounted so the 'document' can be used
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setValidForm(checkForm());
  }, [formData]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // set imageURL on upload
  function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const imageElement = document.createElement("img");
      const imgUrl = reader.result?.toString() || "";
      imageElement.src = imgUrl;

      // on image load, check if image meets dimension requirements
      imageElement.addEventListener("load", (e: any) => {
        if (imageError) setImageError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          setImageError("** Image must be at least 150x150 pixels");
          return setTempImg("");
        }
      });

      setTempImg(imgUrl);
    });
    reader.readAsDataURL(file);
  }

  // set crop dimensions
  function onImageLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;

    const crop = makeAspectCrop(
      {
        unit: "px",
        width: MIN_DIMENSION,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }

  // draws new canvas for cropped image
  function setCanvasPreview(
    image: HTMLImageElement | null,
    canvas: HTMLCanvasElement | null,
    crop: any
  ) {
    if (canvas && image) {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d context");
      }

      const pixelRatio = window.devicePixelRatio;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
      canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = "high";
      ctx.save();

      const cropX = crop.x * scaleX;
      const cropY = crop.y * scaleY;

      ctx.translate(-cropX, -cropY);
      ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
      );

      ctx.restore();
    }
  }

  // upload copped image to s3 bucket
  async function handleCrop() {
    if (imgRef.current && crop && previewCanvasRef.current) {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
      );
      let uploadFile = await new Promise((resolve, reject) => {
        previewCanvasRef?.current?.toBlob((blob) => {
          if (blob) {
            resolve(
              new File([blob], "bruin-connect-profile-picture.jpg", {
                type: "image/jpeg",
              })
            );
          } else {
            reject(new Error("Failed to crop image"));
          }
        }, "image/jpeg");
      });
      setBlob(uploadFile as File);
      setPictureConfirmed(true);
    }
  }

  async function uploadToS3() {
    if (pictureConfirmed && previewCanvasRef.current) {
      const res = await fetch("http://localhost:8000/s3Url");
      const { url } = await res.json();
      const upload = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg", // Ensure the Content-Type matches your file type
        },
        body: blob,
      });

      setFormData((prevState) => ({
        ...prevState,
        profile_picture: upload.url.split("?")[0],
      }));

      setS3Link(upload.url.split("?")[0]);
    } else setS3Link("null");
  }

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={signInImage}
        width={0}
        height={0}
        alt="bruin flags"
      />
      <div className={styles.formContainer}>
        <Logo className={styles.logo} />
        {/* Google Sign in  */}
        {pageName == "signIn" && (
          <div className={styles.btnContainer}>
            <button className={styles.googleBtn} onClick={() => SignIn()}>
              <Image src={google} width={30} height={30} alt="google" />
              Sign in with Google
            </button>
          </div>
        )}
        {/* User data registration */}
        {pageName == "register" && (
          <form onSubmit={handleSubmit} className={styles.form}>
            {registrationPage == 1 && (
              <div>
                {errorMessage && (
                  <div className={styles.error}>
                    <p>{errorMessage}</p>
                  </div>
                )}
                <input
                  className={styles.input}
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={(e) => handleInput(e)}
                />
                <input
                  className={styles.input}
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={(e) => handleInput(e)}
                />
                <Select
                  className={styles.select}
                  isSearchable={true}
                  options={majorOptions}
                  instanceId={"searchMajor"}
                  value={
                    majorOptions[
                      majorOptions.findIndex(
                        (major) => major.value === formData.major
                      )
                    ]
                  }
                  name="major"
                  placeholder="Major"
                  onChange={(e) => handleSelect(e, "major")}
                  menuPortalTarget={isMounted ? document.body : null}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "2.5rem",
                      border: "1px solid rgba(0,0,0,.1)",
                    }),
                  }}
                />
                <Select
                  className={styles.select}
                  options={pronounOptions}
                  placeholder="Pronouns"
                  instanceId={"pronouns"}
                  name="pronouns"
                  value={
                    pronounOptions[
                      pronounOptions.findIndex(
                        (pronoun) => pronoun.value === formData.pronouns
                      )
                    ]
                  }
                  onChange={(e) => handleSelect(e, "pronouns")}
                  menuPortalTarget={isMounted ? document.body : null}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "2.5rem",
                      border: "1px solid rgba(0,0,0,.1)",
                    }),
                  }}
                />
                <a className={styles.help} href={"mailto:nothing@gmail.com"}>
                  Need help
                </a>
              </div>
            )}
            {/* Profile picture registration */}
            {registrationPage == 2 && (
              <div className={styles.imgUpload}>
                {/* Display image upload button */}
                {!tempImg && (
                  <div className={styles.imgBtnContainer}>
                    <input
                      type="file"
                      id="uploadBtn"
                      onChange={uploadFile}
                      hidden
                      accept="image/*"
                    />
                    <label htmlFor="uploadBtn">
                      <Upload />
                      Profile Picture
                    </label>
                  </div>
                )}
                {imageError && <p>{imageError}</p>}
                {/* Display cropping tool */}
                {tempImg && !pictureConfirmed && (
                  <div className={styles.cropImgContainer}>
                    <ReactCrop
                      crop={crop}
                      circularCrop
                      keepSelection
                      aspect={ASPECT_RATIO}
                      minWidth={MIN_DIMENSION}
                      onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}
                    >
                      <img
                        src={tempImg}
                        alt="upload"
                        onLoad={(e) => onImageLoad(e)}
                        ref={imgRef}
                      />
                    </ReactCrop>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setTempImg("");
                        }}
                      >
                        <Xmark />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleCrop();
                        }}
                      >
                        <Checkmark />
                      </button>
                    </div>
                  </div>
                )}
                {previewCanvasRef.current && blob && (
                  <ProfileCard
                    imgLink={previewCanvasRef.current?.toDataURL()}
                    firstName={formData.first_name}
                    lastName={formData.last_name}
                    pronouns={formData.pronouns}
                    major={formData.major}
                  />
                )}
              </div>
            )}
            <div className={styles.btnContainer}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  registrationPage == 1
                    ? SignOut("/signIn")
                    : setRegistrationPage(1);
                }}
              >
                Back
              </button>
              <button type="submit" className={validForm ? styles.active : ""}>
                {registrationPage == 1
                  ? "Next"
                  : pictureConfirmed
                  ? "Create"
                  : "Skip"}
              </button>
            </div>
            {crop && (
              <canvas
                ref={previewCanvasRef}
                style={{
                  height: 100,
                  width: 100,
                  display: "none",
                }}
              ></canvas>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
