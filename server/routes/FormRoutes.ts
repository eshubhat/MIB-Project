import express, { Request, Response } from "express";
import { DynamicFormModel } from "../Models/Form";

const router = express.Router();

// Create a new user
router.post("/submit-form", async (req: Request, res: Response) => {
  const { form, eventName } = req.body;
  console.log(form);
  console.log("eventName: ", eventName);

  try {
    const newForm = new DynamicFormModel(form);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await DynamicFormModel.find();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
