import React, { useEffect, useState } from "react";

function VideoComponent({ videoSrc }) {
  const [src, setSrc] = React.useState(videoSrc);
  useEffect(() => {
    setSrc(videoSrc);
  }, [videoSrc]);
  return (
    <div
      style={{
        position: "fixed",
        top: 200,
        left: 20,
        zIndex: 100,
        height: "200px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        style={{ height: "200px" }}
        loop
        controls
        src={src}
      />
    </div>
  );
}

export default VideoComponent;
