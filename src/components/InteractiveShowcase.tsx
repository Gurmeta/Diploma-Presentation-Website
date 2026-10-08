import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertCircle,
  Check,
  CheckCircle,
  Circle,
  Lock,
  Maximize2,
  Play,
  RefreshCw,
  Trash2,
  X,
  XCircle,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { getMatrixHtml } from '../utils/matrixHtml';

type LineType = 'info' | 'success' | 'error' | 'input';

interface TerminalLine {
  text: string;
  type: LineType;
}

interface AzureResources {
  rg: boolean;
  vnet: boolean;
  nsg: boolean;
  ip: boolean;
  vm: boolean;
  nginx: boolean;
}

type Preset = 'policy' | 'quota' | 'ok';

const NO_RESOURCES: AzureResources = { rg: false, vnet: false, nsg: false, ip: false, vm: false, nginx: false };

// Shell prompt and demo address shown in the simulated terminal and browser.
// 203.0.113.0/24 is reserved for documentation, so it never points to a real host.
const TERMINAL_PROMPT = 'student@vutp MINGW64 ~/diploma/infrastructure $ ';
const DEMO_IP = '203.0.113.10';
const DIAGRAM_URL = `${import.meta.env.BASE_URL}architecture-diagram.png`;

const LINE_STYLE: Record<LineType, string> = {
  error: 'text-[#ff9a90]',
  success: 'text-[#7fe0a8]',
  input: 'text-[#8cc4ff] font-medium',
  info: 'text-term-text/85',
};

const PRESET_STYLE: Record<Preset, { icon: typeof AlertCircle; bar: string; text: string }> = {
  policy: { icon: AlertCircle, bar: 'border-l-warn', text: 'text-warn' },
  quota: { icon: XCircle, bar: 'border-l-err', text: 'text-err' },
  ok: { icon: CheckCircle, bar: 'border-l-add', text: 'text-add' },
};

const selectClass =
  'w-full text-sm p-2 rounded-sm border border-rule bg-sheet text-ink focus-visible:outline-azure';

