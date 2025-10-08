// Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    // const res = await fetch(`${apiDomain}/properties${showFeatured ? "/featured" : ""}`, { cache: "force-cache" });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties${showFeatured ? "/featured" : ""}`, { cache: "force-cache" });

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

    // const res = await fetch(`${apiDomain}/properties/${id}`, { cache: "force-cache" });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`, { cache: "force-cache" });

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
