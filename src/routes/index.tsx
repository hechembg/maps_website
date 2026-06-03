import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Layers, GitCompare, ChevronRight, ArrowLeft, MapPin, Users, TrendingUp, Building2, Satellite } from "lucide-react";
import heroAsset from "@/assets/hero.png.asset.json";
import arianaMapAsset from "@/assets/ariana-map.png.asset.json";
import manoubaMapAsset from "@/assets/manouba-map.png.asset.json";
import ariana2003Rf from "@/assets/maps/ariana-2003-rf.jpg.asset.json";
import ariana2003Svm from "@/assets/maps/ariana-2003-svm.jpg.asset.json";
import ariana2003Mv from "@/assets/maps/ariana-2003-mv.jpg.asset.json";
import ariana2003Ext from "@/assets/maps/ariana-2003-ext.jpg.asset.json";
import ariana2013Rf from "@/assets/maps/ariana-2013-rf.jpg.asset.json";
import ariana2013Svm from "@/assets/maps/ariana-2013-svm.jpg.asset.json";
import ariana2013Mv from "@/assets/maps/ariana-2013-mv.jpg.asset.json";
import ariana2013Ext from "@/assets/maps/ariana-2013-ext.jpg.asset.json";
import ariana2023Rf from "@/assets/maps/ariana-2023-rf.jpg.asset.json";
import ariana2023Svm from "@/assets/maps/ariana-2023-svm.jpg.asset.json";
import ariana2023Mv from "@/assets/maps/ariana-2023-mv.jpg.asset.json";
import ariana2023Ext from "@/assets/maps/ariana-2023-ext.jpg.asset.json";
import manouba2003Rf from "@/assets/maps/manouba-2003-rf.jpg.asset.json";
import manouba2003Svm from "@/assets/maps/manouba-2003-svm.jpg.asset.json";
import manouba2003Mv from "@/assets/maps/manouba-2003-mv.jpg.asset.json";
import manouba2003Ext from "@/assets/maps/manouba-2003-ext.jpg.asset.json";
import manouba2013Rf from "@/assets/maps/manouba-2013-rf.jpg.asset.json";
import manouba2013Svm from "@/assets/maps/manouba-2013-svm.jpg.asset.json";
import manouba2013Mv from "@/assets/maps/manouba-2013-mv.jpg.asset.json";
import manouba2013Ext from "@/assets/maps/manouba-2013-ext.jpg.asset.json";
import manouba2023Rf from "@/assets/maps/manouba-2023-rf.jpg.asset.json";
import manouba2023Svm from "@/assets/maps/manouba-2023-svm.jpg.asset.json";
import manouba2023Mv from "@/assets/maps/manouba-2023-mv.jpg.asset.json";
import manouba2023Ext from "@/assets/maps/manouba-2023-ext.jpg.asset.json";

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

const GOV_MAP: Record<Gov, string> = {
  Ariana: arianaMapAsset.url,
  Manouba: manoubaMapAsset.url,
};

const THEMATIC_MAPS: Record<Gov, Partial<Record<string, Partial<Record<string, string>>>>> = {
  Ariana: {
    "2003": {
      "Random Forest": ariana2003Rf.url,
      "Support Vector Machine": ariana2003Svm.url,
      "Maximum de Vraisemblance": ariana2003Mv.url,
      "Extension urbaine": ariana2003Ext.url,
    },
    "2013": {
      "Random Forest": ariana2013Rf.url,
      "Support Vector Machine": ariana2013Svm.url,
      "Maximum de Vraisemblance": ariana2013Mv.url,
      "Extension urbaine": ariana2013Ext.url,
    },
    "2023": {
      "Maximum de Vraisemblance": ariana2023Mv.url,
      "Extension urbaine": ariana2023Ext.url,
    },
  },
  Manouba: {
    "2003": {
      "Random Forest": manouba2003Rf.url,
      "Support Vector Machine": manouba2003Svm.url,
      "Maximum de Vraisemblance": manouba2003Mv.url,
      "Extension urbaine": manouba2003Ext.url,
    },
    "2013": {
      "Random Forest": manouba2013Rf.url,
      "Maximum de Vraisemblance": manouba2013Mv.url,
      "Extension urbaine": manouba2013Ext.url,
    },
  },
};


