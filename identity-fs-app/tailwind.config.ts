/*
Layout is built using a six column grid. The width of the body is 1130 px. The full width is 
1920 px. Each of the six columns measure 176 px. A double column measures 368 px.
Field boxes are 54px high as are most buttons, unless otherwise indicated.
*.


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /row-span-./,
    },
  ],
  theme: {
    extend: {
      screens: {
        lg: "1136px",
      },
      width: {
        15: "3.75rem",
        35: "8.75rem",
        284: "71rem",
        col: (1136 - 7 * 24) / 6, // one column
      },
      height: {
        15: "3.75rem",
        35: "8.75rem",
        38: "9.5rem",
        42.5: "10.625rem",
        67.5: "16.875rem",
      },
      flexGrow: {
        2: 2,
      },
      // backgroundImage: {},
      colors: {
        "base-100": "#f5f5f5",
        "base-200": "#e8e8e8",
        "grey-1": "#ebebeb",
        "grey-2": "#dddddd",
        "grey-3": "#707070",
        "blue-1": "#0077ae",
        "blue-2": "#006982",
        "blue-3": "#64c1c7",
        "stone-1": "#292524",
        "navy-1": "#5989bc",
        "navy-2": "#2e5a88",
        "header-blue": "#002639",
        "header-green": "#227764",
        "green-1": "#87b625",
        "green-2": "#265f31",
        "green-3": "#38B297",
        "red-1": "#c74808",
        "yellow-1": "#fbbd00",
      },
      fontFamily: {
        sans: ["proxima-nova"],
      },
      lineHeight: {
        5.5: "1.375rem",
      },
      margin: {
        5.5: "1.375rem",
      },
      padding: {
        5.5: "1.375rem",
        "btn-sm": "0px",
      },
      gap: {
        gutter: "16px",
        "section-gutter": "8px",
        "1px": "1px",
      },
      sectionPadding: {
        18: "4.5rem",
        "section-gutter-x": "24px",
        "section-gutter-y": "40px",
      },
      backGroundSize: {
        section: "200px",
      },
      backgroundImage: {
        "pm-support": "url('/img/svg/pm-support.svg')",
        "sp-reduce": "url('/img/svg/sp-reduce.svg')",
        "pp-avoid": "url('/img/svg/pp-avoid.svg')",
        groups: "url('/img/svg/group-create.svg')",
        reports: "url('/img/svg/report-icon-header.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        erc: {
          primary: "#87b625",
          navy: "#2e5a88",
          neutral: "#0077ae",
          "neutral-content": "#002639",
          secondary: "#c74808",
          accent: "#fbbd00",
          "base-100": "#f5f5f5",
          info: "#64c1c7",
          error: "#B85023",
          stone: " #292524",
          darkBlue: "#002639",
          grey: "#707070",
          ".input:focus": {
            "outline-offset": "0px",
          },
          ".textarea:focus": {
            "outline-offset": "0px",
          },
          ".form-control": {
            "margin-top": "18px",
          },
          ".select": {
            "background-image": "url(/img/svg/down_blue.svg)",
            "background-size": "30px, 30px, 30px, 30px",
            "background-position": "right 5px top 18px",
          },
          ".select:focus": {
            "outline-offset": "0px",
          },
          ".tooltip::before": {
            zIndex: 1,
            textAlign: "left",
            fontSize: 16,
          },
          ".steps .step::after": {
            height: 25,
            width: 25,
          },
          ".steps .step::before": {
            height: 11,
          },
          ".steps .step": {
            minWidth: 120,
          },
          ".breadcrumbs > ul > li + ::before": {
            marginLeft: 5,
            marginRight: 7,
          },
          ".btn": {
            color: "white",
          },
          ".text-sm": {
            "font-size": "1rem",
            "line-height": "1.125rem",
          },
          ".text-2xs": {
            "font-size": "0.625rem",
            "line-height": "1rem",
          },
          ".text-3xs": {
            "font-size": "0.5rem",
            "line-height": "1rem",
          },
          ".control-form": {
            "margin-top": "13px",
          },
          ".tooltip-top-right::before": {
            // push down right info box when used at the top of a dialog
            transform: "translateY(-25px)",
          },

          "--rounded-box": "0", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "default", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "0", // border width of tabs
          "--tab-radius": "0", // border radius of tabs
        },
      },
    ],
    logs: false,
  },
};
