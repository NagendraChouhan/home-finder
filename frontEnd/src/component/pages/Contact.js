import React from 'react';

const Contact = () => {
    window.scrollTo(0, 0)

    return (
        <>
            <section className="contact" id="contact">

                <h1 className="heading"> <span>contact</span> us </h1>

                <div className="contact-inner-div">
                    <div className="phone">
                        <h1>PHONE NUMBER</h1>
                        <p>9587456321</p>
                        <p>888-555-222 <br />(Tol Free)</p>
                    </div>
                    <div className="email">
                        <h1>EMAIL</h1>
                        <p>abc@1234gmail.com</p>
                    </div>
                    <div className="office">
                        <h1>OUR OFFICE</h1>
                        <p>adress of office</p>
                    </div>
                </div>
                <h1 className="heading">enquiry</h1>
                <form action="" className="contact-form">

                    <div className="contact-form-inputBox">
                        <input type="text" placeholder="name" />
                        <input type="email" placeholder="email" />
                    </div>

                    <div className="inputBox">
                        <input type="number" placeholder="number" />
                        <input type="text" placeholder="subject" />
                    </div>

                    <textarea placeholder="message" name="" id="" cols="30" rows="10"></textarea><br />

                    <button type="submit" className="btn">send message</button>

                </form>

            </section>
        </>
    )
}

export default Contact;