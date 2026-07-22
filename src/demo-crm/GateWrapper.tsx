import { useState } from "react";
import DemoGate from "../demo-saas/DemoGate";
import { getDemoSessionId, isDemoUnlocked, lockDemo } from "../demo-saas/useDemoSession";
import SingleModuleShell from "../product/SingleModuleShell";
import PipelineVentas from "../product/pages/crm/PipelineVentas";

export default function DemoCrmGateWrapper() {
  const [unlocked, setUnlocked] = useState(isDemoUnlocked());

  if (!unlocked) {
    return (
      <DemoGate
        title="Demo CRM"
        subtitle="Vista previa para prospectos"
        onUnlock={() => setUnlocked(true)}
      />
    );
  }

  return (
    <SingleModuleShell
      companyLabel="Empresa Demo"
      moduleLabel="Pipeline de Ventas"
      onExit={() => {
        lockDemo();
        setUnlocked(false);
      }}
    >
      <PipelineVentas scopeId={getDemoSessionId()} />
    </SingleModuleShell>
  );
}
