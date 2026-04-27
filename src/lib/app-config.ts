export type NavItem = {
  title: string;
  url: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type AppConfig = {
  name: string;
  version: string;
  navMain: NavGroup[];
};

export const appConfig: AppConfig = {
  name: 'CX Kit (Beta)',
  version: 'v0.1.0-beta.1',
  navMain: [
    {
      title: 'Utilities',
      items: [
        {
          title: 'JSON to Dynamic Converter',
          url: '/utilities/json-dynamic-converter',
        },
      ],
    },
  ],
};
