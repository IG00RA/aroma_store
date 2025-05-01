import { useLocation, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";

export const FacebookPixel: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fbpId = searchParams?.get("fbp") || "";
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(fbpId);
        ReactPixel.pageView();
        if (location.pathname === `/thank-you`) {
          console.log(123);
          ReactPixel.track("Lead", {});
        }
      });
  }, [location.pathname, searchParams]);

  return null;
};
