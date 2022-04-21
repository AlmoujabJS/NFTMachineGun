import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./style.css";

const Contact = () => {
  const form = useRef();
  const DIV = document.createElement("div");
  DIV.classList.add("message_is_sent");
  const sendEmail = (e) => {
    e.preventDefault();

    //FORM VALIDATION
    const INPUTS = [...form.current.querySelectorAll("input, textarea")];
    //Empty INP Check
    for (let inp of INPUTS) {
      if (inp.value.length === 0) {
        return;
      }
    }
    //Email validation
    if (
      !INPUTS[2].value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      alert("Please enter a valid email");
      return;
    }

    emailjs
      .sendForm(
        "service_vl9k1zb00",
        "template_k5z3sij",
        form.current,
        "-dmvF8-iWMc-JVH_n"
      )
      .then(
        (result) => {
          form.current.reset();
          DIV.innerHTML = "Message Is Sent";
          document.body.append(DIV);

          setTimeout(() => {
            DIV.parentElement.removeChild(DIV);
          }, 4000);
        },
        (error) => {
          DIV.innerHTML = `Message Not Sent Error`;
          document.body.append(DIV);
          DIV.style.color = "red";

          setTimeout(() => {
            DIV.parentElement.removeChild(DIV);
          }, 4000);
        }
      );
  };
  useEffect(() => {
    [
      ...document.querySelectorAll("#get_in_touch input,#get_in_touch textarea")
    ].forEach((inp) => {
      inp.addEventListener("focus", focusedInput);
      inp.addEventListener("blur", focusedInput);
    });
  });
  function focusedInput(e) {
    const targetId = e.target.id;
    const targetLabel = document.querySelector(`label[for="${targetId}"]`);

    if (e.type === "focus" || e.target.value.length !== 0) {
      targetLabel.classList.add("active");
    } else {
      targetLabel.classList.remove("active");
    }
  }

  return (
    <section
      id="nft-machinegun-contact-form"
      className="container contact__container animate-fadein"
    >
      <form ref={form} id="get_in_touch" onSubmit={sendEmail}>
        <h1>Get In Touch</h1>
        <label htmlFor="input_name">Full Name</label>
        <input required id="input_name" type="text" name="user_name" />
        <label htmlFor="input_subject">Subject</label>
        <input required id="input_subject" type="text" name="subject" />
        <label htmlFor="input_email">Email</label>
        <input required id="input_email" type="email" name="user_email" />
        <label htmlFor="input_message">Message...</label>
        <textarea
          required
          id="input_message"
          name="message"
          cols="30"
          rows="10"
        ></textarea>
        <button className="btn btn-primary" type="submit" value="Send">
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
