export function getPath(gameName: string, params: string[], optionalParams?: Record<string, string>) {

  const urlParams    = params.map(x => `/${x.replaceAll(' ', '_')}`).join('');
  const searchParams = optionalParams ? `?${new URLSearchParams(optionalParams).toString()}` : '';

  return `/${gameName.replaceAll(' ', '_')}/${urlParams}${searchParams}`;
}