import React from "react";
import Gallery from "react-photo-gallery";

const photos = [
  {
    src: "./places/1.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "./places/2.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "./places/3.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "./places/4.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "./places/8.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "./places/6.jpg",
    width: 4,
    height: 3,
  },
];
const currentSelection = {};
const GalleryView = () => {
  return (
    <div style={{ backgroundColor: "#292935", marginTop: "-150px" }}>
      <div className="container">
        <div style={{ padding: "120px" }}>
          <div className="text-center pt-5 pb-5">
            <p className="h6" style={{ color: "#f7c832" }}>
            Where Is Your Next Location?
            </p>
          </div>
          <Gallery photos={photos} />
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
