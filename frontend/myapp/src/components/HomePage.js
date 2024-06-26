import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import image from "../assets/images/software.png";
import image1 from "../assets/images/datascience.jpg";
import image2 from "../assets/images/ia.png";
import image3 from "../assets/images/bigdata.png";
import image4 from "../assets/images/cyberSecurity.jpg";
import image5 from "../assets/images/mobile_development.jpg";
import image6 from "../assets/images/embedded.jpg";
import image7 from "../assets/images/iot.jpg";
import userCoding1 from "../assets/images/user_coding1.jpg";
import userCoding2 from "../assets/images/user_coding2.jpg";
import userCoding3 from "../assets/images/user_coding3.jpg";
import userCoding4 from "../assets/images/user_coding4.jpg";

function HomePage() {
  const languages = [
    "Javascript",
    "HTML",
    "Python",
    "CSS",
    "PHP",
    "JAVA",
    "TypeScript",
    "C++",
    "Langage R",
    "C#",
  ];
  const achievments = [
    {
      Name: "Patrick Johnson",
      Occupation: "Web Developer",
      Testimonial:
        "DebugMaster has been a game-changer for my development projects. The community and resources here are unparalleled. I've found solutions to complex issues, gained insights from experts, and elevated my coding skills. It's my go-to platform for all things web development.",
      image:
        "https://img.freepik.com/photos-gratuite/heureux-jeune-homme-affaires-caucasien_171337-735.jpg?w=996&t=st=1702375133~exp=1702375733~hmac=3d09c038c66aead7c173cdb6f375a398532e19b5c693deb5c1ca36af142496fe",
    },
    {
      Name: "Alex Rodriguez",
      Occupation: "Frontend Developer",
      image:
        "https://img.freepik.com/photos-gratuite/portrait-excite-homme-affaires-habille-complet_171337-173.jpg?w=996&t=st=1702375413~exp=1702376013~hmac=0cb46baee6d456e21f8ee29646b18f57bf8d710bbc60afdf38abce3c29250ebd",
      Testimonial:
        "I can't thank DebugMaster enough for the support I've received. The forums are a goldmine of knowledge, and the tutorials are incredibly helpful. I overcame a stubborn bug that had me stuck for days, thanks to the collaborative community. DebugMaster is an invaluable asset for any developer.",
    },
    {
      Name: "Emily Turner",
      Occupation: "Full Stack Developer",
      image:
        "https://img.freepik.com/photos-gratuite/jolie-fille-independante-utilisant-ordinateur-portable-assis-sol-souriant_176420-20221.jpg?w=996&t=st=1702375452~exp=1702376052~hmac=469285a3f87f8b4049dd98d457c15bafd60f6f33b575ee03fc115e90c23e41c6",
      Testimonial:
        "DebugMaster is my secret weapon in web development. The troubleshooting guides are comprehensive, and the community's responsiveness is impressive. I've shared my challenges, received insightful feedback, and celebrated victories together. It's more than a platform; it's a supportive community.",
    },
    {
      Name: "Emylie Patel",
      Occupation: "Backend Developer",
      image:
        "https://img.freepik.com/photos-gratuite/close-up-portrait-of-beautiful-young-brunette-female-sitting-at-white-desk-in-front-of-computer-at-home_176532-7908.jpg?w=996&t=st=1702375905~exp=1702376505~hmac=627fffa459c94228ad916ff36c03a47e130d5952e2591646a74e05ada9766063",
      Testimonial:
        "As a backend developer, finding solutions quickly is crucial. DebugMaster has been my go-to resource for debugging, optimization, and staying updated on the latest trends. The knowledge-sharing environment is unmatched, making it an essential tool for any web developer.",
    },
    {
      Name: "Anna O Connor",
      Occupation: "Junior Web Developer",
      image:
        "https://img.freepik.com/photos-gratuite/belle-jeune-femme-tenant-ordinateur-portable-tout-etant-assis-sol-jambes-croisees-regardant-loin-espace-copie-isole-mur-gris_231208-1727.jpg?w=996&t=st=1702375832~exp=1702376432~hmac=ba8acb0b891b76821566589c7b744907f6e3fd16bde24cbce4bb02c6178d9b9f",
      Testimonial:
        "Being new to web development, DebugMaster has been my lifeline. The step-by-step guides and supportive community have accelerated my learning curve. I've not only found solutions to my problems but also learned best practices and gained confidence in my coding journey.",
    },
  ];
  return (
    <div className=" d-flex justify-content-center ">

      <div className="home_page">
      <div className="nav_text">
        <div className="text">
          <h1>Debugging Master </h1> <br></br>
          <h5>Crafting Solutions In The World Of Bugs</h5>
          <h6 className="m-3">Strategies And Insights For Bug-Free Code</h6>
        </div>
      </div>
      
      {/* <div className="background-image"></div> */}
        <section className="part1">
          <Col md={4} className="item">
            <h1>70+</h1>
            <p> Problems</p>
          </Col>
          <Col md={4} className="item">
            <h1>70+</h1>
            <p>Solutions</p>
          </Col>
          <Col md={4} className="item">
            <h1>120+</h1>
            <p>Tags</p>
          </Col>
        </section>
        {/* part2 */}
        <Container className="part2">
          <div className=" title d-flex justify-content-center text-black fs-2 m-4">
            <h2>
              showcasing the vibrant activity and wealth of knowledge within our
              community
            </h2>
          </div>
          <Row className=" content d-flex justify-content-center">
            <Col md={6} className="image ">
              <Row>
                <Col className="d-flex align-items-center  m-1">
                  <img
                    className="shadow rounded"
                    height={150}
                    alt=""
                    src={userCoding1}
                  />
                </Col>
                <Col className=" d-flex align-items-center  m-1">
                  <img className="shadow rounded" alt="" src={userCoding2} />
                </Col>
              </Row>
              <Row>
                <Col className=" d-flex align-items-center m-1 ">
                  <img className="shadow rounded" alt="" src={userCoding3} />
                </Col>
                <Col className=" d-flex align-items-center m-1">
                  <img
                    className="shadow rounded"
                    alt=""
                    height={150}
                    src={userCoding4}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <div className="text1">
                    <h4>A Dynamic Knowledge Hub</h4>
                    <br></br>
                    <h6 className="text2">
                      Join the DebugMaster community and share your web
                      development challenges. Whether you've overcome a complex
                      error or found a clever solution, your experience can
                      light the way for fellow developers.
                    </h6>
                  </div>
                </Col>
                <Col>
                  <div className="text1">
                    <h4> Building Resilience, One Error at a Time</h4>
                    <br></br>
                    <h6 className="text2">
                      Every error is an opportunity to build resilience and
                      refine your skills. By openly discussing challenges, we
                      cultivate a culture that values continuous learning and
                      growth. Embrace the power of learning from mistakes,
                      turning setbacks into stepping stones.
                    </h6>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="text1">
                    <h4>Inspiring the Debugging Journey</h4>
                    <br></br>
                    <h6 className="text2">
                      Your success isn't just a personal achievement; it's a
                      beacon guiding others in their debugging journey. By
                      sharing your triumphs, you contribute to a positive and
                      motivating environment, empowering developers to overcome
                      challenges and excel in their coding endeavors.
                    </h6>
                  </div>
                </Col>
                <Col>
                  <div className="text1">
                    <h4>The Synergy of Shared Debugging</h4>
                    <br></br>
                    <h6 className="text2">
                      When diverse minds collaborate, debugging becomes an art.
                      Unleash your problem-solving creativity by engaging in
                      collective debugging, where the fusion of ideas leads to
                      effective solutions. Together, we build a community that
                      thrives on shared debugging expertise and collective
                      innovation.
                    </h6>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        {/* part3 */}
        <div className="part3">
          <Container>
            <Row className=" title text-center text-black fs-2 ">
              <h2>
                Explore the expertise of skilled technologists across various
                domains{" "}
              </h2>
            </Row>
            <Row className="content">
              <Col md={3} className="technology ">
                <Row className="text-center ">
                  <img src={image} alt="" />
                </Row>
                <Row className="text-center">
                  {" "}
                  <h6>Software Engineer</h6>
                </Row>
              </Col>
              <Col md={3} className="technology ">
                <Row className="text-center">
                  {" "}
                  <img src={image1} alt="" />
                </Row>
                <Row className="text-center">
                  <h6>Data Science</h6>
                </Row>
              </Col>
              <Col md={3} className="technology ">
                <Row className="text-center">
                  {" "}
                  <img src={image2} alt="" />
                </Row>
                <Row className="text-center">
                  <h6>Artificial Intelligence</h6>
                </Row>{" "}
              </Col>
              <Col md={3} className="technology ">
                <Row className="text-center">
                  {" "}
                  <img src={image3} alt="" />
                </Row>
                <Row className="text-center">
                  <h6>Big Data</h6>
                </Row>{" "}
              </Col>
              <Col md={3} className="technology ">
                <Row className="text-center">
                  {" "}
                  <img src={image4} alt="" />
                </Row>
                <Row className="text-center">
                  <h6>CyberSecurity</h6>
                </Row>{" "}
              </Col>
              <Col md={3} className="technology">
                <Row className="text-center">
                  {" "}
                  <img src={image5} alt="" />
                </Row>
                <Row className="text-center">
                  <h6>Mobile App Development</h6>
                </Row>{" "}
              </Col>
              <Col md={3} className="technology ">
                <Row className="text-center">
                  {" "}
                  <img src={image6} alt="" />
                </Row>
                <Row className="text-center">
                  <h6>Embedded Software Engineering</h6>
                </Row>{" "}
              </Col>
              <Col md={3} className="technology ">
                <Row className="text-center">
                  {" "}
                  <img src={image7} alt="" />
                </Row>
                <Row className="text-center">
                  <h6>Internet of Things</h6>
                </Row>{" "}
              </Col>
            </Row>
          </Container>
        </div>

        <div className="sliders">
          <Carousel className="carousel">
            {achievments.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <img src={testimonial.image} alt="First slide" />
                <br></br>
                <Carousel.Caption>
                  <span className="fs-4 fw-bold">{testimonial.Name}</span>
                  <p className="   text-black fs-6">{testimonial.Occupation}</p>
                  <h5 className="  text-black testimonial-name">
                    {testimonial.Testimonial}
                  </h5>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* part4 */}

        <div className="bg-white  part4">
          <Row className=" title text-center text-black fs-2  m-4">
            <h2>Explore challenges across various programming languages</h2>
          </Row>
          <Row className="content">
            {languages.map((el) => {
              return (
                <Col md={2} className="language">
                  <h5>{el}</h5>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
