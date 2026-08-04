export type AdminField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "list";
  placeholder?: string;
  required?: boolean;
  help?: string;
};

export type AdminColumn<T> = {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
};
