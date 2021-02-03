import * as React from "react";
import { BrowserQRCodeReader, BrowserQRCodeSvgWriter } from "@zxing/browser";
import { Result } from "@zxing/library";
import jwt from "jsonwebtoken";

type Metadata = {
  locationId: string;
  locationName: string;
  jti: string;
  exp: number;
  iat: number;
  iss: string; // issuer
};

export default function Home() {
  const imageEl = React.createRef<HTMLImageElement>();
  const [img, setImg] = React.useState<string | ArrayBuffer>();
  const [metadata, setMetadata] = React.useState<Metadata>();

  const parseData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const fr = new FileReader();
      fr.onload = (reader: ProgressEvent<FileReader>) => {
        setImg(reader.target.result);
      };
      fr.readAsDataURL(file);
    }
  };

  const readCode = () => {
    const qrReader = new BrowserQRCodeReader();
    qrReader
      .decodeFromImageElement(imageEl.current)
      .then((data: Result) => {
        const url = new URL(data.getText());
        console.log(url);
        decodeMetadata(url.searchParams.get("metadata"));
      })
      .catch(() => {
        console.log("wups");
      });
  };

  const decodeMetadata = (metadata: string) => {
    setMetadata(jwt.decode(metadata));
  };

  const renderNewCode = () => {
    if (!metadata) {
      return;
    }

    const codeWriter = new BrowserQRCodeSvgWriter();

    const newMetadata = {
      locationId: metadata.locationId,
    };

    const encodedMetadata = jwt.sign(newMetadata, "shhh");

    const newUrl = new URL("https://service.vic.gov.au/check-in/start");
    newUrl.searchParams.set("metadata", encodedMetadata);

    console.log(newUrl);

    const svgElement = codeWriter.write(newUrl.toString(), 300, 300);

    console.log(svgElement);

    return (
      <svg
        height={350}
        width={350}
        dangerouslySetInnerHTML={{ __html: svgElement.innerHTML }}
      />
    );
  };

  const renderMetadata = () => {
    if (!metadata) {
      return;
    }

    return (
      <div>
        <ul>
          <li>Location ID: {metadata.locationId}</li>
          <li>Location Name: {metadata.locationName}</li>
        </ul>
      </div>
    );
  };
  return (
    <div className="container">
      <h1>Service VIC QR Code Neatifier</h1>

      <em>
        Scan a Service VIC Checkin QR code here and get a more legible QR code
        back.
      </em>

      <hr></hr>

      <div>
        <input type="file" onChange={parseData} />
      </div>

      <div>
        <img
          src={img as string}
          ref={imageEl}
          onLoad={readCode}
          style={{ display: "none" }}
        />
      </div>

      <div>{renderNewCode()}</div>

      {renderMetadata()}
    </div>
  );
}