function Index() {
  const [view, setView] = useState<View>("accueil");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar view={view} setView={setView} />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-10 py-16">
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
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar p-8 text-sidebar-foreground">
      <div className="mb-12">
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Plateforme SIG
        </div>
        <h1 className="mt-3 text-xl font-semibold leading-tight tracking-tight">
          SIG-Web<br />Étalement Urbain
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((it) => {
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setView(it.id)}
              className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                {it.icon}
                {it.label}
              </span>
              {active && <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto pt-8 text-xs leading-relaxed text-muted-foreground">
        Suivi de l'urbanisation — Ariana &amp; Manouba (2003–2023).
      </div>
    </aside>
  );
}

function SectionHeader({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        {kicker}
      </div>
      <h2 className="mt-3 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl">
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

      {/* Hero illustration */}
      <figure className="overflow-hidden rounded-xl border border-border bg-card">
        <img
          src={heroAsset.url}
          alt="Synthèse visuelle du projet SIG-Web Étalement Urbain"
          className="block h-auto w-full"
          loading="eager"
        />
      </figure>

      {/* Intro */}
      <div className="mt-12 space-y-5 text-base leading-relaxed text-foreground">
        <p>
          Ce site présente l'évolution de l'occupation du sol dans les gouvernorats de{" "}
          <strong className="font-semibold">Manouba</strong> et{" "}
          <strong className="font-semibold">Ariana</strong> à travers trois dates clés : 2003, 2013 et 2023.
          À travers une série de cartes thématiques harmonisées, il met en évidence les dynamiques
          d'urbanisation, la régression des terres agricoles et la transformation des paysages périurbains.
        </p>
        <p className="text-muted-foreground">
          Une plateforme interactive pensée pour les chercheurs, étudiants et décideurs — afin d'accéder
          à des représentations visuelles claires et comparatives, et de mieux comprendre les enjeux liés
          à l'expansion urbaine et à la gestion durable des territoires.
        </p>
      </div>

      {/* KPIs */}
      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
        <KPI label="Période d'étude" value="2003 – 2023" />
        <KPI label="Gouvernorats" value="2" />
        <KPI label="Méthodes" value="4" />
        <KPI label="Dates clés" value="3" />
      </div>

      {/* Axes du projet */}
      <section className="mt-16">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Axes du projet
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<Satellite className="h-4 w-4" />}
            title="Classification RF"
            text="Cartographie de l'occupation du sol par Random Forest sur imagerie satellitaire multi-bandes."
          />
          <FeatureCard
            icon={<Layers className="h-4 w-4" />}
            title="SVM & MV"
            text="Comparaison des classifications Support Vector Machine et Maximum de Vraisemblance."
          />
          <FeatureCard
            icon={<Building2 className="h-4 w-4" />}
            title="Extension urbaine"
            text="Suivi de l'expansion du bâti et de la consommation des terres périurbaines."
          />
        </div>
      </section>

      {/* Zones d'étude */}
      <section className="mt-16">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Zones d'étude
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ZoneTeaser
            name="Ariana"
            area="482 km²"
            population="~600 000 hab."
            text="Au nord de Tunis, urbanisation rapide et forte densité démographique."
          />
          <ZoneTeaser
            name="Manouba"
            area="372 km²"
            population="~410 000 hab."
            text="À l'ouest de Tunis, mix d'espaces agricoles et de zones urbaines en développement."
          />
        </div>
      </section>

      {/* Évolution des zones urbaines */}
      <section className="mt-16 rounded-lg border border-border bg-card p-7">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" />
          Évolution des zones urbaines (%)
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          Une progression continue entre 2003 et 2023
        </h3>
        <div className="mt-6 grid grid-cols-3 items-end gap-6 sm:gap-10">
          {YEARS.map((y) => {
            const v = Number(urbanShare(y).replace("%", ""));
            return (
              <div key={y} className="flex flex-col items-center">
                <div className="flex h-40 w-full items-end">
                  <div
                    className="mx-auto w-10 rounded-t-md bg-primary transition-[height] duration-500"
                    style={{ height: `${v * 2}%` }}
                  />
                </div>
                <div className="mt-3 text-sm font-medium text-foreground">{y}</div>
                <div className="text-xs text-muted-foreground">{v}%</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </div>
      <h4 className="mt-4 text-sm font-semibold tracking-tight text-foreground">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function ZoneTeaser({ name, area, population, text }: { name: string; area: string; population: string; text: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Gouvernorat
      </div>
      <h4 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{name}</h4>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
      <div className="mt-4 flex gap-5 text-xs text-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium">{area}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium">{population}</span>
        </span>
      </div>
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
      <div className="grid gap-5 md:grid-cols-2">
        <GovCard
          gov="Ariana"
          area="482 km²"
          population="~600 000 habitants"
          description="Située au nord de Tunis, l'Ariana se distingue par une urbanisation rapide et une forte densité démographique, favorisée par sa proximité avec la capitale."
          onClick={() => setGov("Ariana")}
        />
        <GovCard
          gov="Manouba"
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
  area,
  population,
  description,
  onClick,
}: {
  gov: Gov;
  area: string;
  population: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-lg border border-border bg-card text-left transition-colors hover:border-foreground/30"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={GOV_MAP[gov]}
          alt={`Carte du gouvernorat de ${gov}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-7">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Gouvernorat
        </div>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{gov}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-5 flex gap-6 text-xs text-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{area}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{population}</span>
          </span>
        </div>
        <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-transform group-hover:translate-x-0.5">
          Explorer les cartes
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </button>
  );
}

function GovDetail({ gov, onBack }: { gov: Gov; onBack: () => void }) {
  const [year, setYear] = useState<(typeof YEARS)[number]>("2003");
  const [method, setMethod] = useState<(typeof METHODS)[number]>("Random Forest");
  const area = gov === "Ariana" ? "482 km²" : "372 km²";
  const population = gov === "Ariana" ? "~600 000 habitants" : "~410 000 habitants";

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Retour aux gouvernorats
      </button>
      <SectionHeader
        kicker={`Gouvernorat · ${gov}`}
        title={`Cartes thématiques — ${gov}`}
        lead={`Superficie ${area} · Population ${population}. Choisissez une année puis une méthode de classification.`}
      />

      <figure className="mb-10 overflow-hidden rounded-lg border border-border bg-muted">
        <img
          src={GOV_MAP[gov]}
          alt={`Carte administrative du gouvernorat de ${gov}`}
          className="block h-auto w-full"
          loading="eager"
        />
      </figure>

      <div className="grid gap-10 lg:grid-cols-[180px,1fr]">
        <div className="flex flex-row gap-2 lg:flex-col">
          {YEARS.map((y) => {
            const active = year === y;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`flex-1 rounded-md border px-4 py-5 text-left transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-foreground/30"
                }`}
              >
                <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  Année
                </div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">{y}</div>
              </button>
            );
          })}
        </div>

        <div>
          <div className="mb-6 flex flex-wrap gap-2">
            {METHODS.map((m) => {
              const active = method === m;
              return (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-foreground/30"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>

          <div className="rounded-lg border border-border bg-card p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {method}
            </div>
            <h4 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              {gov} <span className="text-muted-foreground">·</span> {year}
            </h4>

            {(() => {
              const url = THEMATIC_MAPS[gov]?.[year]?.[method];
              return url ? (
                <figure className="mt-6 overflow-hidden rounded-md border border-border bg-muted">
                  <img
                    src={url}
                    alt={`Carte ${method} — ${gov} ${year}`}
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                  <figcaption className="border-t border-border bg-card px-4 py-2 text-[11px] text-muted-foreground">
                    {method} — {gov}, {year}
                  </figcaption>
                </figure>
              ) : (
                <div className="mt-6 rounded-md border border-dashed border-border bg-muted/40 p-6 text-center text-xs text-muted-foreground">
                  Carte non disponible pour cette combinaison.
                </div>
              );
            })()}

            <p className="mt-5 text-sm leading-relaxed text-foreground">
              {govPresentation(gov)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {methodCopy(method, gov, year)}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
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
    <div className="bg-card p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-foreground">{value}</div>
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

      <div className="grid gap-5 md:grid-cols-2">
        {(["Ariana", "Manouba"] as Gov[]).map((g) => (
          <div key={g} className="rounded-lg border border-border bg-card p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Gouvernorat</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{g}</h3>
            <div className="mt-6 space-y-4">
              {YEARS.map((y) => (
                <Bar key={y} label={y} value={Number(urbanShare(y).replace("%", ""))} />
              ))}
            </div>
            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Part des zones urbaines</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-border bg-card p-8">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">Lecture comparative</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Entre 2003 et 2023, les deux gouvernorats connaissent une expansion urbaine soutenue.
          L'Ariana, plus densément peuplée, présente une saturation plus rapide de son tissu bâti,
          tandis que la Manouba conserve davantage de terres agricoles, avec une dynamique
          d'urbanisation progressive le long des axes routiers principaux.
        </p>

        <div className="mt-7 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
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
      <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-foreground">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${value * 2}%` }}
        />
      </div>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
