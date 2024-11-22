"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Download, Home, RefreshCcw } from "lucide-react"
import confetti from "canvas-confetti"
import { useRouter } from "next/navigation"

export default function page() {
  const [showConfetti, setShowConfetti] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [showConfetti])

  const hadleHomeClick = () => {
    router.push("/")
  }
  const handelUserProfile = () => {
    router.push("/UserProfile")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
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
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </motion.div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Payment Successful!
          </h2>
          <p className="mt-2 text-gray-600">
            Your transaction has been processed successfully.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handelUserProfile}
            className="flex items-center justify-center bg-green-500 text-gray-100 hover:text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Back to Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={hadleHomeClick}
            className="flex items-center justify-center bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
