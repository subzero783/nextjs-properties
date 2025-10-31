import { useEffect, useState } from "react";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoMdCloseCircle } from "react-icons/io";

const PropertyImages = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const handleCloseModal = () => {
    // When #property-close-container is clicked, close the property-image-modal
    const propertyImageModal = document.getElementById("property-image-modal");
    propertyImageModal.style.display = "none";
  };

  const handleModalOpening = (e) => {
    // When a property-image is clicked, open the property-image-modal
  };

  useEffect(() => {
    console.log(`The slide has changed to: ${currentSlide}`);
    // When currentSlide state changes, change the property-image-slide active class
    const propertyImageSlides = document.querySelectorAll(".property-image-slide");
    propertyImageSlides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }, [currentSlide]);

  return (
    <>
      <section className="property-images">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${images.length === 3 && index === 2 ? "col-span-2" : "col-span-1"}`}
              >
                <Image
                  src={image}
                  alt=""
                  className="property-image w-full rounded-xl"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                  onClick={() => {
                    handleModalOpening();
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="property-image-modal">
        <div className="property-image-slider">
          {images.map((image, index) => (
            <div
              className={`property-image-slide ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <Image
                src={image}
                alt=""
                className={`slide-image`}
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
              />
            </div>
          ))}
          <div id="property-image-slider-buttons">
            <SlArrowLeft
              onClick={() => {
                handlePrevSlide();
              }}
            />
            <SlArrowRight
              onClick={() => {
                handleNextSlide();
              }}
            />
          </div>
          <div
            id="property-close-container"
            onClick={() => {
              handleCloseModal();
            }}
          >
            <IoMdCloseCircle />
          </div>
          <div className="property-images-modal-slide-number">
            <span className="current-slide">{currentSlide + 1} </span>
            <span className="number-of-slides">/ {images.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default PropertyImages;
