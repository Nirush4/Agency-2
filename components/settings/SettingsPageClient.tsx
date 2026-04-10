"use client";

import Link from "next/link";

export default function SettingsPageClient() {
  return (
    <div className="flex flex-col p-5 gap-2.5">
      <div className="flex">
        <span className="inline-block rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white">
          Avatar
        </span>
        <div className="ml-4">
          <h1 className="text-2xl font-bold ">UserName</h1>
          <p className="text-2xl font-bold">bob@gmail.com</p>
        </div>
      </div>

      <section className="rounded-xl bg-[#dce3bf] p-4">
        <h2 className="text-lg font-semibold text-black">Account Settings</h2>
        <p className="pt-2 text-sm text-gray-700">
          Update your account information and security settings here.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <Link href="/create" className="text-blue-500 hover:underline">
            Create Post
          </Link>

          <Link
            href="/account-settings"
            className="text-blue-500 hover:underline"
          >
            Manage Account Settings
          </Link>

          <Link
            href="/account-settings"
            className="text-blue-500 hover:underline"
          >
            Password & Security
          </Link>

          <Link
            href="/account-settings"
            className="text-blue-500 hover:underline"
          >
            Notifications
          </Link>

          <Link href="/about-us" className="text-blue-500 hover:underline">
            Logout
          </Link>
        </div>
      </section>

      <section className="rounded-xl bg-[#dce3bf] p-4">
        <h2 className="text-lg font-semibold text-black">User Preferences</h2>
        <p className="pt-2 text-sm text-gray-700">
          Here you can manage your user preferences and settings.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <Link href="/about-us" className="text-blue-500 hover:underline">
            About Us
          </Link>

          <Link href="/about-us" className="text-blue-500 hover:underline">
            Theme
          </Link>

          <Link href="/about-us" className="text-blue-500 hover:underline">
            Allergies
          </Link>

          <Link href="/about-us" className="text-blue-500 hover:underline">
            Diet Preferences
          </Link>

          <Link href="/about-us" className="text-blue-500 hover:underline">
            Calorie Goals
          </Link>

          <Link href="/about-us" className="text-blue-500 hover:underline">
            Units
          </Link>
        </div>
      </section>

      <section className="rounded-xl bg-[#dce3bf] p-4">
        <h2 className="text-lg font-semibold text-black">Support Settings</h2>
        <p className="pt-2 text-sm text-gray-700">
          Need help? Access support resources and contact information here.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <Link
            href="/account-settings"
            className="text-blue-500 hover:underline"
          >
            Help & Support
          </Link>

          <Link
            href="/account-settings"
            className="text-blue-500 hover:underline"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
