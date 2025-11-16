"use client";

import Image from "next/image";
import { FaEnvelope, FaLinkedin, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function TeamCard({ member }: { member: any }) {
    return (
        <div className="text-center">
            <div className="w-full h-[260px] mb-4">
                <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo}`}
                    alt={member.name}
                    width={340}
                    height={260}
                    className="object-cover w-full h-full rounded-lg"
                    unoptimized
                />
            </div>

            <h3 className="text-xl font-semibold text-[var(--color-brown-dark)]">
                {member.name}
            </h3>

            <p className="text-sm text-gray-600 mt-1 uppercase tracking-wide">
                {member.position}
            </p>

            <div className="flex justify-center gap-4 mt-4 text-black text-lg">
                {member.whatsapp && (
                    <a href={member.whatsapp} target="_blank">
                        <FaWhatsapp />
                    </a>
                )}
                {member.phone && (
                    <a href={`tel:${member.phone}`}>
                        <FaPhoneAlt />
                    </a>
                )}
                {member.email && (
                    <a href={`mailto:${member.email}`}>
                        <FaEnvelope />
                    </a>
                )}
                {member.linkedin && (
                    <a href={member.linkedin} target="_blank">
                        <FaLinkedin />
                    </a>
                )}
            </div>
        </div>
    );
}

