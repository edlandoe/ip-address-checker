import { ApiResponse } from "../types";

export default function IpAddressDisplay({
  data,
}: {
  data: ApiResponse | null;
}) {
  return (
    <div className="mt-5 md:mt-[4rem] py-5 md:p-10 md:py-10 w-full max-w-xl gap-6 flex flex-col bg-white z-10 border rounded-xl text-center md:max-w-7xl md:gap-0 md:flex-row md:text-left drop-shadow-xl">
      <div className="flex flex-col w-full gap-2 md:border-r-[2px] md:h-[100px] ">
        <p className="text-dark-gray font-bold md:text-sm">IP ADDRESS</p>
        <p className="text-very-dark-gray text-xl md:text-2xl font-[500]">
          {data?.ip}
        </p>
      </div>
      <div className="flex flex-col w-full gap-2 md:border-r-[2px] md:h-[100px] md:ml-10">
        <p className="text-dark-gray font-bold md:text-sm">LOCATION</p>
        <p className="text-very-dark-gray text-xl md:text-2xl font-[500]">
          {`${data?.location.city}, ${data?.location.region} ${data?.location.postalCode}`}
        </p>
      </div>
      <div className="flex flex-col w-full gap-2 md:border-r-[2px] md:h-[100px] md:ml-10">
        <p className="text-dark-gray font-bold md:text-sm">TIMEZONE</p>
        <p className="text-very-dark-gray text-xl md:text-2xl font-[500]">
          UTC {data?.location.timezone}
        </p>
      </div>
      <div className="flex flex-col w-full gap-2 md:ml-10">
        <p className="text-dark-gray font-bold md:text-sm">ISP</p>
        <p className="text-very-dark-gray text-xl md:text-2xl font-[500]">
          {data?.isp}
        </p>
      </div>
    </div>
  );
}
