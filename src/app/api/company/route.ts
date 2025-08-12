import { NextResponse } from "next/server";

// Simple API to serve company profile data for the one-page link site.
// Customize the payload below or replace it with a real upstream API call.

export async function GET() {
  // In a real-world case, you might fetch from process.env.COMPANY_API_URL
  // const res = await fetch(process.env.COMPANY_API_URL!, { cache: "no-store" });
  // const data = await res.json();

  const data = {
    handle: "higolduzbekistan",
    name: "Higold Uzbekistan",
    primaryColor: "#002a50",
    background: "#f5f7fb",
    // You can host logos in /public and reference them via relative URL here
    logo: "/logo-higold.svg",
    about: "Premium furniture fittings and accessories in Uzbekistan",
    actions: [
      {
        id: "call",
        title: "Звонок",
        subtitle: "Позвоните для подробной информации",
        href: "tel:+998900000000",
        icon: "📞",
      },
      {
        id: "catalog",
        title: "Каталог",
        subtitle: "Ознакомьтесь с нашим каталогом",
        href: "https://example.com/catalog.pdf",
        icon: "📘",
      },
      {
        id: "location",
        title: "Локация",
        subtitle: "Приходите в наш шоурум",
        href: "https://maps.google.com/?q=Higold%20Uzbekistan",
        icon: "📍",
      },
    ],
    socials: [
      {
        id: "facebook",
        title: "Facebook",
        subtitle: "Будьте в курсе новостей и подпишитесь на наш фейсбук",
        href: "https://facebook.com/higolduzbekistan",
      },
      {
        id: "instagram",
        title: "Instagram",
        subtitle: "Следите за новостями в нашем инстаграме",
        href: "https://instagram.com/higolduzbekistan",
      },
      {
        id: "tiktok",
        title: "Tik tok",
        subtitle: "Получайте полезную информацию про фурнитуру",
        href: "https://tiktok.com/@higolduzbekistan",
      },
      {
        id: "youtube",
        title: "Youtube",
        subtitle: "Подписывайтесь на наш ютуб канал",
        href: "https://youtube.com/@higolduzbekistan",
      },
    ],
    footer: {
      text: "Сделано на",
      linkText: "Taplink.ru",
      href: "https://taplink.cc/higolduzbekistan",
    },
  } as const;

  return NextResponse.json(data, { status: 200 });
}
