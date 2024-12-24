import { Router } from "express";
import { acceptHiringRequest, addBenchEmployee, addEducationToBenchEmployee, addWorkExperienceToBenchEmployee, assignBenchEmployeeToPost, createBill, createHolidayRequest, createLogin, createTicket, deleteLogin, forgetPasswordLinkGenerator, grantPermission, invoiceHistory, logoutSupplier, rejectHiringRequest, requestsForBenchEmployee, revokePermission, supplierLogin, supplierRegister, toggleAvailabilityStatus, updateAvailabilityTiming, updateCertifications, updateCommunicationSkills, updateEmployeeDetails, updateLicenses, updateSkills } from "../controllers/supplier.controller.js";
import { fetchAccessToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route('/register').post(upload.fields
    ([
        { name: 'documents', maxCount: 10 },
        { name: 'companyLogo', maxCount: 1 },
        { name: 'supportingDocument', maxCount: 1 },
    ])
    , supplierRegister)
// router.route("/register").post(supplierRegister)
router.route("/login").post(supplierLogin)
router.route("/logout").get(logoutSupplier)
router.route("/forgetpassowrd").post(forgetPasswordLinkGenerator)
router.route("/addbenchemployee").post(fetchAccessToken,addBenchEmployee)
router.route("/updateskill").post(fetchAccessToken,updateSkills)
router.route("/createTicket").post(fetchAccessToken,createTicket)
router.route("/generateHrFinanceLogins").post(fetchAccessToken,createLogin)
router.route("/grantPermission").post(fetchAccessToken,grantPermission)
router.route("/revokePermission").post(fetchAccessToken,revokePermission)
router.route("/deleteLogin").delete(deleteLogin)
router.route("/addEducationToBenchEmployee").post(addEducationToBenchEmployee)
router.route("/addWorkExperienceToBenchEmployee").post(addWorkExperienceToBenchEmployee)
router.route("/updateAvailabilityTiming").post(updateAvailabilityTiming)
router.route("/updateLicenses").post(updateLicenses)
router.route("/updateCertifications").post(updateCertifications)
router.route("/updateCommunicationSkills").post(updateCommunicationSkills)
router.route("/toggleAvailabilityStatus").post(toggleAvailabilityStatus)
router.route("/updateEmployeeDetails").post(updateEmployeeDetails)
router.route("/createHolidayRequest").post(fetchAccessToken, createHolidayRequest)
router.route("/requestsForBenchEmployee").get(fetchAccessToken, requestsForBenchEmployee)
router.route("/rejectHiringRequest").post(rejectHiringRequest)
router.route("/assignBenchEmployeeToPost").post(assignBenchEmployeeToPost)
router.route("/createBill").post(fetchAccessToken, createBill)
router.route("/invoiceHistory").post(invoiceHistory)


export default router