export default function InteractiveShowcase() {
  const { t } = useI18n();
  const s = t.showcase;

  // Pending simulation timers, cleared when the slide is left
  const timersRef = useRef<number[]>([]);
  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(() => {
    const timers = timersRef;
    return () => timers.current.forEach(window.clearTimeout);
  }, []);

  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: '=== Azure + Terraform IaC Terminal Sandbox ===', type: 'info' },
    { text: s.welcome, type: 'info' },
    { text: TERMINAL_PROMPT, type: 'input' },
  ]);
  const [selectedRegion, setSelectedRegion] = useState<string>('West Europe');
  const [selectedSize, setSelectedSize] = useState<string>('Standard_B2ls_v2');
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deploymentStep, setDeploymentStep] = useState<number>(0); // 0: uninitiated, 1: initialized, 2: planned, 3: deployed
  const [isDiagramOpen, setIsDiagramOpen] = useState<boolean>(false);
  const [imgLoadError, setImgLoadError] = useState<boolean>(false);
  const [azureResources, setAzureResources] = useState<AzureResources>(NO_RESOURCES);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDiagramOpen) setImgLoadError(false);
  }, [isDiagramOpen]);

  useEffect(() => {
    if (!isDiagramOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDiagramOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDiagramOpen]);

  // Keep the newest terminal line in view
  useEffect(() => {
    const el = terminalEndRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [terminalLines]);

  const append = (text: string, type: LineType) => {
    setTerminalLines((prev) => [...prev, { text, type }]);
  };

  const handleClear = () => {
    setTerminalLines([
      { text: s.cleared, type: 'info' },
      { text: TERMINAL_PROMPT, type: 'input' },
    ]);
  };

  const runInit = () => {
    if (isDeploying) return;
    append('terraform init', 'input');
    append('Initializing the backend...', 'info');
    append('Initializing provider plugins...', 'info');

    schedule(() => {
      append('- Reusing previous version of hashicorp/azurerm from the dependency lock file', 'info');
      append('- Reusing previous version of hashicorp/null from the dependency lock file', 'info');
      append('- Using previously-installed hashicorp/azurerm v3.117.1', 'success');
      append('- Using previously-installed hashicorp/null v3.2.4', 'success');
      append('Terraform has been successfully initialized!', 'success');
      append(TERMINAL_PROMPT, 'input');
      setDeploymentStep(1);
    }, 800);
  };

  const runPlan = () => {
    if (isDeploying) return;
    append('terraform plan', 'input');
    if (deploymentStep < 1) {
      append(s.needInit, 'error');
      append(TERMINAL_PROMPT, 'input');
      return;
    }

    append('Terraform used the selected providers to generate the following execution plan.', 'info');

    schedule(() => {
      append('Terraform will perform the following actions:', 'info');
      [
        'azurerm_linux_virtual_machine.main',
        'azurerm_network_interface.main',
        'azurerm_network_security_group.main',
        'azurerm_public_ip.main',
        'azurerm_resource_group.main',
        'azurerm_subnet.main',
        'azurerm_subnet_network_security_group_association.main',
        'azurerm_virtual_network.main',
        'null_resource.web_provisioning',
      ].forEach((name) => append(`  + ${name} will be created`, 'success'));
      append('Plan: 9 to add, 0 to change, 0 to destroy.', 'success');
      append(TERMINAL_PROMPT, 'input');
      setDeploymentStep(2);
    }, 1000);
  };

  const runApply = () => {
    if (isDeploying) return;
    if (deploymentStep < 2) {
      append('terraform apply', 'input');
      append(s.needPlan, 'error');
      append(TERMINAL_PROMPT, 'input');
      return;
    }

    setIsDeploying(true);
    append('terraform apply -auto-approve', 'input');
    append('Terraform used the selected providers to generate the following execution plan...', 'info');

    schedule(() => {
      append('azurerm_resource_group.main: Creating...', 'info');

      // Region policy error
      if (selectedRegion === 'West Europe' || selectedRegion === 'North Europe') {
        schedule(() => {
          append('Error: RequestDisallowedByPolicy: Resource creation disallowed by subscriber policy.', 'error');
          append('↳ Reason: Allowed regions policy restricts deployments to specific zones.', 'error');
          append(s.hintRegion, 'info');
          append(TERMINAL_PROMPT, 'input');
          setIsDeploying(false);
        }, 1000);
        return;
      }

      setAzureResources((prev) => ({ ...prev, rg: true }));
      append('azurerm_resource_group.main: Creation complete after 26s', 'success');

      schedule(() => {
        append('azurerm_public_ip.main: Creating...', 'info');
        append('azurerm_virtual_network.main: Creating...', 'info');
        append('azurerm_network_security_group.main: Creating...', 'info');

        append('azurerm_public_ip.main: Creation complete after 18s', 'success');
        setAzureResources((prev) => ({ ...prev, ip: true }));

        append('azurerm_network_security_group.main: Creation complete after 21s', 'success');
        setAzureResources((prev) => ({ ...prev, nsg: true }));

        append('azurerm_virtual_network.main: Creation complete after 27s', 'success');
        setAzureResources((prev) => ({ ...prev, vnet: true }));

        schedule(() => {
          append('azurerm_subnet.main: Creating...', 'info');
          append('azurerm_subnet.main: Creation complete after 19s', 'success');

          append('azurerm_subnet_network_security_group_association.main: Creating...', 'info');
          append('azurerm_network_interface.main: Creating...', 'info');

          append('azurerm_subnet_network_security_group_association.main: Creation complete after 22s', 'success');
          append('azurerm_network_interface.main: Creation complete after 32s', 'success');

          schedule(() => {
            append('azurerm_linux_virtual_machine.main: Creating...', 'info');

            if (selectedSize === 'Standard_B2ls_v2') {
              append('Error: Code="OperationNotAllowed" Message="The subscription has a core limit of 0 for standardBsv2Family Cores."', 'error');
              append(s.hintQuota, 'info');
              append(TERMINAL_PROMPT, 'input');
              setIsDeploying(false);
              return;
            }

            if (selectedSize === 'Standard_B1s') {
              append('Error: Code="SkuNotAvailable" Message="The requested VM size Standard_B1s is currently not available in location polandcentral."', 'error');
              append(s.hintSku, 'info');
              append(TERMINAL_PROMPT, 'input');
              setIsDeploying(false);
              return;
            }

            setAzureResources((prev) => ({ ...prev, vm: true }));
            append('azurerm_linux_virtual_machine.main: Creation complete after 43s', 'success');

            schedule(() => {
              const remote = 'null_resource.web_provisioning (remote-exec):';
              append('null_resource.web_provisioning: Creating...', 'info');
              append("null_resource.web_provisioning: Provisioning with 'remote-exec'...", 'info');
              append(`${remote} Connecting to remote host via SSH...`, 'info');
              append(`${remote}   Host: ${DEMO_IP}`, 'info');
              append(`${remote} Connected!`, 'success');
              append(`${remote} 0% [Working]`, 'info');
              append(`${remote} Fetched 46.1 MB in 8s (6026 kB/s)`, 'info');
              append(`${remote} Unpacking nginx (1.30.2-1~jammy) ...`, 'info');
              append(`${remote} Setting up nginx (1.30.2-1~jammy) ...`, 'info');
              append(`${remote} ✅ Nginx is active`, 'success');
              append(`${remote} ✅ Diploma website deployed!`, 'success');
              append('null_resource.web_provisioning: Creation complete after 46s', 'success');

              setAzureResources((prev) => ({ ...prev, nginx: true }));
              append('Apply complete! Resources: 9 added, 0 changed, 0 destroyed.', 'success');
              append('Outputs:', 'info');
              append(`  public_ip_address = "${DEMO_IP}"`, 'success');
              append('  resource_group_name = "diploma-website-iac-automation-development-rg"', 'success');
              append('  total_cost_estimate = "Approx 16.10-18.60€/month with Standard_D2s_v3 VM"', 'success');
              append('  virtual_machine_name = "diploma-website-iac-automation-vm"', 'success');
              append(`  website_url = "http://${DEMO_IP}"`, 'success');
              append(TERMINAL_PROMPT, 'input');
              setIsDeploying(false);
              setDeploymentStep(3);
            }, 1500);
          }, 1200);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const runDestroy = () => {
    if (isDeploying) return;
    append('terraform destroy -auto-approve', 'input');
    append('Destroying resources...', 'info');

    schedule(() => {
      append('azurerm_linux_virtual_machine.main: Destroying...', 'info');
      append('azurerm_public_ip.main: Destroying...', 'info');
      append('azurerm_subnet.main: Destroying...', 'info');
      append('azurerm_resource_group.main: Destroying...', 'info');
      append('Destroy complete! Resources: 9 destroyed.', 'success');
      append(TERMINAL_PROMPT, 'input');

      setAzureResources(NO_RESOURCES);
      setDeploymentStep(0);
    }, 1000);
  };

  const applyPreset = (preset: Preset) => {
    if (preset === 'policy') {
      setSelectedRegion('West Europe');
      setSelectedSize('Standard_B1s');
    } else if (preset === 'quota') {
      setSelectedRegion('Poland Central');
      setSelectedSize('Standard_B2ls_v2');
    } else {
      setSelectedRegion('Poland Central');
      setSelectedSize('Standard_D2s_v3');
    }
    append(s.presetLoaded[preset], preset === 'ok' ? 'success' : 'info');
    setDeploymentStep(0);
    setAzureResources(NO_RESOURCES);
  };

  const resourceRows: { key: keyof AzureResources; label: string }[] = [
    { key: 'rg', label: s.resources.rg },
    { key: 'vnet', label: s.resources.vnet },
    { key: 'nsg', label: s.resources.nsg },
    { key: 'ip', label: s.resources.ip },
    { key: 'vm', label: s.resources.vm },
    { key: 'nginx', label: s.resources.nginx },
  ];

  const actionButton =
    'inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-sm border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
      {/* Left: scenarios, terraform.tfvars and the resource monitor */}
      <div className="flex flex-col gap-8 min-w-0">
        <section>
          <h2 className="text-sm font-semibold mb-3">{s.presetsHeading}</h2>
          <div className="flex flex-col gap-2">
            {(['policy', 'quota', 'ok'] as const).map((preset) => {
              const style = PRESET_STYLE[preset];
              const Icon = style.icon;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`flex items-center gap-2.5 text-left text-sm px-3 py-2.5 bg-sheet border border-rule border-l-4 ${style.bar} rounded-sm hover:bg-surface transition-colors cursor-pointer`}
                >
                  <Icon size={15} className={`${style.text} shrink-0`} aria-hidden="true" />
                  <span>{s.presets[preset]}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">
            <code className="text-[0.8rem]" translate="no">{s.tfvars}</code>
          </h2>
          <label className="block">
            <span className="text-xs text-ink-3 block mb-1">{s.locationLabel}</span>
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setDeploymentStep(0);
              }}
              className={selectClass}
            >
              <option value="West Europe">{s.regionOptions.west}</option>
              <option value="North Europe">{s.regionOptions.north}</option>
              <option value="Poland Central">{s.regionOptions.poland}</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-ink-3 block mb-1">{s.sizeLabel}</span>
            <select
              value={selectedSize}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                setDeploymentStep(0);
              }}
              className={selectClass}
            >
              <option value="Standard_B1s">{s.sizeOptions.b1s}</option>
              <option value="Standard_B2ls_v2">{s.sizeOptions.b2}</option>
              <option value="Standard_D2s_v3">{s.sizeOptions.d2}</option>
            </select>
          </label>
        </section>

        <section>
          <h2 className="text-sm font-semibold mb-3">{s.monitorHeading}</h2>
          <ul className="border-t border-rule">
            {resourceRows.map(({ key, label }) => {
              const up = azureResources[key];
              return (
                <li key={key} className="flex items-center justify-between gap-3 py-2 border-b border-rule-soft text-sm">
                  <span className={up ? 'text-ink' : 'text-ink-3'}>{label}</span>
                  <span className={`inline-flex items-center gap-1 text-xs ${up ? 'text-add' : 'text-ink-3'}`}>
                    {up ? <Check size={14} strokeWidth={3} /> : <Circle size={10} />}
                    <span className="sr-only">{up ? t.title.planCreated : t.title.planCreate}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setIsDiagramOpen(true)}
            className="group mt-4 flex w-full items-center gap-3 text-left text-sm border border-rule bg-sheet rounded-sm p-2 hover:border-azure transition-colors cursor-pointer"
            title={s.openDiagram}
          >
            <img
              src={DIAGRAM_URL}
              alt=""
              className="h-14 w-20 object-cover object-top rounded-[2px] border border-rule-soft bg-white shrink-0"
              width={80}
              height={56}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.visibility = 'hidden';
              }}
            />
            <span className="flex-1 leading-snug">{s.openDiagram}</span>
            <Maximize2 size={14} className="text-ink-3 group-hover:text-azure shrink-0" aria-hidden="true" />
          </button>
        </section>
      </div>

      {/* Right: simulated browser and terminal */}
      <div className="flex flex-col gap-6 min-w-0">
        <div className="rounded-sm border border-rule bg-sheet overflow-hidden flex flex-col h-[21rem]">
          <div className="flex items-center gap-3 px-3 py-2 bg-paper border-b border-rule">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-rule" />
              <span className="w-2.5 h-2.5 rounded-full bg-rule" />
              <span className="w-2.5 h-2.5 rounded-full bg-rule" />
            </span>
            <span className="text-xs text-ink-3 truncate hidden sm:block">{s.browserTab}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-rule bg-sheet">
            <Lock size={13} className="text-ink-3 shrink-0" aria-hidden="true" />
            <span className="mono text-xs text-ink-2 truncate">
              {azureResources.nginx ? `http://${DEMO_IP}/` : 'about:blank'}
            </span>
          </div>

          <div className="grow relative bg-surface">
            {azureResources.nginx ? (
              <iframe
                srcDoc={getMatrixHtml(t, DEMO_IP)}
                title={s.iframeTitle}
                className="w-full h-full border-0 absolute inset-0"
                sandbox="allow-scripts"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-center px-6">
                <h3 className="text-lg font-semibold text-ink">{s.offlineTitle}</h3>
                <p className="text-sm text-ink-3">{s.offlineText(DEMO_IP)}</p>
                <span className="mt-4 inline-block px-4 py-1.5 bg-azure text-paper text-sm rounded-sm select-none" aria-hidden="true">
                  {s.reload}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-sm bg-term text-term-text overflow-hidden flex flex-col h-[22rem] border border-rule">
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-term-2 text-xs">
            <span className="font-medium text-white">{s.terminalTitle}</span>
            <div className="flex items-center gap-4 text-term-text/75">
              <span aria-live="polite">
                {s.status}: {isDeploying ? s.statusBusy : s.statusIdle}
              </span>
              <button type="button" onClick={handleClear} className="hover:text-white transition-colors cursor-pointer">
                {s.clear}
              </button>
            </div>
          </div>

          <div className="mono grow overflow-y-auto px-4 py-3 text-[0.72rem] leading-relaxed panel-scroll select-text" role="log" translate="no">
            {terminalLines.map((line, idx) => (
              <div key={idx} className={`${LINE_STYLE[line.type]} whitespace-pre-wrap break-words`}>
                {line.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <div className="px-4 py-3 border-t border-term-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={runInit}
                disabled={isDeploying}
                className={`${actionButton} mono border-term-2 bg-term-2 text-term-text hover:bg-[#1c2f4b]`}
              >
                <Play size={11} aria-hidden="true" />
                terraform init
              </button>
              <button
                type="button"
                onClick={runPlan}
                disabled={isDeploying}
                className={`${actionButton} mono border-term-2 bg-term-2 text-term-text hover:bg-[#1c2f4b]`}
              >
                <Play size={11} aria-hidden="true" />
                terraform plan
              </button>
              <button
                type="button"
                onClick={runApply}
                disabled={isDeploying}
                className={`${actionButton} mono border-[#2f6fb3] bg-[#123a63] text-[#cfe4fb] hover:bg-[#184a7d]`}
              >
                <Play size={11} aria-hidden="true" />
                terraform apply -auto-approve
              </button>
              <button
                type="button"
                onClick={runDestroy}
                disabled={isDeploying}
                className={`${actionButton} mono border-[#7a2f29] bg-[#3a1714] text-[#ffc3bd] hover:bg-[#4d1e1a]`}
              >
                <Trash2 size={11} aria-hidden="true" />
                terraform destroy
              </button>
            </div>
            <p className="text-[0.7rem] text-term-text/55 flex items-center gap-1.5">
              <RefreshCw size={11} aria-hidden="true" />
              {s.hint}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isDiagramOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/70 overscroll-contain"
            onClick={() => setIsDiagramOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={s.diagramHeading}
              onClick={(e) => e.stopPropagation()}
              className="bg-sheet rounded-sm max-w-6xl w-full flex flex-col overflow-hidden border border-rule h-[88vh]"
            >
              <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-rule">
                <div>
                  <h3 className="font-semibold">{s.diagramHeading}</h3>
                  <p className="text-xs text-ink-3 mt-0.5">{s.diagramSub}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDiagramOpen(false)}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-rule bg-surface text-ink-2 hover:bg-rule-soft transition-colors cursor-pointer shrink-0"
                  aria-label={s.close}
                  autoFocus
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grow overflow-auto p-4 sm:p-6 bg-white flex items-center justify-center">
                {imgLoadError ? (
                  <p className="text-sm text-ink-3">{s.diagramMissing}</p>
                ) : (
                  <img
                    src={DIAGRAM_URL}
                    alt={s.diagramAlt}
                    onError={() => setImgLoadError(true)}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
