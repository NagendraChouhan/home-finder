import React, { useEffect } from "react";
import Block from "../Block";
import HomeBlock from "../HomeBlock";
import Footer from "../Footer";
import img from "../../john-schnobrich-FlPc9_VocJ4-unsplash.jpg";
import aboutImg from "../../olga-serjantu-tqkDGqPW8Vo-unsplash.jpg";
import aboutImg1 from "../../christin-hume-Hcfwew744z4-unsplash.jpg";
import aboutImg2 from "../../christin-hume-hBuwVLcYTnA-unsplash.jpg";
import aboutImg3 from "../../kobu-agency-7okkFhxrxNw-unsplash.jpg";
import findImage from "../../pexels-cottonbro-4065624.jpg"
import registerImage from "../../pexels-sevenstorm-juhaszimrus-704767.jpg"


const Home = (props) => {
  const roomContainerCSS = {
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: "0px 10%",
  };
  useEffect(()=>{
    props.setLoderfun("100%")
    setTimeout(
      function(){
    props.setLoderfun("100%",true)
      },1000)

  },[])
  return (
    <>
      <div className="home-main-div">
        <div className="home-div-container">
          <div className="img-div">
            <img src={img} alt="img" />
            <div className="centered">
              Find Your <span>Dream Home</span>
            </div>
          </div>
        </div>
        <section className="section-container">
          <div style={{backgroundColor: "#f8f8f8",
                        padding: "5% 0%"
                      }}
          >
            <div className="room-container room-container-home" style={roomContainerCSS}>
              <Block imgValue={img} display="true" texts="Zero Commission" />
              <Block
                imgValue={registerImage} display="true"texts="Register Your Home In " texts2="3 Easy Step "
              />
              <Block imgValue={findImage} display="true" texts="Find Your Home Online" />
            </div>
            {/* <span className="commi">
              <span>0</span>
              <span className="per">%</span>
            </span> */}
          </div>
        </section>
        <HomeBlock id="about"
            heading="About" 
            content="It is best platform which helps you to find your dream home online by an easy going process and<br/>
            Avoiding unnecessary and hactic process to knok each and every door."
            img={aboutImg}
          />
          {/* <HomeBlock 
            heading="Zero Account Charge" 
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic provident, necessitatibus nesciunt laudantium nemo praesentium rem iste illum vero cupiditate? Assumenda voluptatem corrupti accusamus eius voluptate quidem molestiae ipsam corporis!"
            img={aboutImg1}
            /> */}
          <HomeBlock 
            heading="Quick Account Opening" 
            content="It is so easy to open your account or <br/>
            Register your account on our platform <br/>
            In every three easy steps you can register your home on our platform<br/> 
            So that people can easily find your home."
            img={aboutImg2}
            styleValue={true}
          />
          <HomeBlock 
            heading="We Are Here To Help You" 
            content="In Register your Home to our Platform <br/>
            Finding You'r Dream Home "
            img={aboutImg3}
          />
      </div>
      <Footer/>
    </>
  );
};

export default Home;
