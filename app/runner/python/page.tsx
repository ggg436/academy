import dynamic from "next/dynamic";

const PyRunner = dynamic(() => import("@/components/py-runner"), { ssr: false });

export default function PythonRunnerPage() {
  return <PyRunner />;
} 