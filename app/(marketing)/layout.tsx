import { getCourses } from "@/actions/courses";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = async ({ children }: Props) => {
  const courses = await getCourses();

  return (
    <div className="min-h-screen flex flex-col">
      <Header courses={courses} />
      <main className="flex-1 flex flex-col pt-20">
        {children}
      </main>
    </div>
  );
};

export default MarketingLayout;
