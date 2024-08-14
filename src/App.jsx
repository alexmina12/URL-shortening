import "./App.css";
import Logo from "./assets/logo.svg";
import Illustration from "./assets/illustration-working.svg";
import Graph from "./assets/icon-brand-recognition.svg";
import Speedometer from "./assets/icon-detailed-records.svg";
import Art from "./assets/icon-fully-customizable.svg";
import Facebook from "./assets/icon-facebook.svg";
import Twitter from "./assets/icon-twitter.svg";
import Pinterest from "./assets/icon-pinterest.svg";
import Instagram from "./assets/icon-instagram.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [on, setOn] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(null);
  const [shortUrl, setShortUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const shortenUrl = async () => {
    try {
      const response = await axios.post("http://localhost:5000/shorten", {
        url: url,
      });
      // console.log(response.data.shortUrl);
      const newShortUrl = response.data.shortUrl;
      setShortUrls((prevShortUrls) => [
        ...prevShortUrls,
        { original: url, short: newShortUrl },
      ]);
      setShortUrl(response.data.shortUrl);
      setUrl("");
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopy = (index, shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(index);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleShortenUrl();
    }
  };

  const handleShortenUrl = () => {
    shortenUrl(url);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function onAndOff() {
    setOn(!on);
    console.log(on);
  }
  return (
    <>
      {windowWidth > 1400 ? (
        <div className="flex flex-col">
          <div className="mx-36">
            <nav className="grid grid-cols-2 mt-10">
              <div className="flex gap-4">
                <img src={Logo} alt=""></img>
                <a href="" className="my-auto">
                  Features
                </a>
                <a href="" className="my-auto">
                  Pricing
                </a>
                <a href="" className="my-auto">
                  Resources
                </a>
              </div>
              <div className="flex gap-4 justify-end ">
                <button className="not-this">Login</button>
                <button className="rounded-3xl w-20 text-center my-auto py-2">
                  Sign Up
                </button>
              </div>
            </nav>
            <section className="grid grid-cols-2 justify-center my-16 h-[80vh] link">
              <div className="flex flex-col my-auto">
                <h1 className="font-bold text-7xl w-[700px] title">
                  More than just shorter links
                </h1>
                <p className="w-[400px] mt-4">
                  Build your brand’s recognition and get detailed insights on
                  how your links are performing.
                </p>
                <button className="rounded-3xl w-40 py-2 mt-10">
                  Get Started
                </button>
              </div>
              <div>
                <img
                  src={Illustration}
                  alt="url"
                  className="relative flex -z-20 -right-32"
                />
              </div>
            </section>
            <section className="flex bg-[url('./assets/bg-boost-desktop.svg')] bg-auto bg-no-repeat bg-center w-full mx-auto p-10 background rounded-xl z-50 flex-wrap">
              <input
                className="w-[85%] rounded-sm mr-4 placeholder:pl-4"
                type="text"
                placeholder="Shorten a link here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="rounded-lg w-32 text-center my-auto py-2"
                onClick={handleShortenUrl}
              >
                Shorten It!
              </button>
              {url === "" && <p className="text-red-600">Please add a link</p>}
            </section>
            {shortUrls.map((item, index) => (
              <div key={index} className="flex bg-white mx-4 my-4 p-2 shorter">
                <a
                  className="overflow-ellipsis overflow-hidden whitespace-nowrap my-auto w-[50%]"
                  href={item.original}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.original}
                </a>
                <hr className="my-2" />
                <a
                  className="link my-auto mr-0 ml-[20%]"
                  href={item.short}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.short}
                </a>
                <button
                  className={`rounded-lg w-[150px] py-2 my-auto mr-0 not-this ${
                    copied === index
                      ? "bg-darkViolet text-white"
                      : "bg-cyan-500"
                  }`}
                  onClick={() => handleCopy(index, item.short)}
                >
                  {copied === index ? "Copied!" : "Copy!"}
                </button>
              </div>
            ))}
            <section className="my-10 cards h-[90vh]">
              <div className="text-center">
                <h2 className="text-3xl font-bold">Advanced Statistics</h2>
                <p className="w-[450px] mx-auto font-semibold">
                  Track how your links are performing across the web with our
                  advanced statistics dashboard.
                </p>
              </div>
              <div className="grid grid-cols-[360px_50px_360px_50px_350px] mt-10 justify-center">
                <div className="p-6 bg-white rounded-lg h-fit">
                  <img src={Graph} alt="" className="-mt-16 p-4 rounded-full" />
                  <h3 className="my-4 font-bold">Brand Recognition</h3>
                  <p>
                    Boost your brand recognition with each click. Generic links
                    don’t mean a thing. Branded links help instil confidence in
                    your content.
                  </p>
                </div>
                <div className="line h-2"></div>
                <div className="p-6 bg-white rounded-lg mt-8 h-fit">
                  <img
                    src={Speedometer}
                    alt=""
                    className="-mt-16 p-4 rounded-full"
                  />
                  <h3 className="my-4 font-bold">Detailed Records</h3>
                  <p>
                    Gain insights into who is clicking your links. Knowing when
                    and where people engage with your content helps inform
                    better decisions.
                  </p>
                </div>
                <div className="line h-2"></div>
                <div className="p-6 bg-white rounded-lg mt-16 h-fit">
                  <img src={Art} alt="" className="-mt-16 p-4 rounded-full" />
                  <h3 className="my-4 font-bold">Fully Customizable</h3>
                  <p>
                    Improve brand awareness and content discoverability through
                    customizable links, supercharging audience engagement.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <section className="text-center background bg-[url('./assets/bg-boost-desktop.svg')] bg-auto bg-no-repeat bg-center py-10">
            <h2 className="text-white text-5xl font-bold">
              Boost your links today
            </h2>
            <button className="rounded-3xl w-32 text-center my-auto py-2 font-bold mt-4">
              {" "}
              Get Started
            </button>
          </section>
          <footer className="grid grid-cols-5 text-white px-32 py-8 list-none  h-[40vh]">
            <p className="font-bold text-3xl">Shortly</p>
            <div>
              <ol>Features</ol>
              <li>Link Shortening</li>
              <li>Branded Links</li>
              <li>Analytics</li>
            </div>
            <div>
              <ol>Resources</ol>
              <li>Blog</li>
              <li>Developers</li>
              <li>Support</li>
            </div>
            <div>
              <ol>Company</ol>
              <li>About</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact</li>
            </div>
            <div className="flex flex-row w-fit">
              <img src={Facebook} alt="" className="w-6 h-6 mr-6" />
              <img src={Twitter} alt="" className="w-6 h-6 mr-6" />
              <img src={Pinterest} alt="" className="w-6 h-6 mr-6" />
              <img src={Instagram} alt="" className="w-6 h-6 mr-6" />
            </div>
          </footer>
        </div>
      ) : (
        <div>
          <nav className="flex justify-between mx-4 mt-6">
            <img src={Logo} alt="" />
            <button onClick={onAndOff} className="nav">
              <div
                className={`w-8 h-[3px] bg-black transition ease-in duration-300  ${
                  on ? "-rotate-45 translate-y-[12px]" : "rotate-0"
                }`}
              ></div>
              <div
                className={`w-8 h-[3px] bg-black my-2 transition ease-in ${
                  on ? "opacity-0" : "opacity-100"
                }`}
              ></div>
              <div
                className={`w-8 h-[3px] bg-black transition ease-in duration-300 ${
                  on ? "rotate-45 -translate-y-[12px]" : "rotate-0"
                }`}
              ></div>
              {on === true ? (
                <>
                  <div className="sidebar absolute top-20 left-[5%] w-[90%] py-6 rounded-lg">
                    <nav className="flex flex-col gap-3">
                      <a href="">Features</a>
                      <a href="">Pricing</a>
                      <a href="">Resources</a>
                      <hr />
                      <a href="">
                        {" "}
                        <button className="not-this">Login</button>
                      </a>
                      <a href="">
                        <button className="rounded-3xl w-[90%] text-center my-auto py-2">
                          Sign Up
                        </button>
                      </a>
                    </nav>
                  </div>
                </>
              ) : (
                <></>
              )}
            </button>
          </nav>
          <img src={Illustration} alt="" className="mx-auto" />
          <section className="flex justify-center ">
            <div className="flex flex-col justify-center text-center">
              <h1 className="font-bold text-4xl w-fit mx-auto">
                More than just shorter links
              </h1>
              <p className="w-[70vw] mx-auto my-4">
                Build your brand’s recognition and get detailed insights on how
                your links are performing.
              </p>
              <button className="rounded-3xl mx-auto w-40 py-2 mb-10">
                Get Started
              </button>
            </div>
          </section>
          <section className="background flex flex-col bg-[url('./assets/bg-boost-desktop.svg')] bg-auto bg-no-repeat bg-center p-6 mx-4 rounded-xl">
            <input
              className="w-full h-10 rounded-sm placeholder:pl-4"
              type="text"
              placeholder="Shorten a link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              className="rounded-lg w-full text-center mt-4 py-2"
              onClick={handleShortenUrl}
            >
              Shorten It!
            </button>
          </section>
          {shortUrls.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white mx-4 my-4 py-2 shorter"
            >
              <a
                className="overflow-ellipsis overflow-hidden whitespace-nowrap"
                href={item.original}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.original}
              </a>
              <hr className="my-2" />
              <a
                className="link"
                href={item.short}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.short}
              </a>
              <button
                className={`rounded-3xl mx-auto w-40 py-2 mt-2 not-this ${
                  copied === index ? "bg-darkViolet text-white" : "bg-cyan-500"
                }`}
                onClick={() => handleCopy(index, item.short)}
              >
                {copied === index ? "Copied!" : "Copy!"}
              </button>
            </div>
          ))}
          <section className="mt-10 cards">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Advanced Statistics</h2>
              <p className="w-[450px] mx-auto font-semibold">
                Track how your links are performing across the web with our
                advanced statistics dashboard.
              </p>
            </div>
            <div className="mt-10 text-center">
              <div className="mx-auto w-[90vw] p-6 bg-white rounded-lg h-fit">
                <img
                  src={Graph}
                  alt=""
                  className="-mt-16 p-4 rounded-full mx-auto"
                />
                <h3 className="my-4 font-bold">Brand Recognition</h3>
                <p>
                  Boost your brand recognition with each click. Generic links
                  don’t mean a thing. Branded links help instil confidence in
                  your content.
                </p>
              </div>
              <div className="line h-20 w-2 mx-auto"></div>
              <div className="mx-auto w-[90vw] p-6 bg-white rounded-lg h-fit">
                <img
                  src={Speedometer}
                  alt=""
                  className="-mt-16 p-4 rounded-full mx-auto"
                />
                <h3 className="my-4 font-bold">Detailed Records</h3>
                <p>
                  Gain insights into who is clicking your links. Knowing when
                  and where people engage with your content helps inform better
                  decisions.
                </p>
              </div>
              <div className="line h-20 w-2 mx-auto"></div>
              <div className="mx-auto w-[90vw] p-6 bg-white rounded-lg h-fit">
                <img
                  src={Art}
                  alt=""
                  className="-mt-16 p-4 rounded-full mx-auto"
                />
                <h3 className="my-4 font-bold">Fully Customizable</h3>
                <p>
                  Improve brand awareness and content discoverability through
                  customizable links, supercharging audience engagement.
                </p>
              </div>
              <section className="text-center background bg-[url('./assets/bg-boost-desktop.svg')] bg-auto bg-no-repeat bg-center py-10 mt-20">
                <h2 className="text-white text-4xl font-bold">
                  Boost your links today
                </h2>
                <button className="rounded-3xl w-72 text-center my-auto py-2 font-bold mt-4">
                  {" "}
                  Get Started
                </button>
              </section>
              <footer className="flex flex-col text-white px-32 py-8 list-none">
                <p className="font-bold text-3xl">Shortly</p>
                <div>
                  <ol>Features</ol>
                  <li>Link Shortening</li>
                  <li>Branded Links</li>
                  <li>Analytics</li>
                </div>
                <div>
                  <ol>Resources</ol>
                  <li>Blog</li>
                  <li>Developers</li>
                  <li>Support</li>
                </div>
                <div>
                  <ol>Company</ol>
                  <li>About</li>
                  <li>Our Team</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </div>
                <div className="social flex flex-row mx-auto mt-4 gap-4">
                  <img src={Facebook} alt="" className="w-6 h-6" />
                  <img src={Twitter} alt="" className="w-6 h-6" />
                  <img src={Pinterest} alt="" className="w-6 h-6" />
                  <img src={Instagram} alt="" className="w-6 h-6" />
                </div>
              </footer>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
