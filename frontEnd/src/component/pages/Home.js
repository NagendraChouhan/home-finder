import React from "react";
import Block from "../Block";
import HomeBlock from "../HomeBlock";
import img from "../../john-schnobrich-FlPc9_VocJ4-unsplash.jpg";
import aboutImg from "../../olga-serjantu-tqkDGqPW8Vo-unsplash.jpg";
import aboutImg1 from "../../christin-hume-Hcfwew744z4-unsplash.jpg";
import aboutImg2 from "../../christin-hume-hBuwVLcYTnA-unsplash.jpg";
import aboutImg3 from "../../kobu-agency-7okkFhxrxNw-unsplash.jpg";


const Home = () => {
  const roomContainerCSS = {
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: "0px 10%",
  };
  return (
    <>
      <div className="home-main-div">
        <div className="home-div-container">
          <div className="img-div">
            <img src={img} alt="img" />
            <div className="centered">
              Find Your <span>Dream Room</span>
            </div>
          </div>
        </div>
        <section className="section-container">
          <div style={{backgroundColor: "#f8f8f8",
                        padding: "5% 0%"
                      }}
          >
            <div className="room-container" style={roomContainerCSS}>
              <Block img={img} display="true" texts="Zero Commission" />
              <Block
                img={img} display="true"texts="Register Your Room In " texts2="3 Easy Step "
              />
              <Block img={img} display="true" texts="Find Rooms Online" />
            </div>
          </div>
        </section>
        <HomeBlock 
            heading="About" 
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic provident, necessitatibus nesciunt laudantium nemo praesentium rem iste illum vero cupiditate? Assumenda voluptatem corrupti accusamus eius voluptate quidem molestiae ipsam corporis!"
            img={aboutImg}
          />
          <HomeBlock 
            heading="Zero Account Charge" 
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic provident, necessitatibus nesciunt laudantium nemo praesentium rem iste illum vero cupiditate? Assumenda voluptatem corrupti accusamus eius voluptate quidem molestiae ipsam corporis!"
            img={aboutImg1}
            styleValue={true}
          />
          <HomeBlock 
            heading="Quick Account Opening" 
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic provident, necessitatibus nesciunt laudantium nemo praesentium rem iste illum vero cupiditate? Assumenda voluptatem corrupti accusamus eius voluptate quidem molestiae ipsam corporis!"
            img={aboutImg2}
          />
          <HomeBlock 
            heading="We Are Here To Help You" 
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic provident, necessitatibus nesciunt laudantium nemo praesentium rem iste illum vero cupiditate? Assumenda voluptatem corrupti accusamus eius voluptate quidem molestiae ipsam corporis!"
            img={aboutImg3}
            styleValue={true}
          />
      </div>
    </>
  );
};

export default Home;
