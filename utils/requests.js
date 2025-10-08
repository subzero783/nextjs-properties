// const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export const dynamic = "force-dynamic";

// Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties${showFeatured ? "/featured" : ""}`, { cache: "no-store" }, { next: { revalidate: 3600 } });
    // const res = await fetch(`${apiDomain}/properties${showFeatured ? "/featured" : ""}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch Single Property
async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      return null;
    }

    // const res = await fetch(`${apiDomain}/properties/${id}`, { cache: "force-cache" }, { next: { revalidate: 3600 } });
    // const res = await fetch(`${apiDomain}/properties/${id}`, { cache: "no-store" });
    const res = await fetch(`${apiDomain}/properties/${id}`, { cache: "no-store" }, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error("Failed to fetch properties data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
