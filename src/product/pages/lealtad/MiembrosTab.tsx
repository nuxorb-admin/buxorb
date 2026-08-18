import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { supabase } from "../../../lib/supabase";
import type { LoyaltyMember, LoyaltyProgram } from "../../../lib/database.types";
import Modal from "../../../admin/components/Modal";

export default function MiembrosTab({
  program,
  members,
  reload,
}: {
  program: LoyaltyProgram;
  members: LoyaltyMember[];
  reload: () => void;
}) {
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const filtered = search.trim() ? members.filter((m) => m.phone.includes(search.trim())) : members;

  async function agregarSello(member: LoyaltyMember) {
    setAdding(member.id);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("loyalty-add-stamp", {
      body: { member_id: member.id },
    });
    setAdding(null);
    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? "No se pudo agregar el sello");
      return null;
    }
    reload();
    return data.stamps as number;
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted">
          Miembros ({members.length})
        </h3>
        <button onClick={() => setScanning(true)} className="btn btn-primary px-3 py-1.5 text-[0.62rem]">
          Escanear QR
        </button>
      </div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por teléfono…"
        className="mb-3 w-full max-w-sm border border-ink/15 bg-sand-2 px-3 py-2 font-sans text-sm text-ink focus:border-teal focus:outline-none"
      />
      {error && <div className="mb-3 border border-orange/40 bg-orange/10 px-3 py-2 font-mono text-[0.68rem] text-orange">{error}</div>}

      {filtered.length === 0 ? (
        <p className="font-mono text-[0.68rem] text-muted">Sin resultados.</p>
      ) : (
        <div className="divide-y divide-ink/10 border border-ink/10 bg-white">
          {filtered.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <span className="text-sm text-ink">{m.name}</span>
                <p className="mt-0.5 font-mono text-[0.6rem] text-muted">{m.phone}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-[0.68rem] font-bold text-teal">
                  {m.stamps}/{program.stamps_required}
                </span>
                <button
                  onClick={() => agregarSello(m)}
                  disabled={adding === m.id}
                  className="btn btn-primary px-3 py-1.5 text-[0.62rem]"
                >
                  {adding === m.id ? "…" : "+1 sello"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {scanning && (
        <ScannerModal
          members={members}
          stampsRequired={program.stamps_required}
          onAddStamp={agregarSello}
          onClose={() => setScanning(false)}
        />
      )}
    </div>
  );
}

function ScannerModal({
  members,
  stampsRequired,
  onAddStamp,
  onClose,
}: {
  members: LoyaltyMember[];
  stampsRequired: number;
  onAddStamp: (member: LoyaltyMember) => Promise<number | null>;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [result, setResult] = useState<{ name: string; stamps: number } | { notFound: true } | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    function tick() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!pausedRef.current && video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code?.data) {
            handleScanned(code.data);
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        rafRef.current = requestAnimationFrame(tick);
      } catch {
        setCameraError("No se pudo acceder a la cámara — revisa los permisos del navegador.");
      }
    }

    async function handleScanned(memberId: string) {
      pausedRef.current = true;
      const member = members.find((m) => m.id === memberId);
      if (!member) {
        setResult({ notFound: true });
      } else {
        const stamps = await onAddStamp(member);
        setResult(stamps === null ? { notFound: true } : { name: member.name, stamps });
      }
      setTimeout(() => {
        setResult(null);
        pausedRef.current = false;
      }, 2200);
    }

    start();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);

  return (
    <Modal title="Escanear QR" onClose={onClose}>
      {cameraError ? (
        <p className="font-mono text-[0.68rem] text-orange">{cameraError}</p>
      ) : (
        <div className="relative">
          <video ref={videoRef} muted playsInline className="w-full bg-ink" />
          <canvas ref={canvasRef} className="hidden" />
          {result && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/85 px-4 text-center">
              {"notFound" in result ? (
                <p className="font-mono text-sm text-orange">QR no reconocido — no corresponde a ningún miembro.</p>
              ) : (
                <p className="font-mono text-sm text-white">
                  + 1 sello — {result.name}
                  <br />
                  {result.stamps}/{stampsRequired}
                </p>
              )}
            </div>
          )}
        </div>
      )}
      <p className="mt-3 font-mono text-[0.6rem] text-muted">Apunta la cámara al QR de la tarjeta del cliente.</p>
    </Modal>
  );
}
