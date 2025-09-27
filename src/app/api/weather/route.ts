import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  let city = searchParams.get("city")?.toLowerCase() || "amsterdam";

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error("API key not found");
    }

    let url = "";
    if (lat && lon) {
      // اگر مختصات موجود بود
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;
    } else {
      // در غیر این صورت با نام شهر
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      // fallback → Amsterdam
      const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid=${apiKey}&units=metric&lang=en`;
      const fallbackRes = await fetch(fallbackUrl);
      const fallbackData = await fallbackRes.json();
      return NextResponse.json({
        city: "Amsterdam",
        temperature: fallbackData.main.temp,
        desc: fallbackData.weather[0].description,
      });
    }

    const data = await res.json();
    return NextResponse.json({
      city: data.name || city,
      temperature: data.main.temp,
      desc: data.weather[0].description,
    });
  } catch (error) {
    // اگر همه چیز شکست خورد
    return NextResponse.json(
      { city: "Amsterdam", temperature: 16, desc: "clear sky" },
      { status: 200 }
    );
  }
}
