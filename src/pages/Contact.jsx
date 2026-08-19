import NavBar from "../components/NavBar";

function Contact() {
  return (
    <>
      <NavBar />
      <h1>Contact 📞</h1>
      <form>
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Mensaje" />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
export default Contact;
