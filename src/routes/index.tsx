import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Layers, GitCompare, ChevronRight, MapPin, Users, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.png";
import arianaMap from "@/assets/ariana-map.png";
import manoubaMap from "@/assets/manouba-map.png";
import { MapPlaceholder } from "@/components/MapPlaceholder";

export const Route = createFileRoute("/")({
  component: Index,
});

type View = "accueil" | "cartes" | "comparaison";
type Gov = "Manouba" | "Ariana";
const YEARS = ["2003", "2013", "2023"] as const;
const METHODS = [
  "Random Forest",
  "Support Vector Machine",
  "Maximum de Vraisemblance",
  "Extension urbaine",
] as const;

function Index() {
  const [view, setView] = useState<View>("accueil");

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <Sidebar view={view} setView={setView} />
      <main className="relative flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-8 py-12">
          {view === "accueil" && <Accueil />}
          {view === "cartes" && <CartesThematiques />}
          {view === "comparaison" && <Comparaison />}
        </div>
      </main>
    </div>
  );
}

function Sidebar({ view, setView }: { view: View; setView: (v: View) => void }) {
  const items: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "accueil", label: "Accueil", icon: <Home className="h-4 w-4" /> },
    { id: "cartes", label: "Cartes thématiques", icon: <Layers className="h-4 w-4" /> },
    { id: "comparaison", label: "Comparaison", icon: <GitCompare className="h-4 w-4" /> },
  ];
  return (
    <aside className="sticky top-0 z-10 flex h-screen w-72 flex-col gap-2 border-r border-sidebar-border bg-sidebar/80 p-6 text-sidebar-foreground backdrop-blur-xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/40 px-3 py-1">
          <Sparkles className="h-3 w-3 text-sidebar-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-primary">
            Plateforme SIG
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight">
          SIG-Web
          <br />
          <span className="text-gradient">Étalement Urbain</span>
        </h1>
      </div>
      <nav className="flex flex-col gap-1.5">
        {items.map((it) => {
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setView(it.id)}
              className={`group relative flex items-center justify-between overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                active
                  ? "text-sidebar-primary-foreground shadow-[var(--shadow-glow)]"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`}
              style={active ? { backgroundImage: "var(--gradient-primary)" } : undefined}
            >
              <span className="relative flex items-center gap-3">
                {it.icon}
                {it.label}
              </span>
              <ChevronRight className={`relative h-4 w-4 transition-transform ${active ? "translate-x-1" : "opacity-40 group-hover:translate-x-1 group-hover:opacity-100"}`} />
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-sidebar-border bg-sidebar-accent/30 p-4 text-xs leading-relaxed text-sidebar-foreground/70 backdrop-blur">
        Suivi de l'urbanisation et de l'occupation du sol — Ariana &amp; Manouba (2003–2023).
      </div>
    </aside>
  );
}

function SectionHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <header className="mb-12">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_oklch(0.78_0.16_195)]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
        {title}
      </h2>
      {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>}
    </header>
  );
}

function Accueil() {
  return (
    <div>
      <SectionHeader
        kicker="Accueil"
        title="SIG-Web Étalement Urbain"
        lead="Suivi de l'urbanisation et de l'occupation du sol — gouvernorats d'Ariana et de Manouba."
      />
      <div className="group relative overflow-hidden rounded-[2rem] border border-border glass-card shadow-[var(--shadow-elegant)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10" />
        <img src={heroBanner} alt="SIG-Web Étalement Urbain — Ariana et Manouba" className="relative h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <p className="text-base leading-relaxed text-foreground/90 md:col-span-2 md:text-lg">
          Ce site présente l'évolution de l'occupation du sol dans les gouvernorats de{" "}
          <span className="text-gradient font-semibold">Manouba</span> et{" "}
          <span className="text-gradient font-semibold">Ariana</span> à travers trois dates clés :{" "}
          <strong className="text-foreground">2003, 2013 et 2023</strong>. À travers une série de cartes thématiques harmonisées,
          il met en évidence les dynamiques d'urbanisation, la régression des terres agricoles et la
          transformation des paysages périurbains.
        </p>
        <div className="glass-card rounded-2xl p-5 text-sm">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Cadre géographique</div>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            La carte introduit le périmètre d'étude et situe les zones analysées dans leur contexte
            spatial.
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
        Ce travail vise à fournir une plateforme interactive permettant aux chercheurs, étudiants et
        décideurs d'accéder à des représentations visuelles claires et comparatives, afin de mieux
        comprendre les enjeux liés à l'expansion urbaine et à la gestion durable des territoires.
      </p>
    </div>
  );
}

