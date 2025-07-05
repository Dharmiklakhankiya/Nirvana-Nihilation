import Header from "@/components/custom/Header";
import { UserButton } from "@clerk/clerk-react";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <div>
        <section className="z-50">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <a
              href="https://github.com/Dharmiklakhankiya"
              target="_blank"
              className="inline-flex justify-between items-center py-2 px-4 mb-7 text-sm text-white bg-gradient-to-r from-primary to-secondary rounded-full hover:bg-opacity-80 transition-all"
              role="alert"
            >
              <span className="text-sm font-semibold">Dharmik Lakhankiya</span>
            </a>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Build Your Resume <span className="text-primary">With AI</span>
            </h1>
            <p className="mb-8 text-lg font-medium text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Unleash Your Inner Legend and Obliterate Boring Resumes with Our
              AI-Powered Monster of a Builder
            </p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="/dashboard"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-semibold text-center text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 rounded-lg transition-all"
              >
                Get Started ⪼
              </a>
            </div>
          </div>
        </section>

        <section className="py-8 bg-gray-50 z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h2 className="font-bold text-3xl text-primary">How it Works?</h2>
          <h2 className="text-md text-gray-500">
            create amazing resumes in just a few clicks
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition-all hover:border-primary hover:shadow-lg">
              <AtomIcon className="h-8 w-8 text-primary" />
              <h2 className="mt-4 text-xl font-semibold text-black">
                Write Prompts for Your Form
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Create prompts that will drive your form's success.
              </p>
            </div>

            <div className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition-all hover:border-primary hover:shadow-lg">
              <Edit className="h-8 w-8 text-primary" />
              <h2 className="mt-4 text-xl font-semibold text-black">
                Edit Your Form
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Fine-tune your form's content and make it your own.
              </p>
            </div>

            <div className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition-all hover:border-primary hover:shadow-lg">
              <Share2 className="h-8 w-8 text-primary" />
              <h2 className="mt-4 text-xl font-semibold text-black">
                Share & Start Accepting Responses
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Share your form and gather the feedback you need.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="../auth/sign-in"
              className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition-all hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-400"
            >
              Get Started Today
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
