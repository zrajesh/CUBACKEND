const express = require("express");
const { signIn, signUp, signOut, signUpMsde, signInMsde, signUpAlumini, signInAlumini, getStudents, getAluminis, updateAlumini, deleteAlumini, getAluminisByDomain, getAluminisByGender, getAluminisByAuth, getAluminisByRegNo } = require("../controllers/auth");
const router = express.Router();

router.post("/signup/student", signUp);
router.post("/signin/student", signIn);
router.get("/students", getStudents);

router.post("/signup/alumini", signUpAlumini);
router.post("/signin/alumini", signInAlumini);
router.get("/aluminis", getAluminis);
router.get("/aluminis/:regNo", getAluminisByRegNo);
router.get("/aluminis/work/:domain", getAluminisByDomain);
router.get("/aluminis/gen/:gender", getAluminisByGender);
router.get("/aluminis/verify/:auth", getAluminisByAuth);
router.put("/alumini/update", updateAlumini);
router.delete("/alumini/delete/:id", deleteAlumini);

router.post("/signup/msde", signUpMsde);
router.post("/signin/msde", signInMsde);

router.get("/signout", signOut);

module.exports = router;
