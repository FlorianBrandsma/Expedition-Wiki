import type { IParameters } from '../data/parameters/parameters';
import type { AlertColor } from '@mui/material/Alert';

interface Cause {
  status: number;
  statusText: string;
}

export class HttpError extends Error {

  cause: Cause;

  constructor(message: string, cause: Cause) {
    super(message);
    this.cause = cause;
  }

  get severity(): AlertColor {

    switch (this.cause.status)
    {
      case 400:
      case 500: return 'error';

      default: return 'info';
    }
  }
}

export async function getData<T>(parameters: IParameters): Promise<T[]> {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(parameters)
  }

  const response = await fetch(`https://localhost:5001/api/${ parameters.dataType }/searchRequest`, requestOptions)

  if (!response.ok) {

    const errorMessage = await response.text();
    const error = new HttpError(errorMessage, { status: response.status, statusText: "Internal Server Error" });

    throw error;
  }

  const data = (await response.json());

  return data.list as T[];
}