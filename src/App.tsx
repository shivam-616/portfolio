import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { site } from "./data/site";

export default function App() {
  return (
    <BrowserRouter>
      <title>{site.tagline}</title>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/p/:slug" element={<PostPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
