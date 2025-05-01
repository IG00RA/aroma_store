import { useLocation, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import TiktokPixel from "tiktok-pixel";

export const TikTokPixel: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const ttpId = searchParams?.get("ttp") || "D09NC03C77UDFM0G0HKG";

    if (ttpId) {
      TiktokPixel.init(ttpId);

      TiktokPixel.pageView();

      if (location.pathname === "/thank-you") {
        const eventId = `reg_${Math.random().toString(36).substring(2, 15)}`;
        TiktokPixel.track(
          "CompleteRegistration",
          {
            contents: [
              {
                content_id: eventId,
                content_name: "Registration",
                content_type: "lead",
              },
            ],
          },
          {
            event_id: eventId,
          }
        );
      }
    }
  }, [location.pathname, searchParams]);

  return null;
};
