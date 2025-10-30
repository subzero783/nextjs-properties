import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  const imageSrc = image.includes("cloudinary") ? image : `/images/properties/${image}`;

  return (
    <section className="property-header-image">
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={imageSrc}
            // src={`/images/properties/${image}`}
            // src={image}
            alt=""
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
