import {Skills} from "@/features/Skills";


// app/skills/page.tsx

export const metadata = {
  title: "Skills | Parham Portfolio",
  description: "Check out my frontend and backend skills, tools, and technologies.",
};

export default function SkillsPage() {
  return (
    <main>
      <Skills />
    </main>
  );
}
