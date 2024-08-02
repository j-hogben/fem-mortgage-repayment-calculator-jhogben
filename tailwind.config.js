/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      screens: {
        tablet: "768px",
        md: "900px",
      },
      fontFamily: {
        body: "PlusJakartaSans",
      },
      colors: {
        limeBright: "#D8DB2F",
        limePale: "#F9FAE0",
        limeButtonHover: "#EBED97",
        bluePale: "rgba(154, 190, 213, 25%)",
        errorRed: "#D73328",
        slate900: "#133041",
        slate700: "#4E6E7E",
        slate500: "#6B94A8",
        slate300: "#9ABED5",
        slate100: "#E4F4FD",
        overlay: "rgba(0, 0, 0, 25%)",
      },
      fontSize: {
        preset1: "3.5rem" /* 56px */,
        preset1mob: "2.5rem" /* 40px */,
        preset2: "1.5rem" /* 24px */,
        preset3: "1.125rem" /* 18px */,
        preset4: "1rem" /* 16px */,
        preset5: "0.875rem" /* 14px */,
      },
      lineHeight: {
        preset1: "125%",
        preset2: "125%",
        preset3: "125%",
        preset4: "150%",
        preset5: "150%",
      },
      letterSpacing: {
        preset1: "-1px",
        preset2: "-1px",
        preset3: "-1px",
      },
      spacing: {
        100: "0.5rem" /* 8px */,
        150: "0.75rem" /* 12px */,
        175: "0.78125rem" /* 12.5px */,
        200: "1rem" /* 16px */,
        250: "1.140625rem" /* 18.25px */,
        300: "1.5rem" /* 24px */,
        400: "2rem" /* 32px */,
        500: "2.5rem" /* 40px */,
      },
      maxWidth: {
        card: "63rem",
      },
      borderRadius: {
        cardSection: "5rem",
      },
      boxShadow: {
        resultsTop: "inset 0 4px #000",
      },
    },
  },
  plugins: [],
};
