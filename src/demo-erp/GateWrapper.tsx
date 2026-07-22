import { useState } from "react";
import DemoGate from "../demo-saas/DemoGate";
import { getDemoSessionId, isDemoUnlocked, lockDemo } from "../demo-saas/useDemoSession";
import SingleModuleShell from "../product/SingleModuleShell";
import Inventario from "../product/pages/erp/Inventario";

export default function DemoErpGateWrapper() {
  const [unlocked, setUnlocked] = useState(isDemoUnlocked());

  if (!unlocked) {
    return (
      <DemoGate
        title="Demo ERP"
        subtitle="Vista previa para prospectos"
        onUnlock={() => setUnlocked(true)}
      />
    );
  }

  return (
    <SingleModuleShell
      companyLabel="Empresa Demo"
      moduleLabel="Inventario"
      onExit={() => {
        lockDemo();
        setUnlocked(false);
      }}
    >
      <Inventario scopeId={getDemoSessionId()} />
    </SingleModuleShell>
  );
}
