export default function DesignSystem() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Design System <span className="text-primary">Foundations</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          A systematic guide to the visual language. Engineered for technical clarity, utilitarian precision, and cognitive ease.
        </p>
      </header>

      {/* Color Semantics */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold tracking-widest text-slate-300 uppercase mb-4 flex items-center gap-2">
          🎨 Color Semantics
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <ColorCard name="SURFACE BACKGROUND" hex="#1A202C" varName="Slate-900" bgClass="bg-surface" />
          <ColorCard name="NODE BACKGROUND" hex="#2D3748" varName="Slate-800" bgClass="bg-node" />
          <ColorCard name="PRIMARY ACTION" hex="#3B82F6" varName="Blue-500" bgClass="bg-primary" />
          <ColorCard name="ERROR STATE" hex="#EF4444" varName="Red-500" bgClass="bg-danger" />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8">
        {/* Typography */}
        <section>
          <h2 className="text-sm font-semibold tracking-widest text-slate-300 uppercase mb-4 flex items-center gap-2">
            Tt Typography Hierarchy
          </h2>
          <div className="border border-slate-700 rounded-md bg-surface divide-y divide-slate-700">
            <TypographyRow label="HEADER" styleName="Inter Bold 24px" desc="Used for screen titles and major module headers." className="text-2xl font-bold text-white" />
            <TypographyRow label="SUBHEADER" styleName="Inter SemiBold 16px" desc="Used for section labels and node titles." className="text-base font-semibold text-white" />
            <TypographyRow label="BODY" styleName="Inter Regular 14px" desc="Primary reading text for all descriptions and inputs." className="text-sm text-slate-300" />
          </div>
        </section>

        {/* Components Placeholder */}
        <section>
          <h2 className="text-sm font-semibold tracking-widest text-slate-300 uppercase mb-4 flex items-center gap-2">
            ⚙️ Components & Logic
          </h2>
          <div className="border border-slate-700 rounded-md bg-surface p-6 h-[300px] flex items-center justify-center">
             <p className="text-slate-500 text-sm italic">Component visuals will render here.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

// Small helper components just for this page to keep code clean
function ColorCard({ name, hex, varName, bgClass }) {
  return (
    <div className="border border-slate-700 rounded-md p-3 bg-surface/50">
      <div className={`h-24 rounded w-full mb-3 ${bgClass}`}></div>
      <p className="text-[10px] font-bold text-slate-400">{name}</p>
      <p className="text-xs text-slate-500 font-mono">{varName} / {hex}</p>
    </div>
  );
}

function TypographyRow({ label, styleName, desc, className }) {
  return (
    <div className="p-4">
      <p className="text-[10px] font-bold text-slate-500 mb-1 uppercase">{label}</p>
      <p className={`mb-1 ${className}`}>{styleName}</p>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  );
}