function CartesThematiques() {
  const [gov, setGov] = useState<Gov | null>(null);

  if (gov) return <GovDetail gov={gov} onBack={() => setGov(null)} />;

  return (
    <div>
      <SectionHeader
        kicker="Cartes thématiques"
        title="Présentation de la zone d'étude"
        lead="Sélectionnez un gouvernorat pour explorer les cartes thématiques par année et par méthode de classification."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <GovCard
          gov="Ariana"
          image={arianaMap}
          area="482 km²"
          population="~600 000 habitants"
          description="Située au nord de Tunis, l'Ariana se distingue par une urbanisation rapide et une forte densité démographique, favorisée par sa proximité avec la capitale."
          onClick={() => setGov("Ariana")}
        />
        <GovCard
          gov="Manouba"
          image={manoubaMap}
          area="372 km²"
          population="~410 000 habitants"
          description="Localisée à l'ouest de Tunis, la Manouba combine espaces agricoles et zones urbaines en développement, traduisant une urbanisation progressive."
          onClick={() => setGov("Manouba")}
        />
      </div>
    </div>
  );
}

function GovCard({
  gov,
  image,
  area,
  population,
  description,
  onClick,
}: {
  gov: Gov;
  image: string;
  area: string;
  population: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl border border-border glass-card text-left shadow-[var(--shadow-elegant)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={`Carte du gouvernorat de ${gov}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
          Gouvernorat
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-3xl font-bold tracking-tight text-foreground">
          <span className="text-gradient">{gov}</span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-5 flex gap-6 text-xs">
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-semibold">{area}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-semibold">{population}</span>
          </div>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-all group-hover:bg-primary/20">
          Explorer les cartes
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}

function GovDetail({ gov, onBack }: { gov: Gov; onBack: () => void }) {
  const [year, setYear] = useState<(typeof YEARS)[number]>("2003");
  const [method, setMethod] = useState<(typeof METHODS)[number]>("Random Forest");
  const image = gov === "Ariana" ? arianaMap : manoubaMap;
  const area = gov === "Ariana" ? "482 km²" : "372 km²";
  const population = gov === "Ariana" ? "~600 000 habitants" : "~410 000 habitants";

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4 rotate-180" />
        Retour aux gouvernorats
      </button>
      <SectionHeader
        kicker={`Gouvernorat · ${gov}`}
        title={`Cartes thématiques — ${gov}`}
        lead={`Superficie ${area} · Population ${population}. Choisissez une année puis une méthode de classification.`}
      />

      <div className="grid gap-8 lg:grid-cols-[220px,1fr]">
        {/* Year selector — large left */}
        <div className="flex flex-row gap-2 lg:flex-col">
          {YEARS.map((y) => {
            const active = year === y;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`relative flex-1 overflow-hidden rounded-2xl border px-4 py-6 text-left transition-all duration-300 ${
                  active
                    ? "border-transparent text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "glass-card text-foreground hover:border-primary/40 hover:-translate-y-0.5"
                }`}
                style={active ? { backgroundImage: "var(--gradient-primary)" } : undefined}
              >
                <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  Année
                </div>
                <div className="mt-1 text-3xl font-bold tracking-tight">{y}</div>
              </button>
            );
          })}
        </div>

        <div>
          {/* Method tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {METHODS.map((m) => {
              const active = method === m;
              return (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                    active
                      ? "border-transparent text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "border-border glass-card text-foreground hover:border-primary/40"
                  }`}
                  style={active ? { backgroundImage: "var(--gradient-primary)" } : undefined}
                >
                  {m}
                </button>
              );
            })}
          </div>

          <div className="glass-card rounded-3xl p-7 shadow-[var(--shadow-elegant)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              {method}
            </div>
            <h4 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              {gov} <span className="text-muted-foreground">·</span> <span className="text-gradient">{year}</span>
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-foreground">
              {govPresentation(gov)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {methodCopy(method, gov, year)}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <Stat label="Zone urbaine" value={urbanShare(year)} />
              <Stat label="Agricole" value={agriShare(year)} />
              <Stat label="Sol nu" value="18%" />
              <Stat label="Végétation" value="14%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function govPresentation(gov: Gov) {
  if (gov === "Ariana") {
    return "Le gouvernorat d'Ariana est situé au nord de Tunis, il s'étend sur 482 km² et compte environ 600 000 habitants. Il se distingue par une urbanisation rapide et une forte densité démographique, favorisée par sa proximité avec la capitale. Son territoire regroupe des zones résidentielles, industrielles et agricoles, illustrant une dynamique d'expansion urbaine soutenue.";
  }
  return "Le gouvernorat de Manouba est localisé à l'ouest de Tunis, il couvre une superficie de 372 km² pour une population d'environ 410 000 habitants. Son territoire combine des espaces agricoles et des zones urbaines en développement, traduisant une évolution progressive vers une urbanisation structurée tout en conservant un caractère rural marqué.";
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/40 p-4 backdrop-blur transition-colors hover:border-primary/40">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold text-gradient">{value}</div>
    </div>
  );
}

