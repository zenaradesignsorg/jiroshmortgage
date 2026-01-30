import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analytics from "@/components/Analytics";
import GoogleVerification from "@/components/GoogleVerification";
import ErrorBoundary from "@/components/ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <GoogleVerification />
    <Toaster />
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
