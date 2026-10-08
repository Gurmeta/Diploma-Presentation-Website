import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Check, Cpu, Globe, HardDrive, Server } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

type Tab = 'comparison' | 'calculator' | 'latencies';

/** 0-100 ratings per metric, in the same order as `charts.metrics` in the dictionaries. */
const SCORES = [
  { terraform: 100, scripts: 60, manual: 10 },
  { terraform: 95, scripts: 50, manual: 5 },
  { terraform: 100, scripts: 40, manual: 0 },
  { terraform: 90, scripts: 25, manual: 0 },
  { terraform: 95, scripts: 45, manual: 15 },
];

/** Round-trip latency to Sofia in ms, same order as `charts.latency.regions`. */
const LATENCIES = [32, 45, 54, 68];
const MAX_LATENCY = 120;

// Monthly prices in EUR for Poland Central (Standard_D2s_v3)
const VM_RATE = 16.1;
const DISK_RATE_PER_GB = 0.043; // Standard LRS
const IP_RATE = 3.65; // Static Standard public IP
const BGN_PER_EUR = 1.95583;

const METHOD_COLORS = {
  terraform: 'bg-tf',
  scripts: 'bg-warn',
  manual: 'bg-err',
} as const;

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between gap-4 text-sm mb-1.5">
        <span className="text-ink">{label}</span>
        <span className="mono font-medium tabular-nums">{value}%</span>
      </div>
      <div className="h-2 bg-rule-soft rounded-[1px] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}

interface SliderProps {
  icon: ReactNode;
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
}

