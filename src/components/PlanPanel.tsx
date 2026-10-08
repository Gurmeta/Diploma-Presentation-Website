import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useI18n } from '../i18n/I18nProvider';

const RESOURCES = [
  'azurerm_resource_group.main',
  'azurerm_virtual_network.main',
  'azurerm_subnet.main',
  'azurerm_network_security_group.main',
  'azurerm_subnet_network_security_group_association.main',
  'azurerm_public_ip.main',
  'azurerm_network_interface.main',
  'azurerm_linux_virtual_machine.main',
  'null_resource.web_provisioning',
];

const STEP_MS = 320;
const START_DELAY_MS = 700;

/**
 * The title slide's one animated moment: the nine resources of the thesis
 * infrastructure go from "to create" to "created", like a terraform apply.
 */
export default function PlanPanel() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const [created, setCreated] = useState<number>(reduceMotion ? RESOURCES.length : 0);
  const timersRef = useRef<number[]>([]);

  const play = useCallback(() => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
    setCreated(0);
    RESOURCES.forEach((_, i) => {
      timersRef.current.push(window.setTimeout(() => setCreated(i + 1), START_DELAY_MS + i * STEP_MS));
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    play();
    const timers = timersRef;
    return () => timers.current.forEach(window.clearTimeout);
  }, [play, reduceMotion]);

  const done = created === RESOURCES.length;

  return (
    <figure className="bg-term text-term-text rounded-sm overflow-hidden border border-rule" aria-label={t.title.planCaption}>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-2.5 bg-term-2 text-[0.72rem] text-term-text/80">
        <span className="mono truncate">$ terraform apply</span>
        <button
          type="button"
          onClick={play}
          className="inline-flex items-center gap-1.5 text-term-text/80 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw size={12} />
          {t.title.planReplay}
        </button>
      </figcaption>

      <ul className="mono text-[0.72rem] leading-6 px-4 py-3">
        {RESOURCES.map((name, i) => {
          const isCreated = i < created;
          return (
            <li key={name} className="flex items-baseline justify-between gap-3">
              <span className={`truncate ${isCreated ? 'text-[#7fe0a8]' : 'text-term-text/70'}`}>
                <span aria-hidden="true" className="inline-block w-4">{isCreated ? '✓' : '+'}</span>
                <span translate="no">{name}</span>
              </span>
              <span className={`shrink-0 text-[0.7rem] ${isCreated ? 'text-[#7fe0a8]' : 'text-term-text/60'}`}>
                {isCreated ? t.title.planCreated : t.title.planCreate}
              </span>
            </li>
          );
        })}
      </ul>

      <p className={`mono text-[0.72rem] px-4 pb-3.5 pt-3 border-t border-term-2 ${done ? 'text-[#7fe0a8]' : 'text-term-text/60'}`}>
        {done ? 'Apply complete! Resources: 9 added, 0 changed, 0 destroyed.' : 'Plan: 9 to add, 0 to change, 0 to destroy.'}
      </p>
    </figure>
  );
}
