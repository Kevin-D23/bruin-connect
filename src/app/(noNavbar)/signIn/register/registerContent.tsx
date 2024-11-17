"use client";
import { RegisterContext, RegisterContextType } from "./page";
import { SyntheticEvent, useEffect, useRef, useState, useContext } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { SignOut } from "@/app/api/auth/actions";
import { useRouter } from "next/navigation";
import Upload from "@/assets/icons/upload";
import { majorOptions } from "@/assets/lists/majorOptions";
import { pronounOptions } from "@/assets/lists/pronouns";
import Xmark from "@/assets/icons/Xmark";
import Checkmark from "@/assets/icons/checkmark";
import ProfileCard from "../../../../components/profileCard/profileCard";
import "react-image-crop/src/ReactCrop.scss";
import styles from "./register.module.scss";
import { useSession } from "next-auth/react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type OptionType = {
  value: string;
  label: string;
};

export default function RegisterContent() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const email = session.data?.user?.email;

  const { formData, setFormData } = useContext(
    RegisterContext
  ) as RegisterContextType;

  const [validForm, setValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationPage, setRegistrationPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
    else setErrorMessage("* Must complete all fields!");
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

  useEffect(() => {
    async function trySubmit() {
      setIsLoading(true);
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
          setIsLoading(false);
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
      user_id: userId as string,
      email: email as string,
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
    setIsLoading(false);
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
      imageElement.addEventListener("load", (e: Event) => {
        if (imageError) setImageError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
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

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Data input */}
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
                styles={selectStyles}
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
                styles={selectStyles}
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
              {/* Display profile preview */}
              {previewCanvasRef.current && blob && (
                <div className={styles.imgPreview}>
                  <ProfileCard
                    imgLink={previewCanvasRef.current?.toDataURL()}
                    firstName={formData.first_name}
                    lastName={formData.last_name}
                    pronouns={formData.pronouns}
                    major={formData.major}
                  />
                  <div className={styles.imgConfirmationContainer}>
                    <button
                      className={styles.removeImg}
                      onClick={() => {
                        setBlob(undefined);
                        setPictureConfirmed(false);
                        setTempImg("");
                      }}
                    >
                      Remove
                    </button>{" "}
                    <button
                      className={styles.cropImg}
                      onClick={() => {
                        setBlob(undefined);
                        setPictureConfirmed(false);
                      }}
                    >
                      Crop
                    </button>
                  </div>
                </div>
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
    </>
  );
}

function setCanvasPreview(
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  crop: Crop
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

const selectStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    height: "2.5rem",
    border: "1px solid rgba(0,0,0,.1)",
    backgroundColor: "var(--primary-bg)",
    color: "var(--primary-text)",
    fontSize: "0.875rem",
    fontWeight: "400",
  }),
  menuList: (base) => ({
    ...base,
    color: "var(--primary-text)",
    backgroundColor: "var(--primary-bg)",
    fontSize: "0.875rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#868585",
    fontWeight: "400",
    fontSize: "0.875rem",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--primary-text)",
    fontSize: "0.875rem",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "var(--secondary)" : undefined,
  }),
  input: (base) => ({
    ...base,
    color: "var(--primary-text)",
  }),
};
