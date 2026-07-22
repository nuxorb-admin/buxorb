import { useState } from "react";
import ProductLayout from "../product/ProductLayout";
import DemoGate from "./DemoGate";
import { getDemoSessionId, isDemoUnlocked, lockDemo } from "./useDemoSession";

export default function DemoGateWrapper() {
  const [unlocked, setUnlocked] = useState(isDemoUnlocked());

  if (!unlocked) {
    return <DemoGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <ProductLayout
      title="Empresa Demo"
      scopeId={getDemoSessionId()}
      onExit={() => {
        lockDemo();
        setUnlocked(false);
      }}
    />
  );
}
