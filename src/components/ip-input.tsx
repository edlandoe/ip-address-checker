import "../index.css";
import arrow from "../assets/icon-arrow.svg";
import { useState } from "react";

type IpInputProps = {
  onSubmit: (input: { value: string; type: "ip" | "domain" }) => void;
  onError: (error: boolean) => void;
};
export default function IpInput({ onSubmit, onError }: IpInputProps) {
  const [inputVal, setInputVal] = useState("");

  const validateIP = (ip: string) => {
    const ipPattern = new RegExp(
      "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
    );
    return ipPattern.test(ip);
  };

  const validateDomain = (domain: string) => {
    const domainPattern = new RegExp(
      "^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$"
    );
    return domainPattern.test(domain);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validateIP(inputVal) || inputVal === "") {
          onSubmit({ value: inputVal, type: "ip" });
        } else if (validateDomain(inputVal)) {
          onSubmit({ value: inputVal, type: "domain" });
        } else {
          onError(true);
        }
      }}
      className="mt-5 flex flex-row z-10 w-full max-w-xl justify-center"
    >
      <input
        type="text"
        name="ip"
        id="ip"
        placeholder="Search Any IP Address or domain"
        className="p-5 rounded-l-2xl w-full font-medium text-sm md:font-normal md:text-lg focus:outline-none placeholder:font-Rubik"
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button
        type="submit"
        className="px-7 bg-black text-white rounded-r-2xl hover:bg-very-dark-gray transition-colors"
      >
        <img src={arrow} alt="submit" />
      </button>
    </form>
  );
}
