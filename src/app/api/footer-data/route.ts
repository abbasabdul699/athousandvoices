import { NextResponse } from "next/server";

const footerData = {
    brand: {
        name: "A Thousand Voices",
        tagline: "Empowering Afghans and the diaspora. Let's create something amazing together. #ProjectforPeace",
        website: "www.athousandvoices.com",
        socialLinks: [
          /*   {
                icon: "/images/home/footerSocialIcon/twitter.svg",
                dark_icon: "/images/home/footerSocialIcon/twitter_dark.svg",
                link: "https://twitter.com"
            }, */
            {
                icon: "/images/logo/linkedin.svg",
                dark_icon: "/images/logo/linkedin.svg",
                link: "https://www.linkedin.com/company/athousand-voices/"
            },
            /* {
                icon: "/images/home/footerSocialIcon/dribble.svg",
                dark_icon: "/images/home/footerSocialIcon/dribble_dark.svg",
                link: "https://dribbble.com"
            }, */
            {
                icon: "/images/logo/instagram.svg",
                dark_icon: "/images/logo/instagram.svg",
                link: "https://www.instagram.com/athousand.voices/"
            }
        ]
    },
    sitemap: {
        name: "Quick Links",
        links: [
            { name: "Contact us", url: "/contact" },
            { name: "About us", url: "/about" },
            { name: "Become a Mentor", url: "/ambassador" },
            { name: "Timeline", url: "/#timeline" }
        ]
    },
    otherPages: {
        name: "Other Pages",
        links: [
            //{ name: "Error 404", url: "/not-found" },
            { name: "Terms & Conditions", url: "/terms-and-conditions" },
            { name: "Privacy Policy", url: "/privacy-policy" },
            //{ name: "Documentation", url: "/documentation" }
        ]
    },
    contactDetails: {
        name:"Contact Details",
        address: "New York, NY",
        email: "admin@athousandvoices.com",
    },
    copyright: "©2025 A Thousand Voices. All Rights Reserved"
};

export const GET = async () => {
  return NextResponse.json({
    footerData
  });
};