export function FormatTime(seconds: number): string {

  const hours   = Math.floor( seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function ConvertTime(timeString: string): { start: number, end: number } {

  const time = {
    start: 0,
    end: 0
  };

  if (timeString === 'Default')
    return time;

  const [startTimeString, endTimeString] = timeString.split('-');

  time.start = ConvertTimeToSeconds(startTimeString, false);  
  time.end   = ConvertTimeToSeconds(endTimeString, true);

  return time;
}

function ConvertTimeToSeconds(timeString: string, endTime: boolean): number {

  const [hours, minutes] = timeString.split(':').map(Number);

  const totalMinutes = (hours * 60) + minutes;
  const totalSeconds = (totalMinutes * 60) + (endTime ? 59 : 0);

  return totalSeconds;
}