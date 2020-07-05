/** @jsx jsx */
import React, { useCallback, useRef, useState } from "react";
import { css, jsx } from "@emotion/core";
import { Button } from "../Button/Button";
import { Grid } from "../Grid/Grid";

export default {
  title: "examples/FileUpload",
};

const DropArea: React.FC<{
  multiple?: boolean;
  onSelectFiles?: (files: FileList) => void;
}> = ({ multiple, onSelectFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClickDropArea = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    },
    []
  );
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onSelectFiles && event.currentTarget.files) {
        onSelectFiles(event.currentTarget.files);
      }
    },
    [onSelectFiles]
  );

  const dropAreaRef = useRef<HTMLDivElement>(null);
  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";

    if (dropAreaRef.current) {
      dropAreaRef.current.setAttribute("data-drag-over", "true");
    }
  }, []);
  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (dropAreaRef.current) {
      dropAreaRef.current.setAttribute("data-drag-over", "false");
    }
  }, []);
  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (onSelectFiles) {
        onSelectFiles(event.dataTransfer.files);
      }
      if (dropAreaRef.current) {
        dropAreaRef.current.setAttribute("data-drag-over", "false");
      }
    },
    [onSelectFiles]
  );
  const preventDefault = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <div
      css={css`
        input[aria-hidden="true"] {
          display: none;
        }

        div[data-drag-over="true"] {
          border-color: #333;
        }
      `}
    >
      <input
        type="file"
        multiple={multiple}
        accept="image/*"
        aria-hidden={true}
        ref={fileInputRef}
        onChange={handleChange}
      />
      <div
        ref={dropAreaRef}
        role="button"
        tabIndex={0}
        css={css`
          width: 200px;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px dashed #aaa;
          outline: none;

          color: #333;
          text-align: center;

          cursor: pointer;

          & * {
            pointer-events: none;
          }
        `}
        onClick={handleClickDropArea}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={preventDefault}
        data-drag-over={false}
      >
        <div>
          <p>Drop file here</p>
          <p>or</p>
          <Button tabIndex={-1}>Select Files</Button>
        </div>
      </div>
    </div>
  );
};

const FileThumbnail: React.FC<{
  file: File;
  width: number;
  height: number;
}> = ({ file, width, height }) => {
  const [loaded, setLoaded] = useState(false);
  const objectURL = URL.createObjectURL(file);
  const handleLoad = () => {
    URL.revokeObjectURL(objectURL);
    setLoaded(true);
  };

  return (
    <div
      css={css`
        position: relative;
        width: ${width}px;
        height: ${height}px;

        img {
          object-fit: cover;
          width: inherit;
          height: inherit;
        }
      `}
    >
      {!loaded && (
        <span
          css={css`
            position: absolute;
            top: 0;
            left: 0;
          `}
        >
          loading...
        </span>
      )}
      <img onLoad={handleLoad} src={objectURL} />
    </div>
  );
};

export const FileUpload = () => {
  const [files, setFiles] = useState<{ name: string; file: File }[]>([]);
  const handleSelectFiles = useCallback((files: FileList) => {
    setFiles((prev) => {
      const current = [...prev];

      for (let i = 0, numFiles = files.length; i < numFiles; i++) {
        console.log(files[i].type);
        if (!files[i].type.startsWith("image/")) continue;

        current.push({
          name: files[i].name,
          file: files[i],
        });
      }

      return current;
    });
  }, []);

  return (
    <React.Fragment>
      <DropArea multiple onSelectFiles={handleSelectFiles} />

      <Grid container>
        {files.map((file) => (
          <Grid item key={file.name}>
            <FileThumbnail file={file.file} width={200} height={200} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
