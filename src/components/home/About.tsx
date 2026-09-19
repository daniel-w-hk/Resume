'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useMessages } from '@/lib/i18n/useMessages';

interface AboutProps {
    content: string;
    title?: string;
}

export default function About({ content, title }: AboutProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.about;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white px-6 py-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:px-9 sm:py-10"
        >
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <h2 className="relative mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{resolvedTitle}</h2>
            <div className="relative text-base leading-relaxed text-neutral-700 dark:text-neutral-600 sm:text-lg">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => <h1 className="mb-6 max-w-3xl text-3xl font-serif font-bold leading-tight tracking-tight text-primary sm:text-5xl">{children}</h1>,
                        h2: ({ children }) => <h2 className="mb-4 mt-8 text-2xl font-serif font-bold text-primary">{children}</h2>,
                        h3: ({ children }) => <h3 className="mb-3 mt-6 text-xl font-semibold text-primary">{children}</h3>,
                        p: ({ children }) => <p className="mb-5 max-w-3xl text-pretty last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-5">{children}</ul>,
                        ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-5">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        a: ({ ...props }) => (
                            <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                            />
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                        em: ({ children }) => <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
}
