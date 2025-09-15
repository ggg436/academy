import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

type Props = {
	children: React.ReactNode;
};

const MainLayout = ({
	children,
}: Props) => {
	return (
		<div className="flex h-full">
			<Sidebar />
			<div className="flex flex-col h-full w-full lg:ml-[256px]">
				<MobileHeader />
				<main className="h-full pt-[50px] lg:pt-0">
					<div className="max-w-[1280px] mx-auto pt-6 h-full px-6">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
