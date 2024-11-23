import express from "express";
import { getClubById, createClub } from "../queries/clubQueries";

const router = express.Router();

// Route to get club by ID
router.get("/api/club/:clubId", async (req, res) => {
  const club_id = req.params.clubId;

  try {
    const club = await getPostById({ club_id });
    res.status(200).json(club);
  } catch (error) {
    console.error("Error getting club:", error);
    res.status(500);
  }
});

// Route to create a club
router.post("/api/club", async (req, res) => {
  const { club_id, club_name, description, logo  } = req.body;

  const clubInfo = {
    club_id, club_name, description, logo 
  };

  try {
    const newClub = await createPost(clubInfo);
    if (newClub) res.status(200).json(newClub);
    else res.status(500).json();
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500);
  }
});

export default router;
