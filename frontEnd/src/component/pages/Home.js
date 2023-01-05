import React, { useEffect } from "react";
import Block from "../Block";
import HomeBlock from "../HomeBlock";
import Footer from "../Footer";
import img from "../../john-schnobrich-FlPc9_VocJ4-unsplash.jpg";
import aboutImg from "../../olga-serjantu-tqkDGqPW8Vo-unsplash.jpg";
import homeImg from "../../pexels-photo-280221.jpeg";
import aboutImg3 from "../../help_img_page-0001.jpg";
import findImage from "../../pexels-cottonbro-4065624.jpg";
import registerImage from "../../pexels-sevenstorm-juhaszimrus-704767.jpg";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const roomContainerCSS = {
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: "0px 10%",
  };
  useEffect(() => {
    props.setLoderfun("100%");
    setTimeout(function () {
      props.setLoderfun("100%", true);
    }, 1000);
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="home-main-div">
        <div className="home-div-container">
          <div className="img-div">
            <img src={homeImg} alt="img" />
            <div
              className="centered"
              style={{
                fontFamily: "sans-serif",
                fontWeight: "700",
              }}
            >
              <div className="typing">
                Find Your{" "}
                <span
                  style={{ color: "#00bfff", textShadow: "1px 1px 1px white" }}
                >
                  Dream Home
                </span>
              </div>
              <br />
            </div>
            <div></div>
          </div>
        </div>
        <section className="section-container">
          <div
            style={{
              backgroundColor: "#f8f8f8",
              padding: "5% 0%",
              marginBottom: "50px",
            }}
          >
            <div
              className="room-container room-container-home"
              style={roomContainerCSS}
            >
              <Block imgValue={img} display="true" texts="Zero Commission" />
              <Block
                imgValue={registerImage}
                display="true"
                texts="Register Your Home In "
                texts2="3 Easy Step "
              />
              <Block
                imgValue={findImage}
                display="true"
                texts="Find Your Home Online"
              />
            </div>
            {/* <span className="commi">
              <span>0</span>
              <span className="per">%</span>
            </span> */}

            <div>
              <button
                onClick={() => navigate("/rooms")}
                className="find-room-btn"
              >
                Find Your Home{" "}
              </button>
            </div>
          </div>
        </section>
        <HomeBlock
          id="about"
          heading1="About "
          heading2="Us"
          keyPoint="save your time"
          subHeading="We Make Your Life Easier"
          content="It is best platform which helps you to find your dream home online by an easy going process and<br/>
            Avoiding unnecessary and hactic process to knok each and every door."
          point1="Finding Home Online"
          point2="Register your Home"
          img={aboutImg}
        />
        {/* <HomeBlock 
            heading="Zero Account Charge" 
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic provident, necessitatibus nesciunt laudantium nemo praesentium rem iste illum vero cupiditate? Assumenda voluptatem corrupti accusamus eius voluptate quidem molestiae ipsam corporis!"
            img={aboutImg1}
            /> */}
        <HomeBlock
          heading1="Why "
          heading2="US?"
          keyPoint="save your money"
          subHeading="We Are Here To Help You."
          content="
          Register your Home to our Platform or Finding Your Dream Home For You <br/>
          It is so easy to open your account or Register your account on our platform.<br/>
            You can register your home on our platform, So that people can easily find your home."
          point1="Quick Account Opening"
          point2="Freely Available"
          img={aboutImg3}
          styleValue={true}
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
