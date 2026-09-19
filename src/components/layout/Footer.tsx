'use client';

import { useLocaleStore } from '@/lib/stores/localeStore';
import { useMessages } from '@/lib/i18n/useMessages';

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  ownerName?: string;
  ownerNameByLocale?: Record<string, string>;
  defaultLocale?: string;
}

export default function Footer({
  lastUpdated,
  lastUpdatedByLocale,
  ownerName,
  ownerNameByLocale,
  defaultLocale = 'en',
}: FooterProps) {
  const locale = useLocaleStore((state) => state.locale);
  const messages = useMessages();

  const resolvedLastUpdated =
    lastUpdatedByLocale?.[locale] ||
    (defaultLocale ? lastUpdatedByLocale?.[defaultLocale] : undefined) ||
    lastUpdated ||
    new Date().toLocaleDateString(locale || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const resolvedOwnerName =
    ownerNameByLocale?.[locale] ||
    (defaultLocale ? ownerNameByLocale?.[defaultLocale] : undefined) ||
    ownerName ||
    '';

  return (
    <footer className="border-t border-neutral-200/50 bg-neutral-50/50 dark:bg-neutral-900/50 dark:border-neutral-700/50">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs font-medium text-neutral-600">
              © {new Date().getFullYear()} {resolvedOwnerName}
            </p>
            <p className="mt-1 text-xs text-neutral-500">{messages.footer.evidenceAvailable}</p>
          </div>
          <p className="text-xs text-neutral-500">
            {messages.footer.lastUpdated}: {resolvedLastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
