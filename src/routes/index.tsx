import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Layers, GitCompare, ChevronRight, MapPin, Users } from "lucide-react";
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
    <div className="flex min-h-screen bg-background">
      <Sidebar view={view} setView={setView} />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-8 py-10">
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
    <aside className="sticky top-0 flex h-screen w-72 flex-col gap-2 border-r bg-sidebar p-6 text-sidebar-foreground">
      <div className="mb-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-primary">
          Plateforme SIG
        </div>
        <h1 className="mt-2 text-xl font-bold leading-tight">
          SIG-Web
          <br />
          <span className="text-sidebar-primary">Étalement Urbain</span>
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((it) => {
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setView(it.id)}
              className={`group flex items-center justify-between rounded-full px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
              }`}
            >
              <span className="flex items-center gap-3">
                {it.icon}
                {it.label}
              </span>
              <ChevronRight className={`h-4 w-4 transition-transform ${active ? "translate-x-1" : "opacity-40"}`} />
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-4 text-xs text-sidebar-foreground/70">
        Suivi de l'urbanisation et de l'occupation du sol — Ariana &amp; Manouba (2003–2023).
      </div>
    </aside>
  );
}

function SectionHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <header className="mb-10">
      <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {kicker}
      </div>
      <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead}</p>}
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
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <img src={heroBanner} alt="SIG-Web Étalement Urbain — Ariana et Manouba" className="h-auto w-full" />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <p className="text-base leading-relaxed text-foreground md:col-span-2">
          Ce site présente l'évolution de l'occupation du sol dans les gouvernorats de{" "}
          <strong>Manouba</strong> et <strong>Ariana</strong> à travers trois dates clés :{" "}
          <strong>2003, 2013 et 2023</strong>. À travers une série de cartes thématiques harmonisées,
          il met en évidence les dynamiques d'urbanisation, la régression des terres agricoles et la
          transformation des paysages périurbains.
        </p>
        <div className="rounded-2xl border bg-secondary p-5 text-sm text-secondary-foreground">
          <div className="font-semibold">Cadre géographique</div>
          <p className="mt-2 text-muted-foreground">
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
      className="group overflow-hidden rounded-3xl border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={`Carte du gouvernorat de ${gov}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Gouvernorat
        </div>
        <h3 className="mt-1 text-2xl font-bold text-foreground">{gov}</h3>
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
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Explorer les cartes
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                className={`flex-1 rounded-2xl border px-4 py-6 text-left transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-foreground hover:border-primary/40"
                }`}
              >
                <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
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
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-[1.4fr,1fr]">
            <MapPlaceholder gov={gov} year={year} method={method} />
            <div className="rounded-2xl border bg-card p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {method}
              </div>
              <h4 className="mt-2 text-xl font-bold text-foreground">
                {gov} — {year}
              </h4>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {methodCopy(method, gov, year)}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <Stat label="Zone urbaine" value={urbanShare(year)} />
                <Stat label="Agricole" value={agriShare(year)} />
                <Stat label="Sol nu" value="18%" />
                <Stat label="Végétation" value="14%" />
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border bg-secondary/40 p-2">
            <img src={image} alt={`Carte de référence ${gov}`} className="mx-auto h-auto max-h-72 w-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-lg font-bold text-foreground">{value}</div>
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
