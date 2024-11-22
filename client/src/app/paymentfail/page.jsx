"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { XCircle, RefreshCw, HelpCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function page() {
  const [errorCode, setErrorCode] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Simulating an error code fetch
    setErrorCode("ERR_PAYMENT_DECLINED")
  }, [])

  const handeBooking = () => {
    router.push("/booking")
  }
  const handelUserProfile = () => {
    router.push("/UserProfile")
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <XCircle className="w-20 h-20 text-red-500 mx-auto" />
          </motion.div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Payment Failed
          </h2>
          <p className="mt-2 text-gray-600">
            We're sorry, but your payment could not be processed.
          </p>
        </div>

        <div className="mt-8 bg-red-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Error Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Error Code:</span>
              <span className="font-medium">{errorCode}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handelUserProfile}
            className="w-full flex items-center justify-center bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again After Some Time
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handeBooking}
            className="w-full flex items-center justify-center bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Book Trip
          </motion.button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <h4 className="font-semibold mb-2">
            Common reasons for payment failure:
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Insufficient funds in the account</li>
            <li>Incorrect card information</li>
            <li>Transaction flagged as suspicious by the bank</li>
            <li>Expired card</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
