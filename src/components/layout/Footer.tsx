"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import i18n from "@/i18n";
import Swal from "sweetalert2";
import { checkSubscriber, addSubscriber } from "@/services/subscriberApi";
import { FaTwitter, FaFacebookF, FaGooglePlusG } from "react-icons/fa";

export default function Footer() {
  const lang = useSelector((state: RootState) => state.language.lang);
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  const t = (key: string) => i18n.t(key, { lng: currentLang });

  const formik = useFormik({
    initialValues: { email: "" },

    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("invalid_email"))
        .required(t("required_email")),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const exists = await checkSubscriber(values.email);

        if (exists.length > 0) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: t("email_exists"),
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
          title: t("email_success"),
          showConfirmButton: false,
          timer: 2000,
        });

        resetForm();
      } catch {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("email_error"),
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  });

  return (
    <footer className="bg-[var(--color-brown-dark)] text-white">

      <div className="w-full h-[20px] bg-white"></div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-end items-center gap-8">

          <form
            onSubmit={formik.handleSubmit}
            className="flex items-center gap-2 bg-white text-black rounded-xl px-1 py-1 shadow-sm"
          >
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder={t("footer_email_placeholder")}
              className="px-2 py-1 bg-transparent focus:outline-none w-[180px] md:w-[215px]"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-brown-dark)] text-white rounded-lg text-sm"
            >
              {t("footer_subscribe")}
            </button>
          </form>

          <div className="flex items-center gap-5 text-xl">
            <span className="text-base">{t("footer_contact")}</span>

            <FaTwitter className="cursor-pointer hover:opacity-80" />
            <FaFacebookF className="cursor-pointer hover:opacity-80" />
            <FaGooglePlusG className="cursor-pointer hover:opacity-80" />
          </div>
        </div>

        <div className="w-full border-t border-white my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

          <div className="flex flex-wrap gap-6">
            <span>{t("footer_about")}</span>
            <span>{t("footer_strategy")}</span>
            <span>{t("footer_advantages")}</span>
            <span>{t("footer_social")}</span>
            <span>{t("footer_services")}</span>
          </div>

          <span className="opacity-80">© 2024. {t("footer_rights")}</span>
        </div>
      </div>
    </footer>
  );
}

