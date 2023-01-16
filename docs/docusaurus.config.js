// @ts-check

const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native Avoid SoftInput',
  tagline: 'Native solution for common React Native problem of focused views being covered by soft input view.',
  url: 'https://mateusz1913.github.io',
  baseUrl: '/react-native-avoid-softinput/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'mateusz1913',
  projectName: 'react-native-avoid-softinput',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        title: 'React Native Avoid SoftInput',
        logo: {
          alt: 'React Native Avoid SoftInput Logo',
          src: 'img/AppIconTransparent.png',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'left',
          },
          {
            label: 'Docs',
            to: '/docs/guides',
            position: 'left',
          },
          {
            href: 'https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/packages/mobile',
            label: 'Example App',
            position: 'left',
          },
          {
            href: 'https://github.com/mateusz1913/react-native-avoid-softinput',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/mateusz1913',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/mateusz1913',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mateusz Mędrek. Built with Docusaurus`,
      },
      prism: {
        additionalLanguages: [ 'swift', 'java', 'kotlin' ],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
};

module.exports = config;
