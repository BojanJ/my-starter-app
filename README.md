# React Pro Starter

A professional, feature-rich, and highly scalable starter template for building modern web applications with React, Vite, and TypeScript. This template is designed to provide a solid foundation for your next project, with a focus on developer experience, performance, and best practices.

## ✨ Features

- **⚡️ Next-gen Frontend Tooling**: Built with [Vite](https://vitejs.dev/) for a lightning-fast development experience.
- **🛡️ Full TypeScript Support**: End-to-end type safety for robust and maintainable code.
- **🎨 Modern UI with Shadcn/ui**: A collection of beautifully designed, accessible, and customizable components.
- **💅 Themed with Tailwind CSS**: A utility-first CSS framework for rapid UI development, with dark/light mode support.
- **🌐 Internationalization (i18n)**: Ready-to-use setup with `i18next` and `react-i18next`.
- **💻 State Management with TanStack Query**: Powerful asynchronous state management for fetching, caching, and updating data.
- **💾 Offline Caching**: Persistent caching of query data with `@tanstack/query-sync-storage-persister`.
- **📱 PWA Ready**: Configured as a Progressive Web App with `vite-plugin-pwa`, including offline support and update notifications.
- **✅ Code Quality Tools**: Pre-configured with ESLint and Prettier for consistent code style and quality.
- **🗂️ Logical Folder Structure**: A clean and scalable project structure to organize your code effectively.
- **🔒 Environment Variables**: Easy management of environment-specific configurations.
- ** gracefully Error Handling**: React Error Boundaries to catch and handle UI errors.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [pnpm](https://pnpm.io/installation) (recommended) or npm/yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/react-pro-starter.git
    cd react-pro-starter
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    or
    ```bash
    npm install
    ```

## 📜 Available Scripts

In the project directory, you can run:

- `pnpm dev`: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
- `pnpm build`: Builds the app for production to the `dist` folder.
- `pnpm preview`: Serves the production build locally for inspection.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm format`: Formats the codebase using Prettier.

## 🗂️ Folder Structure

The project follows a logical and scalable folder structure:

```
src/
├── api/           # API hooks, services (e.g., Axios instance)
├── components/    # Reusable UI components
│   ├── ui/        # Shadcn generated components
│   └── common/    # Custom common components (e.g., ErrorBoundary)
├── hooks/         # Custom React hooks
├── layouts/       # Common page layouts
├── locales/       # i18n translation files
├── pages/         # Top-level page components (e.g., Home, About)
├── utils/         # Utility functions
├── styles/        # Global styles, Tailwind custom CSS
├── types/         # TypeScript type definitions
├── App.tsx        # Main App component and router setup
├── main.tsx       # Entry point of the application
├── queryClient.ts # Tanstack Query client setup
├── i18n.ts        # i18n configuration
└── vite-env.d.ts  # Vite env types
```

## 🎨 Customization

### Theming

The project uses Tailwind CSS for styling. You can customize the theme by editing `tailwind.config.js` and `src/index.css`. Dark mode is enabled by default and can be toggled using the theme switcher component.

### Components

Shadcn/ui components are located in `src/components/ui`. You can add new components using the Shadcn CLI. Custom, application-specific components should be placed in `src/components/common`.

### Internationalization (i18n)

Translation files are located in `src/locales`. The configuration is in `src/i18n.ts`. To add a new language, create a new folder with the language code (e.g., `fr`) and add a `translation.json` file.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/BojanJ/my-starter-app/issues).

## 📄 License

This project is licensed under the MIT License.
