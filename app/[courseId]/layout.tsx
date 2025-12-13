import { ChallengesSidebar } from "@/components/challenges-sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { SidebarWrapper } from "./SidebarWrapper";

type Props = {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
};

const LessonLayout = async ({ children, params }: Props) => {
  const courseId = params.courseId || "";
  return ( 
    <div className="flex h-full">
      <SidebarWrapper courseId={courseId} />
      <div className="flex flex-col h-full w-full lg:ml-[280px]">
        <MobileHeader />
        {children}
      </div>
    </div>
  );
};
 
export default LessonLayout;
