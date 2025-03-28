export function isFileWithUrl(file: unknown): file is { url: string } {
  return (
    typeof file === "object" &&
    file !== null &&
    "url" in file &&
    typeof (file as any).url === "string"
  );
}

export function isFileWithPath(file: unknown): file is { path: string } {
  return (
    typeof file === "object" &&
    file !== null &&
    "path" in file &&
    typeof (file as any).path === "string"
  );
}

export function isFileWithImageUrl(file: unknown): file is { imageUrl: string } {
  return (
    typeof file === "object" &&
    file !== null &&
    "imageUrl" in file &&
    typeof (file as any).imageUrl === "string"
  );
}
