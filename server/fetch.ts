import "server-only";

interface OptionsType {
  method: string;
  headers: Record<string, string>;
  cacheControl?: {
    next?: { revalidate: number };
  };
}

export const blogFetcher = async (arg: {
  url: string;
  params?: any;
  noCache?: boolean;
  isIsr?: boolean;
}): Promise<{ res: Response; data: any }> => {
  const API_BASE_URL = process?.env?.BLOG_DOMAIN_BASE_URL;
  const API_KEY = process?.env?.BLOG_API_KEY;

  let finalUrl = arg?.url;
  if (arg?.params) {
    // Convert the queryParams object into a string of URL-encoded parameters
    const queryString = new URLSearchParams(arg?.params)?.toString();

    // Construct the full URL with the query parameters
    finalUrl = `${arg?.url}?${queryString}`;
  }

  const headers: Record<string, string> = {
    "api-key": API_KEY!,
  };

  let cacheControl;
  if (arg?.noCache) {
    cacheControl = { next: { revalidate: 0 } };
  }
  if (arg?.isIsr) {
    cacheControl = { next: { revalidate: 3600 } };
  }

  const options: OptionsType = {
    method: "GET",
    headers,
    cacheControl,
  };

  const res = await fetch(`${API_BASE_URL}/${finalUrl}`, options);
  const data = await res?.json();

  return { res, data };
};
