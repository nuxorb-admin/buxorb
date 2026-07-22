import { useState, type FormEvent } from "react";
import Asterisk from "../ui/Asterisk";
import { supabase } from "../../lib/supabase";

const serviceOptions = [
  "Tesorería",
  "Compras y Proveedores",
  "Gestión de Personal",
  "Ventas y CxC",
  "Aún no lo sé / Diagnóstico",
];

const initial = { nombre: "", email: "", negocio: "", servicio: "", mensaje: "" };

const fieldClass =
  "w-full border border-ink/20 bg-sand-2 px-4 py-3 font-sans text-ink transition focus:border-orange focus:outline-none";
const labelClass =
  "mb-2 block font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-muted";

export default function Contacto() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);
    const { error } = await supabase.from("leads").insert({
      name: form.nombre,
      email: form.email,
      company_name: form.negocio,
      service: form.servicio,
      message: form.mensaje,
      source: "web",
      stage: "nuevo",
    });
    setSending(false);
    if (error) {
      setError(true);
      return;
    }
    setSent(true);
    setForm(initial);
  }

  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-ink/40" />
          <span className="label">06 — Cotiza</span>
        </div>
        <h2 className="display max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)]">
          Cinco datos. <span className="accent-word">sin vueltas</span>.
        </h2>
        <p className="mt-6 max-w-[520px] text-[1.05rem] text-muted">
          Cuéntanos qué necesitas y te respondemos en menos de 24 horas hábiles. El diagnóstico
          inicial es gratis.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Formulario */}
          <form onSubmit={submit} noValidate className="border border-ink/15 bg-sand-2/60 p-7 sm:p-9">
            {sent && (
              <div className="mb-6 flex items-center gap-2 border border-teal/40 bg-teal/10 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-teal">
                <Asterisk className="h-3.5 w-3.5" color="#14a08c" /> Recibido. Te contactamos pronto.
              </div>
            )}
            {error && (
              <div className="mb-6 border border-orange/40 bg-orange/10 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-orange">
                No se pudo enviar. Intenta de nuevo o escríbenos a hola@nuxorb.com.
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className={labelClass}>Nombre</label>
                <input id="nombre" name="nombre" required value={form.nombre} onChange={update} placeholder="Tu nombre" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Correo</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={update} placeholder="tu@empresa.com" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="negocio" className={labelClass}>Negocio</label>
                <input id="negocio" name="negocio" value={form.negocio} onChange={update} placeholder="Tu empresa" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="servicio" className={labelClass}>¿Qué necesitas?</label>
                <select id="servicio" name="servicio" value={form.servicio} onChange={update} className={fieldClass}>
                  <option value="">Selecciona…</option>
                  {serviceOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="mensaje" className={labelClass}>Cuéntanos más</label>
              <textarea id="mensaje" name="mensaje" rows={4} value={form.mensaje} onChange={update} placeholder="¿Qué proceso quieres mejorar o automatizar?" className={`${fieldClass} resize-y`} />
            </div>
            <button type="submit" disabled={sending} className="btn btn-primary btn-lg mt-6 w-full disabled:opacity-60">
              {sending ? "Enviando…" : "Enviar y cotizar →"}
            </button>
          </form>

          {/* Resumen */}
          <aside className="flex flex-col bg-ink p-8 text-white">
            <span className="font-display text-3xl uppercase tracking-tight">Resumen</span>
            <div className="mt-6 space-y-4 border-y border-white/10 py-6 font-mono text-[0.78rem]">
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-[0.12em] text-white/40">Contacto</span>
                <span className="text-white">{form.nombre || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-[0.12em] text-white/40">Negocio</span>
                <span className="text-white">{form.negocio || "—"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="uppercase tracking-[0.12em] text-white/40">Servicio</span>
                <span className="text-right text-teal">{form.servicio || "Por definir"}</span>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-[0.85rem] text-white/75">
              <li className="flex items-start gap-2.5"><Asterisk className="mt-0.5 h-3.5 w-3.5 flex-none" /> Diagnóstico inicial gratis</li>
              <li className="flex items-start gap-2.5"><Asterisk className="mt-0.5 h-3.5 w-3.5 flex-none" /> Respuesta en menos de 24h hábiles</li>
              <li className="flex items-start gap-2.5"><Asterisk className="mt-0.5 h-3.5 w-3.5 flex-none" /> Propuesta clara en PDF, sin compromiso</li>
            </ul>
            <div className="mt-auto pt-8">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/40">
                ¿Prefieres directo?
              </span>
              <div className="mt-2 flex flex-wrap gap-3">
                <a href="mailto:hola@nuxorb.com" className="font-mono text-[0.75rem] text-white underline-offset-4 hover:text-orange hover:underline">hola@nuxorb.com</a>
                <a href="https://wa.me/" className="font-mono text-[0.75rem] text-white underline-offset-4 hover:text-orange hover:underline">WhatsApp →</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
