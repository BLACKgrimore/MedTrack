import { Router } from "express";
import { ClientLogin, createHiringRequestTimesheet, createDailyLog, createLogin, createLoginForHiredEmployee, createTicket, deleteLogin, deleteLoginForHiredEmployee, grantPermission, loginHiredEmployee, logoutclient, revokePermission, viewEmployeeLoginCredentials, createRequirementPost, createProject, getLogsForProject, completeProject, addEmployeesToProject, testingApi, clientRegister, submitLogFeedback } from "../controllers/client.controller.js";
import { fetchAccessToken } from "../middlewares/auth.middleware.js";
import { acceptHiringRequest } from "../controllers/supplier.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/testingApi").get(testingApi)
router.route('/clientRegister').post(upload.fields
    ([
        { name: 'documents', maxCount: 10 },
        { name: 'companyLogo', maxCount: 1 },
    ])
    , clientRegister)
// router.route("/clientRegister").post(clientRegister)
router.route("/ClientLogin").post(ClientLogin)
router.route("/logoutclient").post(fetchAccessToken, logoutclient)
router.route("/createTicket").post(fetchAccessToken, createTicket)
router.route("/createLogin").post(fetchAccessToken, createLogin)
router.route("/deleteLogin").post(fetchAccessToken, deleteLogin)
router.route("/grantPermission").post(fetchAccessToken, grantPermission)
router.route("/revokePermission").post(fetchAccessToken, revokePermission)
router.route("/createLoginForHiredEmployee").post(fetchAccessToken, createLoginForHiredEmployee)
router.route("/deleteLoginForHiredEmployee").post(deleteLoginForHiredEmployee)
router.route("/viewEmployeeLoginCredentials").post(viewEmployeeLoginCredentials)
router.route("/loginHiredEmployee").post(loginHiredEmployee)
router.route("/createDailyLog").post(fetchAccessToken, createDailyLog)
router.route("/createHiringRequestTimesheet").post(fetchAccessToken, createHiringRequestTimesheet)
router.route("/acceptHiringRequest").post(acceptHiringRequest)
router.route("/createRequirementPost").post(fetchAccessToken, createRequirementPost)
router.route("/createProject").post(fetchAccessToken, createProject)
router.route("/addEmployeesToProject").post(fetchAccessToken, addEmployeesToProject)
router.route("/getLogsForProject").post(fetchAccessToken, getLogsForProject)
router.route("/completeProject").post(fetchAccessToken, completeProject)
router.route("/submitLogFeedback").post(fetchAccessToken, submitLogFeedback)

export default router