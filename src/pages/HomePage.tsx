import React from "react";
import appConfig from "@/config/app.config";
import PostList from "@/components/PostList"; // Import the PostList component

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        {appConfig.appDescription}
      </p>
      <section className="mt-12">
        <PostList /> {/* Render the PostList component here */}
      </section>
    </div>
  );
};

export default HomePage;
