import React from "react";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout/Layout.jsx";

const HomePage = () => {
  return (

<Layout>

    <div className="min-h-screen ">
    

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Manage Your Finances <br /> Effortlessly
          </h1>
          <p className="text-gray-700 mb-8">
            Track your income and expenses, analyze spending habits, and take full control of your financial health with our intuitive platform.
          </p>
          <a
            href="/dashboard"
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-sm shadow hover:bg-red-700 transition"
          >
            Get Started
          </a>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/014/849/631/non_2x/finance-accounting-illustration-concept-on-white-background-vector.jpg"
            alt="Finance Illustration"
            className="w-80 md:w-[28rem]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
          Why Choose ExpenseTracker?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 bg-gray-50 rounded-sm shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Budgeting</h3>
            <p className="text-gray-700 text-sm">
              Manage your daily expenses and income in a simple and organized way.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-sm shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Insights</h3>
            <p className="text-gray-700 text-sm">
              Analyze your spending patterns and get actionable insights to save more.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-sm shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-700 text-sm">
              Your data is encrypted and safe, ensuring privacy and security at all times.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-red-600 py-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to take control of your finances?
        </h2>
        <p className="mb-6">
          Join thousands of users managing their money smarter with ExpenseTracker.
        </p>
        <a
          href="/register"
          className="px-6 py-3 bg-white text-red-600 font-semibold rounded-sm shadow hover:bg-gray-100 transition"
        >
          Create Account
        </a>
      </section>
    </div>  
</Layout>
  );
};

export default HomePage;
