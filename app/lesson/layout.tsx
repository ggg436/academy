import { ChallengesSidebar } from "@/components/challenges-sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { getUserProgress } from "@/actions/user-progress";
import { SidebarWrapper } from "./SidebarWrapper";

type Props = {
  children: React.ReactNode;
};

const LessonLayout = async ({ children }: Props) => {
  const userProgress = await getUserProgress();
  const courseId = userProgress?.activeCourseId || "";
  return ( 
    <div className="flex h-full">
      <SidebarWrapper courseId={courseId} />
      <div className="flex flex-col h-full w-full lg:ml-[256px]">
        <MobileHeader />
        {children}
      </div>
    </div>
  );
};
 
export default LessonLayout;
