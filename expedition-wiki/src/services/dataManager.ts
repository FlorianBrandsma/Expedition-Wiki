import type { IParameters } from '../data/parameters/interfaces';
import type { AlertColor } from '@mui/material/Alert';

const API_URL = import.meta.env.VITE_API_URL;

interface Details {
  status: number;
  statusText: string;
}

export class HttpError extends Error {

  details: Details;

  constructor(message: string, details: Details) {
    super(message);
    this.details = details;
  }

  get severity(): AlertColor {

    switch (this.details.status)
    {
      case 400:
      case 500: return 'error';

      default: return 'info';
    }
  }
}

export async function getData<T>(parameters: IParameters, ClassRef: new (data: any) => T): Promise<T[]> {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(parameters)
  }

  const response = await fetch(`${API_URL}/${ parameters.dataType }/searchRequest`, requestOptions)

  if (!response.ok) {

    const errorMessage = await response.text();
    const error = new HttpError(errorMessage, { status: response.status, statusText: "Internal Server Error" });

    throw error;
  }

  const data = await response.json();
  const result = data.list.map((t:T) => new ClassRef(t));

  return result;
}