function urbanShare(year: string) {
  return year === "2003" ? "22%" : year === "2013" ? "34%" : "48%";
}
function agriShare(year: string) {
  return year === "2003" ? "46%" : year === "2013" ? "36%" : "20%";
}

function methodCopy(method: string, gov: string, year: string) {
  const base = `Carte de classification de l'occupation du sol pour ${gov} en ${year}.`;
  switch (method) {
    case "Random Forest":
      return `${base} Méthode d'ensemble basée sur des arbres de décision, robuste face au bruit et bien adaptée aux données satellitaires multi-bandes.`;
    case "Support Vector Machine":
      return `${base} SVM sépare les classes via un hyperplan optimal, efficace pour distinguer zones urbaines, végétation et sols nus.`;
    case "Maximum de Vraisemblance":
      return `${base} Méthode statistique paramétrique supposant une distribution gaussienne par classe — référence historique en télédétection.`;
    case "Extension urbaine":
      return `${base} Cartographie dédiée à l'expansion du bâti et à la consommation des terres périurbaines au fil du temps.`;
    default:
      return base;
  }
}

function Comparaison() {
  return (
    <div>
      <SectionHeader
        kicker="Analyse comparative"
        title="Ariana vs Manouba"
        lead="Évolution comparée de l'occupation du sol et de la pression urbaine entre les deux gouvernorats sur 20 ans."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {(["Ariana", "Manouba"] as Gov[]).map((g) => (
          <div key={g} className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={g === "Ariana" ? arianaMap : manoubaMap}
                alt={`Carte ${g}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground">{g}</h3>
              <div className="mt-4 space-y-3">
                {YEARS.map((y) => (
                  <Bar key={y} label={y} value={Number(urbanShare(y).replace("%", ""))} />
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Part des zones urbaines (%)</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border bg-card p-8 shadow-sm">
        <h3 className="text-xl font-bold text-foreground">Lecture comparative</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Entre 2003 et 2023, les deux gouvernorats connaissent une expansion urbaine soutenue.
          L'Ariana, plus densément peuplée, présente une saturation plus rapide de son tissu bâti,
          tandis que la Manouba conserve davantage de terres agricoles, avec une dynamique
          d'urbanisation progressive le long des axes routiers principaux.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <KPI label="Superficie Ariana" value="482 km²" />
          <KPI label="Superficie Manouba" value="372 km²" />
          <KPI label="Période d'étude" value="2003 – 2023" />
        </div>
      </div>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-medium text-foreground">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value * 2}%` }} />
      </div>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-background p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold text-foreground">{value}</div>
    </div>
  );
}