function Slider({ icon, label, valueLabel, min, max, step = 1, value, onChange, minLabel, maxLabel }: SliderProps) {
  return (
    <div>
      <label className="flex justify-between items-baseline gap-4 text-sm mb-2">
        <span className="flex items-center gap-2 text-ink">
          {icon}
          {label}
        </span>
        <span className="mono font-medium text-azure tabular-nums">{valueLabel}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full accent-azure cursor-pointer"
      />
      <div className="flex justify-between text-xs text-ink-3 mt-0.5">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default function InteractiveCharts() {
  const { t } = useI18n();
  const c = t.charts;
  const [activeTab, setActiveTab] = useState<Tab>('comparison');
  const [selectedMetric, setSelectedMetric] = useState<number>(0);

  const [vmCount, setVmCount] = useState<number>(1);
  const [diskSize, setDiskSize] = useState<number>(30); // GB
  const [ipCount, setIpCount] = useState<number>(1);
  const [currency, setCurrency] = useState<'EUR' | 'BGN'>('BGN');

  const money = new Intl.NumberFormat(t.ui.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const rate = currency === 'BGN' ? BGN_PER_EUR : 1;
  const unit = currency === 'BGN' ? c.calculator.unitBgn : c.calculator.unitEur;
  const vmCost = vmCount * VM_RATE * rate;
  const diskCost = diskSize * DISK_RATE_PER_GB * vmCount * rate;
  const ipCost = ipCount * IP_RATE * rate;
  const total = vmCost + diskCost + ipCost;

  const metric = c.metrics[selectedMetric];
  const score = SCORES[selectedMetric];

  const tabs: { id: Tab; label: string }[] = [
    { id: 'comparison', label: c.tabs.comparison },
    { id: 'calculator', label: c.tabs.calculator },
    { id: 'latencies', label: c.tabs.latencies },
  ];

  // Arrow keys, Home and End move between tabs (roving tabindex)
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    e.stopPropagation(); // keep the slide navigation from reacting to the same key
    setActiveTab(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div className="w-full min-w-0">
      <div role="tablist" aria-label={t.slides[7].title} className="flex gap-6 border-b border-rule mb-8 overflow-x-auto overflow-y-hidden">
        {tabs.map((tab, tabIndex) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active ? 0 : -1}
              onKeyDown={(e) => onTabKeyDown(e, tabIndex)}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 whitespace-nowrap pb-3 text-sm border-b-2 transition-colors cursor-pointer ${
                active ? 'border-azure text-ink font-semibold' : 'border-transparent text-ink-3 hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'comparison' && (
        <div role="tabpanel" id="panel-comparison" aria-labelledby="tab-comparison" className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 className="text-sm font-semibold mb-3">{c.criteria}</h2>
            <ul className="border-t border-rule">
              {c.metrics.map((m, index) => {
                const selected = selectedMetric === index;
                return (
                  <li key={m.name}>
                    <button
                      type="button"
                      onClick={() => setSelectedMetric(index)}
                      aria-pressed={selected}
                      className={`w-full flex items-baseline justify-between gap-4 py-3 pl-3 pr-2 text-left border-b border-rule border-l-2 transition-colors cursor-pointer ${
                        selected ? 'border-l-azure bg-sheet' : 'border-l-transparent hover:bg-sheet'
                      }`}
                    >
                      <span className={selected ? 'font-semibold' : ''}>{m.name}</span>
                      <span className="text-xs text-ink-3 shrink-0">{m.category}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-xs text-ink-3 mb-1">{c.analysis}</h2>
            <h3 className="text-xl font-semibold mb-3">{metric.name}</h3>
            <p className="text-sm text-ink-2 leading-relaxed prose-measure mb-7">{metric.description}</p>

            <div className="flex flex-col gap-5">
              <Bar label={c.methods.terraform} value={score.terraform} color={METHOD_COLORS.terraform} />
              <Bar label={c.methods.scripts} value={score.scripts} color={METHOD_COLORS.scripts} />
              <Bar label={c.methods.manual} value={score.manual} color={METHOD_COLORS.manual} />
            </div>

            <p className="mt-8 pt-4 border-t border-rule text-xs text-ink-3">{c.comparisonNote}</p>
          </div>
        </div>
      )}

      {activeTab === 'calculator' && (
        <div role="tabpanel" id="panel-calculator" aria-labelledby="tab-calculator" className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{c.calculator.title}</h2>
                <p className="text-sm text-ink-3 mt-0.5">{c.calculator.hint}</p>
              </div>
              <div role="group" aria-label={c.calculator.monthly} className="inline-flex border border-rule rounded-sm overflow-hidden shrink-0">
                {(['BGN', 'EUR'] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    aria-pressed={currency === code}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      currency === code ? 'bg-ink text-sheet' : 'bg-sheet text-ink-2 hover:bg-rule-soft'
                    }`}
                  >
                    {code === 'BGN' ? c.calculator.currencyBgn : c.calculator.currencyEur}
                  </button>
                ))}
              </div>
            </div>

            <Slider
              icon={<Cpu size={16} className="text-azure" aria-hidden="true" />}
              label={c.calculator.vms}
              valueLabel={c.calculator.count(vmCount)}
              min={1}
              max={5}
              value={vmCount}
              onChange={setVmCount}
              minLabel={c.calculator.count(1)}
              maxLabel={c.calculator.count(5)}
            />
            <Slider
              icon={<HardDrive size={16} className="text-azure" aria-hidden="true" />}
              label={c.calculator.disk}
              valueLabel={`${diskSize} GB`}
              min={30}
              max={250}
              step={10}
              value={diskSize}
              onChange={setDiskSize}
              minLabel="30 GB"
              maxLabel="250 GB"
            />
            <Slider
              icon={<Globe size={16} className="text-azure" aria-hidden="true" />}
              label={c.calculator.ips}
              valueLabel={c.calculator.count(ipCount)}
              min={1}
              max={3}
              value={ipCount}
              onChange={setIpCount}
              minLabel={c.calculator.count(1)}
              maxLabel={c.calculator.count(3)}
            />
          </div>

          <section className="bg-term text-term-text rounded-sm p-6 lg:p-8 flex flex-col justify-between border border-rule" aria-live="polite">
            <div>
              <p className="text-xs text-term-text/65">{c.calculator.pricing}</p>
              <h3 className="text-sm font-medium text-white mt-1">{c.calculator.monthly}</h3>

              <p className="flex items-baseline gap-2 mt-3 mb-7">
                <span className="font-semibold text-white tabular-nums leading-none" style={{ fontSize: 'clamp(2.5rem, 1.6rem + 2.4vw, 3.75rem)' }}>
                  {money.format(total)}
                </span>
                <span className="text-xl text-term-text/80">{unit}</span>
                <span className="text-sm text-term-text/60">{c.calculator.perMonth}</span>
              </p>

              <dl className="border-t border-term-2 text-sm">
                {[
                  { icon: Server, label: c.calculator.rowVms(vmCount), value: vmCost },
                  { icon: HardDrive, label: c.calculator.rowDisk(diskSize, vmCount), value: diskCost },
                  { icon: Globe, label: c.calculator.rowIps(ipCount), value: ipCost },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex justify-between items-center gap-4 py-3 border-b border-term-2">
                    <dt className="flex items-center gap-2 text-term-text/80">
                      <Icon size={14} aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mono text-white tabular-nums">
                      {money.format(value)} {unit}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-6 text-xs text-term-text/60 leading-relaxed">* {c.calculator.note}</p>
          </section>
        </div>
      )}

      {activeTab === 'latencies' && (
        <div role="tabpanel" id="panel-latencies" aria-labelledby="tab-latencies" className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <h2 className="text-xl font-semibold mb-3">{c.latency.why}</h2>
            <p className="text-sm text-ink-2 leading-relaxed prose-measure mb-5">{c.latency.lead}</p>
            <ul>
              {c.latency.points.map((point) => (
                <li key={point.title} className="flex gap-3 py-3 border-t border-rule text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-add-soft text-add" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <p className="text-ink-2 leading-relaxed">
                    <strong className="font-semibold text-ink">{point.title}</strong> {point.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs text-ink-3 mb-1">{c.latency.chartTitle}</h3>
            <p className="text-xl font-semibold mb-6">{c.latency.chartHeading}</p>

            <ul className="flex flex-col gap-5">
              {c.latency.regions.map((region, i) => {
                const chosen = i === 0;
                return (
                  <li key={region.name}>
                    <div className="flex justify-between items-baseline gap-4 text-sm mb-1.5">
                      <span className={chosen ? 'font-semibold text-add' : 'text-ink'}>
                        {region.name}
                        {chosen && <span className="ml-2 text-xs font-medium px-1.5 py-0.5 bg-add-soft text-add rounded-sm">{c.latency.chosen}</span>}
                      </span>
                      <span className="mono tabular-nums font-medium">~{LATENCIES[i]} ms</span>
                    </div>
                    <div className="h-3 bg-rule-soft rounded-[1px] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(LATENCIES[i] / MAX_LATENCY) * 100}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`h-full ${chosen ? 'bg-add' : 'bg-ink-3/60'}`}
                      />
                    </div>
                    <p className="text-xs text-ink-3 mt-1">{region.note}</p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 pt-4 border-t border-rule text-xs text-ink-3">* {c.latency.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
