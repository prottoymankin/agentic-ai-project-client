"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const UserLoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const { email, password } = formData;

            // Simple client-side validation
            if (!email || !password) {
                setError("Please fill in all fields.");
                setLoading(false);
                return;
            }

            const { data, error: signInError } = await authClient.signIn.email({
                email,
                password,
            });

            if (signInError) {
                setError(signInError.message || "Invalid email or password. Please try again.");
            } else {
                setSuccess(true);
                // Redirect user to homepage "/"
                router.push("/");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                {/* Main Heading */}
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    Welcome back
                </h1>
                {/* Subheading */}
                <p className="mt-2 text-sm text-slate-600">
                    Sign in to your account to continue
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 border border-slate-200 shadow-md sm:rounded-2xl sm:px-10">
                    {/* Error display */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium animate-pulse">
                            {error}
                        </div>
                    )}
                    
                    {/* Success display */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center font-medium">
                            Successfully signed in! Redirecting...
                        </div>
                    )}

                    <form onSubmit={handleOnSubmit} className="space-y-6">
                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                    placeholder="you@example.com"
                                    className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition duration-150 ease-in-out text-slate-900 bg-white"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    placeholder="••••••••"
                                    className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition duration-150 ease-in-out text-slate-900 bg-white"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* New user text & redirect link to Register */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600">
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="font-medium text-blue-600 hover:text-blue-700 transition duration-150 ease-in-out"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLoginPage;