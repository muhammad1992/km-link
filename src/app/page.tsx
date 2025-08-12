import {headers} from "next/headers";

type Action = { id: string; title: string; subtitle?: string; href: string; icon?: string };

interface CompanyProfile {
    handle: string;
    name?: string;
    primaryColor?: string;
    background?: string;
    logo?: string;
    about?: string;
    actions?: Action[];
    socials?: { id: string; title: string; subtitle?: string; href: string }[];
    footer?: { text: string; linkText: string; href: string };
}

async function getCompany(): Promise<CompanyProfile> {
    // Build an absolute base URL to avoid "Failed to parse URL from /api/company" on the server
    const h = await headers();
    const forwardedProto = h.get("x-forwarded-proto") ?? undefined;
    const forwardedHost = h.get("x-forwarded-host") ?? undefined;
    const host = forwardedHost ?? h.get("host") ?? undefined;

    const envBase = process.env.NEXT_PUBLIC_BASE_URL?.trim();
    const base = envBase && /^https?:\/\//i.test(envBase)
        ? envBase.replace(/\/$/, "")
        : host
            ? `${forwardedProto ?? "http"}://${host}`
            : "http://localhost:3000";

    const res = await fetch(`${base}/api/open/data/company`, {
        cache: "no-store",
    });
    return res.json();
}

function Button({
                    href,
                    title,
                    subtitle,
                    icon,
                    color,
                }: {
    href: string;
    title: string;
    subtitle?: string;
    icon?: string;
    color: string;
}) {
    return (
        <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block w-full rounded-lg px-5 py-4 shadow-sm transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
                backgroundColor: `#0a3c69`,
                color: "#fff",
            }}
        >
            <div className="flex flex-col items-center text-center">
                <div className="font-semibold" style={{color}}>{icon ? `${icon} ` : ""}{title}</div>
                {subtitle && (
                    <div className="text-xs opacity-90 mt-1" style={{color}}>{subtitle}</div>
                )}
            </div>
        </a>
    );
}

export default async function Home() {
    const received = await getCompany();

    // Defaults provided by you
    const defaults = {
        logo: "/ogo.png",
        handle: "kengmakon",
        phone: "+998 (98) 300 36 76",
        phoneHref: "tel:+998983003676",
        catalog: "https://kengmakon.uz/catalog/spalnyy-garnitur",
        socials: {
            telegram: "https://t.me/kengmakonuz",
            instagram: "https://www.instagram.com/kengmakon.uzb/",
            facebook: "https://www.facebook.com/profile.php?id=100085820027934",
        },
    } as const;

    const color = "#fff"; // enforced primary color per requirement
    const background = received.background ?? "#ffffff"; // pure white default
    const logo = received.logo || defaults.logo;
    const handle = received.handle || defaults.handle;

    const actions: Action[] = (received.actions && received.actions.length > 0)
        ? received.actions
        : [
            {
                id: "call",
                title: "Звонок",
                subtitle: "Позвоните для подробной информации",
                href: defaults.phoneHref,
                icon: "📞"
            },
            {
                id: "catalog",
                title: "Каталог",
                subtitle: "Ознакомьтесь с нашим каталогом",
                href: defaults.catalog,
                icon: "📘"
            },
        ];

    const socials = (received.socials && received.socials.length > 0)
        ? received.socials
        : [
            {id: "telegram", title: "Telegram", subtitle: "Подпишитесь на наш канал", href: defaults.socials.telegram},
            {id: "instagram", title: "Instagram", subtitle: "Следите за новостями", href: defaults.socials.instagram},
            {id: "facebook", title: "Facebook", subtitle: "Будьте в курсе новостей", href: defaults.socials.facebook},
        ];

    return (
        <div className="min-h-dvh flex justify-center" style={{background}}>
            <main className="w-full max-w-2xl px-4 sm:px-6 md:px-8 py-10">
                <div className="flex flex-col items-center gap-3">

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        width: '150px',
                        height: '150px',
                        backgroundColor: '#0a3c69',
                    }}>

                    {logo && (
                        <img src={logo} alt={`${received.name ?? handle} logo`} style={{
                            height: '70px',
                            backgroundColor: '#0a3c69',
                        }}/>
                    )}
                    </div>

                    <h1 className="text-base font-medium" style={{color: '#777777', fontWeight: 'bold'}}>{handle}</h1>
                </div>

                <section className="mt-6 space-y-4">
                    {actions.map((a: Action) => (
                        <Button key={a.id} href={a.href} title={a.title} subtitle={a.subtitle} icon={a.icon}
                                color={color}/>
                    ))}
                </section>

                <div className="my-8 flex items-center" aria-hidden>
                    <div className="h-px w-full bg-black/10"/>
                </div>

                <section className="space-y-4">
                    {socials.map((s: { id: string; title: string; subtitle?: string; href: string }) => (
                        <Button key={s.id} href={s.href} title={s.title} subtitle={s.subtitle} color={color}/>
                    ))}
                </section>

                {received.footer && (
                    <footer className="text-center text-xs text-black/50 mt-10">
                        {received.footer.text} <a className="underline" href={received.footer.href} target="_blank"
                                                  rel="noopener noreferrer">{received.footer.linkText}</a>
                    </footer>
                )}
            </main>
        </div>
    );
}
