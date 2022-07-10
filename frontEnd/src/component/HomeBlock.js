import React from 'react'

const HomeBlock = (props) => {
    let imgCSS={}
    let imgDivCSS={}
    if(props.styleValue){
        imgCSS={left: 0}
        imgDivCSS={flexDirection:"row-reverse"}
    }
  return (
    <section className="section-container">
        <div className="section-div">
            <div className="div-container">
                <div className="img-div" style={imgDivCSS}>
                    <div className="about-div">
                        <h1>{props.heading}</h1>
                        <p>{props.content}</p>
                    </div>
                    <img src={props.img} style={imgCSS} alt="aboutImg"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HomeBlock