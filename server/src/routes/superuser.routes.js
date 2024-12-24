import { Router } from "express";
import { acceptSupplierRegisteration, createLogin, getTickets, rejectSupplierRegisteration, supplierRegisteration, totalBenchEmployees, totalClients, totalSuppliers, updateTicketStatus, userLogin } from "../controllers/superuser.controller.js";
import { fetchAccessToken } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/login").post(userLogin)
router.route("/createLogin").post(fetchAccessToken, createLogin)
router.route("/totalBenchEmployees").get(totalBenchEmployees)
router.route("/totalClients").get(totalClients)
router.route("/totalSuppliers").get(totalSuppliers)
router.route("/supplierRegisteration").get(supplierRegisteration)
router.route("/acceptSupplierRegisteration").post(acceptSupplierRegisteration)
router.route("/rejectSupplierRegisteration").post(rejectSupplierRegisteration)
router.route("/getTickets").get(getTickets)
router.route("/updateTicketStatus").post(updateTicketStatus)


export default router