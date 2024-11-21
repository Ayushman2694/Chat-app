/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { Eye, EyeOff, KeyRound, Link, Loader2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';


function Settings() {
  const navigate = useNavigate()
  const [showOldPassword,setShowOldPassword] = useState(false)
  const [showNewPassword,setShowNewPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const {isChangingPassword,changePassword,authUser}=useAuthStore()
  const [formData,setFormData]=useState({
    email:authUser.email,
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
  })
  const validateForm = () => {
    if (!formData.oldPassword.trim()) return toast.error("Current password is required");
    if (!formData.newPassword.trim()) return toast.error("New password is required");
    if (!formData.confirmPassword.trim()) return toast.error("Confirm password is required");
    if (formData.newPassword!=formData.confirmPassword) return toast.error("Confirm password doesn't match");
    if (formData.newPassword===formData.oldPassword) return toast.error("New password can not be same as current password");
    if (formData.newPassword.length < 8) return toast.error("Password must be at least 8 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      changePassword(formData)
      navigate("/")
    }
    setFormData({
      oldPassword:"",
      newPassword:"",
      confirmPassword:""
    })

  };
  return (
    <div className="h-screen bg-slate-700 flex flex-col ">
    <Navbar />
    <div className="">
   
      <div className="flex flex-col justify-center items-center p-6 sm:px-12">
        <div className="w-full max-w-md space-y-8 ">
          <div className="text-center mb-8 ">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <KeyRound className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Change Password</h1>
              
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-4">
          <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Current Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showOldPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter current password"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye
                     className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">New Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye
                     className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye
                     className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isChangingPassword}>
              {isChangingPassword ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
      </div>
      </div>
  )
  }



export default Settings;