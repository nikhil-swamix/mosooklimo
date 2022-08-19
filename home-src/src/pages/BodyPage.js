import React from "react";
import styles from "../assets/css/Body.module.css";
// import world from "../images/world.jpeg";

const BodyPage = () => {
  return (
    <>
      <div
        className={`${styles.imgWrap} fluid-container mt-5`}
        style={{
          paddingBottom: "1em",
          marginBottom: "1em",
        }}
        id="contain"
      >
        <div id="contain_main">
          <div className="row" style={{ marginTop: "1em" }}>
         
          </div>
          <div className={`row mt-4 `}>
            <div className="col-12 col-lg-6">
              <div className={"row"}>
                
                {} {} {}
                <div className={"col,ro"}>
                  <video width="100%" height="100%"  loop="true" autoplay="autoplay"  muted>
                    <source src="video/Limo-updated.mp4" type="video/mp4" />
                  </video>
                  {/*<img src="https://techbinge.org/wp-content/uploads/2022/07/limo.gif" />*/}
                  <div> {} </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div>
                <p className="h2" style={{ textAlign: "center" }}>
                  
                  {/* About Mosook Limo */}
                </p>
                <div>
              <h2 className="" style={{ color: "#d8b65d",textAlign:"center" }}>
                Who We Are
              </h2>
              {}
            </div>
                <p className="text-justify mt-3 colog">
                  Mosook Limo Family Enterprise Is A Leading(Mosook Group) We
                  Offer Qualitative Services In Accordance With Saudi Standard
                  And Now We Are Opening Our New Business Chauffeur Service For
                  Vip’ s Clients In The Kingdom Of Saudi Arabia.We Are Providing
                  Services All Over The World.Specially Ksa, Bahrain, Jordan,
                  Oman, Lebanon, Turkey, Uae, Uk, Usa, Germany, India And
                  Pakistan.The Group Has Plans To Establish Car With Driver As A
                  Regional Brand In Services For Primarily Corporate Customers
                  And B2B Services For Corporate, Travel Companies, Airlines,
                  And Hotels Etc.
                </p>
              </div>
              <div className="col-12 col-lg-12"> </div>
            </div>
          </div>
        </div>
      </div>
      <div className="counter">
        <div className={"row"}>
          <div className={"col-lg-4"}>
            
            <p className="h4" style={{ color: "#d8b65d", textAlign: "center" }}>
              
              <div>
                <img
                  className="review-image"
                  src="./carousel/electric-car.png"
                  alt="car"
                />
              </div>
              15+ Years
            </p>
            <p className="center mt-2 ">
              We have been helping travelers making their travel surprisingly
              easy and enjoyable since 2003.
            </p>
          </div>
          <div className={"col-lg-4"}>
            
            <p className="h4" style={{ color: "#d8b65d", textAlign: "center" }}>
              
              <div>
                <img
                  className="review-image"
                  src="./carousel/country.png"
                  alt="country"
                />
              </div>
              130 Countries
            </p>
            <p className=" center mt-2">
              The service of is available worldwide in more than 130 countries!
            </p>
          </div>
          <div className={"col-lg-4"}>
            
            <p className="h4" style={{ color: "#d8b65d", textAlign: "center" }}>
              
              <div>
                <img
                  className="review-image"
                  src="./carousel/reviews.png"
                  alt="review"
                />
              </div>
              4.5 Rating
            </p>
            <p className=" center mt-2">
              We are proud that our customers give us the highest rating in the
              industry!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyPage;
