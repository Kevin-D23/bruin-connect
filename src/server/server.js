import express from "express";
import userRoute from "./routes/User.js";
import postRoute from "./routes/Post.js"
import clubRoute from "./routes/Club.js"
import cors from "cors";
import { generateUploadUrl } from "./s3.js";

const PORT = process.env.PORT ?? 8000;
const app = express();


app.use(express.json());
app.use(cors());

app.use(userRoute);
app.use(postRoute)
app.use(clubRoute)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// retrieve presigned S3 URL
app.get("/s3Url", async (req, res) => {
  const url = await generateUploadUrl();
  res.send({ url });
});
