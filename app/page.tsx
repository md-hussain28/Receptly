// src/app/page.tsx
import ReceptlyStack from "@/components/hero/ReceptlyStack";

export default function Page() {
  return (
    <main className="px-4 md:px-6 pt-8 md:pt-12 pb-8 md:pb-16 max-w-7xl mx-auto w-full">
      <header className="text-center mb-6 md:mb-12 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-gray-900 leading-tight mb-3 md:mb-6 tracking-tight px-2">
          Collect Feedback,
          <br />
          Drive Improvements
        </h1>
        <p className="text-sm md:text-base lg:text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Create shareable feedback forms in minutes. Share a link and get insights instantly—no coding required.
        </p>
      </header>

      <ReceptlyStack />
    </main>
  );
}
