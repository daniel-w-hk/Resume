'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import type { ProfileMetric } from '@/components/home/HomePageClient';
import { useMessages } from '@/lib/i18n/useMessages';

interface ProfileProps {
    author: SiteConfig['author'];
    social: SiteConfig['social'];
    competencies?: string[];
    metrics?: ProfileMetric[];
}

export default function Profile({ author, social, competencies, metrics }: ProfileProps) {
    const messages = useMessages();
    const email = typeof social.email === 'string' ? social.email : undefined;
    const location = typeof social.location === 'string' ? social.location : undefined;
    const github = typeof social.github === 'string' ? social.github : undefined;
    const linkedin = typeof social.linkedin === 'string' ? social.linkedin : undefined;
    const resume = typeof social.resume === 'string' ? social.resume : undefined;

    return (
        <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
            aria-label={author.name}
        >
            <div className="profile-card rounded-3xl border border-neutral-200/80 bg-white/90 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80 sm:p-6">
                <div className="relative mx-auto mb-6 aspect-[4/5] w-full max-w-[17rem] overflow-hidden rounded-2xl bg-neutral-100 shadow-sm dark:bg-neutral-800">
                    <Image
                        src={author.avatar}
                        alt={`Portrait of ${author.name}`}
                        fill
                        sizes="(max-width: 1024px) 272px, 240px"
                        className="object-cover object-center"
                        priority
                    />
                </div>

                <div className="mb-5 text-center lg:text-left">
                    {author.eyebrow && (
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                            {author.eyebrow}
                        </p>
                    )}
                    <h1 className="mb-2 text-3xl font-serif font-bold tracking-tight text-primary">
                        {author.name}
                    </h1>
                    <p className="text-base font-semibold leading-snug text-neutral-700 dark:text-neutral-600">
                        {author.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                        {author.institution}
                    </p>
                    {location && (
                        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-neutral-500">
                            <MapPin className="h-4 w-4" aria-hidden="true" />
                            {location}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {resume && (
                        <Link
                            href={resume}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            <FileText className="h-4 w-4" aria-hidden="true" />
                            {messages.profile.viewResume}
                        </Link>
                    )}
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-background px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-neutral-700"
                        >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            {messages.profile.contact}
                        </a>
                    )}
                </div>

                {(github || linkedin) && (
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800 lg:justify-start">
                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-accent"
                            >
                                <Github className="h-4 w-4" aria-hidden="true" />
                                GitHub
                            </a>
                        )}
                        {linkedin && (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-accent"
                            >
                                <Linkedin className="h-4 w-4" aria-hidden="true" />
                                LinkedIn
                            </a>
                        )}
                    </div>
                )}
            </div>

            {metrics && metrics.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                    {metrics.map((metric) => (
                        <div
                            key={`${metric.value}-${metric.label}`}
                            className="rounded-2xl border border-neutral-200/80 bg-white/80 p-4 dark:border-neutral-800 dark:bg-neutral-900/70"
                        >
                            <p className="text-lg font-bold tracking-tight text-primary">{metric.value}</p>
                            <p className="mt-1 text-xs leading-snug text-neutral-500">{metric.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {competencies && competencies.length > 0 && (
                <div className="mt-4 rounded-2xl border border-neutral-200/80 bg-white/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/70">
                    <h2 className="mb-3 text-sm font-semibold text-primary">
                        {messages.profile.coreCompetencies}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {competencies.map((competency) => (
                            <span
                                key={competency}
                                className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-dark dark:text-accent-light"
                            >
                                {competency}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </motion.aside>
    );
}
