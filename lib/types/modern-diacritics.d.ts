// TODO: copy remaining declarations as needed

declare module "modern-diacritics" {
  interface SlugifyOptions {
    forceSingleSpace?: boolean;
    trim?: boolean;
  }
  function slugify(str: string, options?: SlugifyOptions): string;
}
