import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* Icone */}
      {icon}
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
};

export default PercentageItem;