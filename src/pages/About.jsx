import ButtonPageBack from "../components/buttons/ButtonPageBack";

function About() {
   document.title = "Sobre o projeto · Jogo do Glécio"

   return (
      <div>
         <ButtonPageBack to="/" replace={true}>Retornar</ButtonPageBack>
      </div>
   )
}
export default About;
