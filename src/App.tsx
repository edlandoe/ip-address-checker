import IpInput from "./components/ip-input";
import IpAddressDisplay from "./components/ip-address-display";
import "./index.css";
import BackgroundImageDesktop from "./assets/pattern-bg-desktop.png";
import BackgroundImageMobile from "./assets/pattern-bg-mobile.png";
import { useState, useEffect } from "react";
import { ApiResponse } from "./types";
const API_KEY = import.meta.env.VITE_API_KEY;
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import ChangeView from "./components/change-view";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [ip, setIp] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState(false);
  const [inputType, setInputType] = useState<"ip" | "domain" | null>("ip");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (error) {
      toast.error("Invalid IP address or domain");
      setError(false);
      return;
    }

    const fetchData = async () => {
      let cacheKey = inputType === "ip" ? ip : domain;
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setData(JSON.parse(cachedData));
        console.log("cached data");
        return;
      }

      try {
        let response;

        if (inputType === "ip") {
          response = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
          );
        } else if (inputType === "domain") {
          response = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&domain=${domain}`
          );
        } else {
          response = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`
          );
        }

        if (!response?.ok) {
          throw new Error(
            `HTTP error! status: ${response?.status}, ${response?.statusText}`
          );
        }

        const data: ApiResponse = await response.json();
        setData(data);
        console.log("Fetched data from API");

        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (e: any) {
        toast.error("Invalid IP address or domain, Please try again.");
      }
    };

    fetchData();
  }, [ip, domain, inputType, error]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFormSubmit = (newInput: { value: string; type: string }) => {
    if (newInput.type === "ip") {
      setIp(newInput.value);
      setInputType("ip");
    } else if (newInput.type === "domain") {
      setDomain(newInput.value);
      setInputType("domain");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center font-Rubik w-full h-full px-10">
        <Toaster
          position={windowWidth <= 768 ? "bottom-center" : "top-right"}
        />
        <img
          src={BackgroundImageDesktop}
          alt="background"
          className="hidden md:block fixed z-10 h-[350px] object-cover w-full top-0 drop-shadow-2xl select-none"
        />
        <img
          src={BackgroundImageMobile}
          alt="background"
          className="md:hidden fixed z-10 h-[350px] object-cover w-full top-0 select-none"
        />
        <h1 className="text-3xl md:text-4xl font-[500] mt-10 z-10 text-white">
          IP Address Tracker
        </h1>
        <IpInput onSubmit={handleFormSubmit} onError={setError} />
        <IpAddressDisplay data={data} />
        {data ? (
          <MapContainer
            className="fixed h-[80vh] w-full z-0 bottom-0"
            center={[
              windowWidth <= 768
                ? parseFloat(data?.location.lat) + 0.0022
                : parseFloat(data?.location.lat) + 0.001,
              parseFloat(data?.location.lng),
            ]}
            zoom={17}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <ChangeView
              center={[
                windowWidth <= 768
                  ? parseFloat(data?.location.lat) + 0.0022
                  : parseFloat(data?.location.lat) + 0.001,
                parseFloat(data?.location.lng),
              ]}
              zoom={17}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                parseFloat(data?.location.lat),
                parseFloat(data?.location.lng),
              ]}
            ></Marker>
          </MapContainer>
        ) : null}
      </div>
    </>
  );
}

export default App;
