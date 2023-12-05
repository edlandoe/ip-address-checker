export type ApiResponse = {
  ip: string;
  location: {
    region: string;
    city: string;
    postalCode: string;
    timezone: string;
    lat: string;
    lng: string;
  };
  isp: string;
};
