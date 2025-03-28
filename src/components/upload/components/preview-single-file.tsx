import type { IconButtonProps } from "@mui/material/IconButton";

import React from "react";
import { varAlpha, mergeClasses } from "minimal-shared/utils";

import IconButton from "@mui/material/IconButton";

import { isFileWithUrl, isFileWithPath, isFileWithImageUrl } from "src/utils/file-utils";

import { PreviewRoot } from "./styles";
import { Iconify } from "../../iconify";
import { uploadClasses } from "../classes";

import type { SingleFilePreviewProps } from "../types";

export function SingleFilePreview({ file, sx, className, ...other }: SingleFilePreviewProps) {
  let fileURL = "";

  if (typeof file === "string") {
    fileURL = file;
  } else if (Array.isArray(file) && file.length > 0) {
    return <SingleFilePreview file={file[0]} sx={sx} className={className} {...other} />;
  } else if (file instanceof File) {
    fileURL = URL.createObjectURL(file);
  } else if (file && isFileWithUrl(file)) {
    fileURL = file.url;
  } else if (file && isFileWithImageUrl(file)) {
    fileURL = file.imageUrl;
  } else if (file && isFileWithPath(file)) {
    fileURL = file.path;
  }

  if (fileURL && !fileURL.startsWith("http") && !fileURL.startsWith("blob:")) {
    const baseUrl = process.env.NEXT_PUBLIC_ASSETS_URL || "";
    fileURL = baseUrl + fileURL;
  }

  return fileURL ? (
    <PreviewRoot
      className={mergeClasses([uploadClasses.uploadSinglePreview, className])}
      sx={sx}
      {...other}
    >
      <img src={fileURL} alt="Preview" />
    </PreviewRoot>
  ) : null;
}

export function DeleteButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton
      size="small"
      onClick={(event) => {
        event.stopPropagation();
      }}
      sx={[
        (theme) => ({
          top: 16,
          right: 16,
          zIndex: 9,
          position: "absolute",
          color: varAlpha(theme.vars.palette.common.whiteChannel, 0.8),
          bgcolor: varAlpha(theme.vars.palette.grey["900Channel"], 0.72),
          "&:hover": { bgcolor: varAlpha(theme.vars.palette.grey["900Channel"], 0.48) },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );
}
