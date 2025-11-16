"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import i18n from "@/i18n";
import Swal from "sweetalert2";
import { checkSubscriber, addSubscriber } from "@/services/subscriberApi";

import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
} from "react-icons/fa";

export default function Footer() {
  const formik = useFormik({
    initialValues: { email: "" },

    validationSchema: Yup.object({
      email: Yup.string()
        .email(i18n.t("invalid_email") || "Invalid email")
        .required(i18n.t("required_email") || "Required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const exists = await checkSubscriber(values.email);

        if (exists.length > 0) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: i18n.t("email_exists") || "Already subscribed",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }

        await addSubscriber(values.email);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: i18n.t("email_success") || "Subscribed successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        resetForm();
      } catch (err) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: i18n.t("email_error") || "Something went wrong",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  });

  return (
    <footer className="bg-[var(--color-brown)] text-white">

      {/* Top white slim line */}
      <div className="w-full h-[20px] bg-white"></div>

      {/* Main container */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top row: email + socials */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-8">

          {/* Email Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex items-center gap-2 bg-white text-black rounded-xl px-1 py-1 shadow-sm"
          >
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              className="px-2 py-1 bg-transparent focus:outline-none w-[180px] md:w-[215px]"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-brown)] text-white rounded-lg text-sm"
            >
              {i18n.t("footer_subscribe") || "Subscribe"}
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-xl">
            <span className="text-base">
              {i18n.t("footer_contact") || "Contacts"}
            </span>

            <FaTwitter className="cursor-pointer hover:opacity-80" />
            <FaFacebookF className="cursor-pointer hover:opacity-80" />
            <FaGooglePlusG className="cursor-pointer hover:opacity-80" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white my-8"></div>

        {/* Bottom navigation row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

          <div className="flex flex-wrap gap-6">
            <span>About</span>
            <span>Our Strategy</span>
            <span>Our Advantages</span>
            <span>Social Responsibility</span>
            <span>Our Services</span>
          </div>

          <span className="opacity-80">© 2024. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
