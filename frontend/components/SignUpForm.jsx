"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import * as Yup from "yup";

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const SignUpSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username must be less than 50 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      )
      .required("Password is required"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    terms: false,
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      console.log("Form submitted with values:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ error: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex items-center justify-center p-4">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
            <h1 className="text-3xl font-medium mb-2">Get Started Now</h1>
            <p className="mb-6">
              Enter your credentials to access your account
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={signUpSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, status }) => (
                <Form className="space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium mb-1"
                    >
                      Username
                    </label>
                    <Field
                      name="username"
                      type="text"
                      className={`w-full px-3 py-2 border ${
                        touched.username && errors.username
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Enter your username"
                    />
                    {touched.username && errors.username && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.username}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={`w-full px-3 py-2 border ${
                        touched.email && errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Enter your email"
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="items-center relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-1"
                    >
                      Password
                    </label>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`w-full px-3 py-2 border ${
                        touched.password && errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {touched.password && errors.password && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="items-center relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium mb-1"
                    >
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`w-full px-3 py-2 border ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Field
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-2">
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the Terms & Policy
                      </label>
                      {touched.terms && errors.terms && (
                        <div className="text-red-500 text-sm">
                          {errors.terms}
                        </div>
                      )}
                    </div>
                  </div>

                  {status && status.error && (
                    <div className="text-red-500 text-sm">{status.error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#29296E] text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing up..." : "Sign up"}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="my-6 flex items-center justify-center">
              <span className="text-gray-500 text-sm">or</span>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <img src="/google.svg" alt="Google logo" className="w-5 h-5" />
              Sign in with Google
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Have an account?{" "}
              <Link
                href="/signin"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="hidden lg:block w-1/2 pl-12">
            <div className="w-full h-96 flex items-center justify-center">
              <img
                src="/illustration.svg"
                alt="Sign up illustration"
                className="max-w-full h-auto"
              />
            </div>
          </div>
    <div className=" min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full sm:max-w-md p-6 sm:p-8 rounded-lg ">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#29296E]">
          Get Started
        </h2>
        <p className="text-center text-black text-sm sm:text-base">
          Create your account
        </p>

        <form className="mt-6">
          <label htmlFor="text" className="text-black text-sm sm:text-base">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your name/nickname"
            className="w-full p-3 border border-black/40 rounded-lg mb-3 text-sm sm:text-base bg-transparent"
          />

          <label htmlFor="text" className="text-black text-sm sm:text-base">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            className="w-full p-3 border border-black/40 rounded-lg mb-3 text-sm sm:text-base bg-transparent"
          />

          <label htmlFor="email" className="text-black text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-black/40 rounded-lg mb-3 text-sm sm:text-base bg-transparent"
          />

          <label htmlFor="password" className="text-black text-sm sm:text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-black/40 rounded-lg mb-3 text-sm sm:text-base bg-transparent"
          />

          <label htmlFor="password" className="text-black text-sm sm:text-base">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="w-full p-3 border border-black/40 rounded-lg mb-3 text-sm sm:text-base bg-transparent"
          />

          <button
            type="submit"
            className="w-full bg-[#29296A] text-white p-3 rounded-full mt-6 sm:mt-8 text-sm sm:text-base"
          >
            Create Account
          </button>
        </form>

        <div className="text-center my-4 text-gray-500 text-sm sm:text-base">
          or
        </div>

        <button className="w-full flex items-center justify-center p-3 rounded-full bg-[#F2F2F4] mb-2 text-black font-semibold text-sm sm:text-base">
          <FcGoogle className="mr-2" /> Continue with Google
        </button>
        <button className="w-full flex items-center justify-center p-3 rounded-full bg-[#F2F2F4] text-black font-semibold text-sm sm:text-base">
          <FaApple className="mr-2 text-black" /> Continue with Apple
        </button>

        <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-600">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
}

