"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;

      const property = await fetchProperty(id);
      try {
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return <h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>;
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          {/* Start: Go Back to Properties */}
          <section className="back-to-properties-section">
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties/"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          {/* End: Go Back to Properties */}
          {/* Start */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1  w-full gap-6 container-main-aside">
                <PropertyDetails property={property} />
                {/* Sidebar */}
                <aside className="space-y-4">
                  {/* Bookmark Button */}
                  <BookmarkButton property={property} />
                  {/* Share Button */}
                  <ShareButtons property={property} />
                  {/* Contact Form */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
          {/* End */}
        </>
      )}
    </>
  );
};

export default PropertyPage;
