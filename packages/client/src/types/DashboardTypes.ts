
export interface Case {
  id: number;
  case_number: string;
  title: string;
  content: string;
  status: 'open' | 'close' | 'ongoing';
  start_date: string;
  finished_date: string | null;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}