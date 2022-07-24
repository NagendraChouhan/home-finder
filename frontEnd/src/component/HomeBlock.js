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
                    <div className='heading-div'>
                       <h2>{props.heading}</h2>
                    </div> 
                <div className="img-div" style={imgDivCSS}>
                    <div className="about-div">
                        <p dangerouslySetInnerHTML={{__html:props.content}}></p>
                    </div>
                    <img src={props.img} style={imgCSS} alt="aboutImg"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HomeBlock