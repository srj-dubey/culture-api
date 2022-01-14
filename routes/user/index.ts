import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
import { PrismaClient } from "@prisma/client";

//validation import
import { registerUser } from "../../validation";

//Register a User
router.post("/register", async (req, res) => {
  const { user } = new PrismaClient();

  //validating the user for register
  const { error } = registerUser(req.body);

  if (error) {
    res.json({
      status: 400,
      message: "Error",
      error: error.message,
    });
  } else {
    try {
      //Checking if the user already exist
      const alreadyExist = await user.findFirst({
        where: { email: req.body.email },
      });

      if (alreadyExist) {
        res.json({
          status: 400,
          message: "Error",
          error: "User already exist.",
        });
      } else {
        //generating hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // query
        user
          .create({
            data: {
              ...req.body,
              password: hashedPassword,
              joinedDate: new Date(),
              lastUpdated: new Date(),
            },
          })
          .then((data) => {
            res.json({
              status: 201,
              message: "Success",
              data: { id: data.id },
            });
          })
          .catch((e) => {
            res.json({
              status: 400,
              message: "Error",
              error: e.message,
            });
          });
      }
    } catch (e) {
      res.json({
        status: 500,
        message: "Error",
        error: "Something went wrong",
      });
    }
  }
});

export default router;
