import type { Theme, SxProps } from "@mui/material/styles";
import type { MapRef, MapProps as ReactMapProps } from "react-map-gl";

import { Suspense, forwardRef } from "react";
import { useIsClient } from "minimal-shared/hooks";

import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

/* const LazyMap = lazy(() => import("react-map-gl").then((module) => ({ default: module.default }))); */

export type MapProps = ReactMapProps & { sx?: SxProps<Theme> };

export const Map = forwardRef<MapRef, MapProps>((props, ref) => {
  const { sx /*  ...other */ } = props;

  const isClient = useIsClient();

  const renderFallback = () => (
    <Skeleton
      variant="rectangular"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: "absolute",
      }}
    />
  );

  return (
    <MapRoot sx={sx}>
      {isClient ? (
        <Suspense fallback={renderFallback()}>
          {/*    <LazyMap ref={ref} mapboxAccessToken="" {...other} /> */}
        </Suspense>
      ) : (
        renderFallback()
      )}
    </MapRoot>
  );
});

// ----------------------------------------------------------------------

const MapRoot = styled("div")({
  width: "100%",
  overflow: "hidden",
  position: "relative",
});
